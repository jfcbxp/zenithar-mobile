import { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../models/user.model";
import { firebaseAuth, storage, realtime } from "../services/firebase.service";
import firebase from "firebase/compat/app";
import { Dialog } from "../components/modals/dialog";
import { UserLogs } from "../models/user.logs.model";
import * as ImagePicker from "expo-image-picker";
import { InputDialog } from "../components/modals/input-dialog";

type AuthContextProps = {
  user: User | undefined;
  company: string | undefined;
  department: string | undefined;
  urlBackend: string | undefined;
  loading: boolean;
  signUp(
    _email: string,
    _password: string,
    _fullName: string,
    _portrait: string
  ): Promise<void>;
  signIn(_email: string, _password: string): Promise<void>;
  phoneSignIn(
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier
  ): Promise<void>;
  signOut(): Promise<void>;
  recoverPassword(_email: string): Promise<void>;
  userUpdate(
    _fullName: string,
    _portrait?: string,
    _currentPassword?: string,
    _newPassword?: string
  ): Promise<void>;
  addLog(log: UserLogs): Promise<void>;
  pickImage(): Promise<string>;
};

const defaultState = {
  user: undefined,
  company: undefined,
  department: undefined,
  urlBackend: undefined,
  loading: true,
  signUp: async () => { },
  signIn: async () => { },
  phoneSignIn: async () => { },
  signOut: async () => { },
  recoverPassword: async () => { },
  userUpdate: async () => { },
  addLog: async () => { },
  pickImage: async (): Promise<string> => {
    return Promise.resolve("");
  },
};

export const AuthContext = createContext<AuthContextProps>(defaultState);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [company, setCompany] = useState<string | undefined>("");
  const [department, setDepartment] = useState<string | undefined>("");
  const [urlBackend, setUrlBackend] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);
  const [expireAt, setExpireAt] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [code, setCode] = useState("")
  const [codeVisible, setCodeVisible] = useState(false)
  const [fullName, setFullName] = useState("")
  const [fullNameVisible, setFullNameVisible] = useState(false)

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        if (currentUser.emailVerified || currentUser.phoneNumber) {
          if (!user) {
            await _getUserRegister(currentUser.uid);
          }
        } else {
          Alert("E-mail não verificado", "Por favor verifique seu [e-mail].");
        }
      } else {
        signOut();
      }
      setLoading(false);
    });
  }, []);

  const signUp = async (
    _email: string,
    _password: string,
    _fullName: string,
    _portrait: string
  ) => {
    setLoading(true);
    await firebaseAuth
      .createUserWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        if (result.user) {
          let validate = true;
          firebaseAuth.languageCode = "pt";
          result.user.sendEmailVerification().catch((error) => {
            validate = false;
            Alert(
              "Erro",
              `Erro ao enviar o e-mail de verificação. ${error.message}`
            );
          });
          if (result.user && validate) {
            let _portraitURL = await _uploadImage(_portrait, result.user.uid);
            let _user: User = {
              uid: result.user.uid,
              fullName: _fullName,
              verified: false,
              portrait: _portraitURL,
              discountLimit: 0,
            };
            await _userRegister(_user);
          }
        }
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          Alert("Senha fraca", "Informe uma senha mais forte.");
        } else if (error.code === "auth/invalid-email") {
          Alert("E-mail inválido", "Por favor informe um e-mail válido.");
        } else {
          Alert("Erro", `Ocorreu um problema. ${error.message}`);
        }
      });
  };

  const signIn = async (_email: string, _password: string) => {
    setLoading(true);
    await firebaseAuth
      .signInWithEmailAndPassword(_email, _password)
      .then(async (currentUser) => {
        if (currentUser.user?.emailVerified) {
          await _getUserRegister(currentUser.user.uid);
        } else {
          Alert("E-mail não verificado", "Por favor verifique seu [e-mail].");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error) {
          setLoading(false);
          Alert(
            "Inválido",
            "Nenhum usuário encontrado com as credenciais fornecidas."
          );
        }
      });
  };

  const phoneSignIn = async (
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier
  ) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider()
    phoneProvider
      .verifyPhoneNumber(phoneNumber, applicationVerifier)
      .then((result) => {
        setVerificationId(result)
        setCodeVisible(true)
      })
  }

  const _confirmCode = async (
    verificationId: string,
    code: string
  ) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code)
    await firebaseAuth.signInWithCredential(credential)
      .then(async (currentUser) => {
        await realtime
          .ref("users")
          .child(currentUser.user?.uid!)
          .once("value")
          .then(async (snapshot) => {
            if (snapshot.exists()) {
              await _getUserRegister(currentUser.user?.uid!)
            } else {
              let _user: User = {
                uid: currentUser.user?.uid!,
                fullName: "",
                verified: true,
                portrait: "",
                discountLimit: 0,
              }
              await _userRegister(_user)
            }
          })
        setVerificationId("")
        setCode("")
        setCodeVisible(false)
      })
  }

  const signOut = async () => {
    setLoading(true);
    await firebaseAuth.signOut();
    setUser(undefined);
    setCompany("");
    setDepartment("");
    setLoading(false);
  };

  const recoverPassword = async (_email: string) => {
    firebaseAuth.languageCode = "pt";
    await firebaseAuth.sendPasswordResetEmail(_email).catch((error) => {
      Alert(
        "Erro",
        `Não foi encontrado um usuário com o endereço de e-mail fornecido. ${error.message}`
      );
    });
  };

  const userUpdate = async (
    _fullName: string,
    _portrait: string,
    _currentPassword?: string,
    _newPassword?: string
  ) => {
    setLoading(true);
    let _portraitURL = "";
    if (_portrait != user?.portrait) {
      _portraitURL = await _uploadImage(_portrait, user?.uid!);
    } else {
      _portraitURL = user?.portrait;
    }
    let _user = firebaseAuth.currentUser!;
    await realtime
      .ref("users")
      .child(_user.uid)
      .update({
        fullName: _fullName,
        portrait: _portraitURL,
      })
      .then(() => {
        let _user = user!;
        _user.fullName = _fullName;
        _user.portrait = _portraitURL;
        setUser(_user);
        setFullName("")
        setFullNameVisible(false)
      });
    if (_currentPassword && _newPassword) {
      await _userUpdatePassword(_currentPassword, _newPassword);
    }
    setLoading(false);
  };

  const addLog = async (log: UserLogs) => {
    let _user: User = user!;
    let logs = _user.logs ? _user.logs : [];
    logs.reverse();
    logs.push(log);
    if (logs.length > 5) {
      logs.shift();
    }

    await realtime.ref("users").child(_user.uid).child("logs").update(logs);
    _user.logs = logs;
    setUser(_user);
  };

  const pickImage = async (): Promise<string> => {
    let value = "";
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      if (
        blob.size <= 2000000 &&
        (blob.type == "image/png" || blob.type == "image/jpeg")
      ) {
        value = result.assets[0].uri;
      }
    }
    return value;
  };

  const _reauthenticate = async (currentPassword: string) => {
    const user = firebaseAuth.currentUser!;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email!,
      currentPassword
    );
    return await user.reauthenticateWithCredential(credentials);
  };

  const _userUpdatePassword = async (
    _currentPassword: string,
    _newPassword: string
  ) => {
    if (_currentPassword && _newPassword) {
      await _reauthenticate(_currentPassword)
        .then(async () => {
          await firebaseAuth.currentUser
            ?.updatePassword(_newPassword)
            .then(async () => {
              await _alertPasswordChange();
            })
            .catch((error) => {
              Alert("Erro", error.message);
            });
        })
        .catch((error) => {
          Alert("Erro", "Senha atual incorreta.");
        });
    }
  };

  const _alertPasswordChange = async () =>
    new Promise((_) => {
      Alert(
        "Alteração de senha",
        "Sua senha foi alterada. Efetue acesso novamente."
      );
      signOut();
    });

  const _uploadImage = async (_portrait: string, _uid: string) => {
    const response = await fetch(_portrait);
    const blob = await response.blob();
    const filename = _uid;
    let urlImage = "";
    await storage
      .ref()
      .child(`${filename}`)
      .put(blob)
      .then(async (snapshot) => {
        urlImage = await snapshot.ref.getDownloadURL();
      });
    return urlImage;
  };

  const _userRegister = async (_user: User) => {
    await realtime
      .ref("users")
      .child(_user.uid)
      .set({
        fullName: _user.fullName,
        portrait: _user.portrait,
        discountLimit: _user.discountLimit,
        verified: _user.verified,
      })
      .then(() => {
        setUser(_user);
        if (!_user.fullName) {
          setFullNameVisible(true)
        }
      });
  };

  const _getUserRegister = async (_uid: string) => {
    await realtime
      .ref("users")
      .child(_uid)
      .once("value")
      .then(async (snapshot) => {
        let _user: User = {
          uid: _uid,
          fullName: snapshot.val().fullName,
          portrait: snapshot.val().portrait,
          company: snapshot.val().company,
          department: snapshot.val().department,
          discountLimit: snapshot.val().discountLimit,
          verified: snapshot.val().verified,
          branches: snapshot.child("branches").val(),
          logs: snapshot.child("logs").val(),
        };
        if (!_user.verified) {
          let currentUser = await firebase.auth().currentUser;
          if (currentUser?.emailVerified) {
            _user.verified = true;
            await _userRegister(_user);
          }
        }
        setUser(_user);
        if (!_user.fullName) {
          setFullNameVisible(true)
        }
        _user.department && (await _storeDepartment(_user.department));
        _user.company && (await _licenseCheck(_user.company));
      });
  };

  const _storeDepartment = async (_department: string) => {
    await realtime
      .ref("departments")
      .child(_department)
      .once("value")
      .then(async (snapshot) => setDepartment(snapshot.val()));
  };

  const _licenseCheck = async (company: string) => {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    await realtime
      .ref("companies")
      .child(company)
      .once("value")
      .then((snapshot) => {
        setExpireAt(snapshot.val().expireAt);
        setUrlBackend(snapshot.val().urlBackend);
        setCompany(snapshot.val().name);
      });
    const expireAtDay = parseInt(expireAt[0] + expireAt[1]);
    const expireAtMonth = parseInt(expireAt[3] + expireAt[4]);
    const expireAtYear = parseInt(
      expireAt[5] + expireAt[6] + expireAt[7] + expireAt[8]
    );
    if (
      expireAtYear <= currentYear &&
      expireAtMonth <= currentMonth &&
      expireAtDay <= currentDay
    ) {
      Alert("Licença", "Sua licença expirou em " + expireAt);
      signOut();
    }
  };

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

  const contextValue = useMemo(
    () => ({
      user,
      company,
      department,
      urlBackend,
      loading,
      signUp,
      signIn,
      phoneSignIn,
      signOut,
      recoverPassword,
      userUpdate,
      addLog,
      pickImage,
    }),
    [
      user,
      company,
      department,
      urlBackend,
      loading,
      signUp,
      signIn,
      phoneSignIn,
      signOut,
      recoverPassword,
      userUpdate,
      addLog,
      pickImage,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <Dialog
        title={dialog.title}
        content={dialog.content}
        visible={dialog.visible}
        dismiss={() => {
          setDialog(defaultDialog);
        }} />
      <InputDialog
        value={code}
        onChangeText={setCode}
        title="Código"
        visible={codeVisible}
        dismiss={() => _confirmCode(verificationId, code)} />
      <InputDialog
        value={fullName}
        onChangeText={setFullName}
        title="Nome completo"
        visible={fullNameVisible}
        dismiss={() => userUpdate(fullName, "")} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
