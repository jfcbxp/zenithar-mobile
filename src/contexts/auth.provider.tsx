import { createContext, useEffect, useState } from "react";
import { User } from "../models/user.model";
import { firebaseAuth, storage, realtime } from "../services/firebase.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import { UserBranch } from "../models/user.branch.model";
import { Dialog } from "../components/modals/dialog";
import { UserLogs } from "../models/user.logs.model";

type AuthContextProps = {
  user: User | undefined;
  company: string | undefined;
  department: string | undefined;
  loading: boolean;
  signUp(
    _email: string,
    _password: string,
    _fullName: string,
    _portrait: string
  ): Promise<void>;
  signIn(_email: string, _password: string): Promise<void>;
  signOut(): Promise<void>;
  recoverPassword(_email: string): Promise<void>;
  userUpdate(
    _fullName: string,
    _portrait?: string,
    _currentPassword?: string,
    _newPassword?: string
  ): Promise<void>;
};

const defaultState = {
  user: undefined,
  company: undefined,
  department: undefined,
  loading: true,
  signUp: async () => { },
  signIn: async () => { },
  signOut: async () => { },
  recoverPassword: async () => { },
  userUpdate: async () => { },
};

export const AuthContext = createContext<AuthContextProps>(defaultState);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [company, setCompany] = useState<string | undefined>("");
  const [department, setDepartment] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        if (currentUser.emailVerified) {
          if (!user) {
            await _getUserRegister(currentUser.uid);
          }
        } else {
          Alert("E-mail não verificado", "Por favor verifique seu [e-mail].");
          signOut();
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
        if (result.user != null) {
          let validate = true;
          firebaseAuth.languageCode = "pt";
          result.user.sendEmailVerification().catch((error) => {
            validate = false;
            Alert(
              "Erro",
              `Erro ao enviar o e-mail de verificação. ${error.message}`
            );
          });
          if (result.user && validate == true) {
            await _userRegister(
              result.user.uid,
              _email,
              _fullName,
              "",
              "",
              false,
              [],
              [],
              _portrait
            );
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
      .catch((error) => {
        if (error) {
          Alert(
            "Inválido",
            "Nenhum usuário encontrado com as credenciais fornecidas."
          );
        }
        setLoading(false);
      });
  };

  const signOut = async () => {
    setLoading(true);
    await firebaseAuth.signOut();
    await AsyncStorage.clear();
    setUser(undefined);
    setLoading(false);
  };

  const recoverPassword = async (_email: string) => {
    await firebaseAuth.sendPasswordResetEmail(_email).catch((error) => {
      Alert(
        "Erro",
        `Não foi encontrado um usuário com o endereço de e-mail fornecido. ${error.message}`
      );
    });
  };

  const userUpdate = async (
    _fullName: string,
    _portrait?: string,
    _currentPassword?: string,
    _newPassword?: string
  ) => {
    setLoading(true);
    let _user = firebaseAuth.currentUser!;
    await realtime
      .ref("users")
      .child(_user.uid)
      .update({
        fullName: _fullName,
        portrait: _portrait,
      })
      .then(() => {
        let _user: User = {
          uid: user?.uid!,
          fullName: _fullName,
          email: user?.email!,
          portrait: _portrait!,
          company: user?.company!,
          department: user?.department!,
          verified: user?.verified!,
          branches: user?.branches!,
          logs: user?.logs!,
        };
        _storeUser(_user);
      });
    if (_currentPassword && _newPassword) {
      await _userUpdatePassword(_currentPassword, _newPassword);
    }
    setLoading(false);
  };

  const _reauthenticate = async (currentPassword: string) => {
    var user = firebaseAuth.currentUser!;
    var credentials = firebase.auth.EmailAuthProvider.credential(
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
          Alert("Erro", error.message);
        });
    }
  };

  const _alertPasswordChange = async () =>
    new Promise((resolve) => {
      Alert(
        "Alteração de senha",
        "Sua senha foi alterada. Efetue acesso novamente."
      );
      signOut();
    });

  const Alert = (title: string, content: string) => {
    setTitle(title);
    setContent(content);
    setVisible(true);
  };

  const _uploadImage = async (_portrait: string) => {
    const response = await fetch(_portrait);
    const blob = await response.blob();
    const filename = user?.uid;
    // const filename = _portrait.substring(_portrait.lastIndexOf("/") + 1);
    let urlImage = "";
    await storage
      .ref()
      .child(`${filename}`)
      .put(blob)
      .then(async (snapshot) => {
        urlImage = await snapshot.ref.getDownloadURL();
      })
      .catch((error) => console.log(error));
    return urlImage;
  };

  const _userRegister = async (
    _uid: string,
    _email: string,
    _fullName: string,
    _company: string,
    _department: string,
    _verified: boolean,
    _branches: UserBranch[],
    _logs: UserLogs[],
    _portrait?: string
  ) => {
    let _portraitURL = "";
    if (_portrait != user?.portrait) {
      _portraitURL = await _uploadImage(_portrait!);
    } else {
      _portraitURL = _portrait!;
    }
    /* let _portraitURL = _portrait
      ? await _uploadImage(_portrait)
      : user!.portrait! */
    await realtime
      .ref("users")
      .child(_uid)
      .set({
        fullName: _fullName,
        portrait: _portraitURL,
        company: _company,
        department: _department,
        verified: _verified,
        branches: user?.branches,
        logs: user?.logs,
      })
      .then(() => {
        let _user: User = {
          uid: _uid,
          fullName: _fullName,
          email: _email,
          portrait: _portraitURL,
          company: _company,
          department: _department,
          verified: _verified,
          branches: _branches,
          logs: _logs
        };
        _storeUser(_user);
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
          email: snapshot.val().email,
          portrait: snapshot.val().portrait,
          company: snapshot.val().company,
          department: snapshot.val().department,
          verified: snapshot.val().verified,
          branches: snapshot.child("branches").val(),
          logs: snapshot.child("logs").val(),
        };
        if (!_user.verified) {
          var currentUser = await firebase.auth().currentUser;
          if (currentUser?.emailVerified) {
            _user.verified = true;
            await _userRegister(
              _user.uid,
              _user.email,
              _user.fullName,
              _user.company,
              _user.department,
              _user.verified,
              _user.branches,
              _user.logs,
              _user.portrait
            );
          }
        }
        await _storeUser(_user);
      });
  };

  const _storeUser = async (_user: User) => {
    let jsonUser = JSON.stringify(_user);
    await AsyncStorage.setItem("user", jsonUser);
    setUser(_user);
    _storeCompany(_user.company);
    _storeDepartment(_user.department);
  };

  const _storeCompany = async (_company: string) => {
    if (_company != "") {
      await realtime
        .ref("companies")
        .child(_company)
        .once("value")
        .then(async (snapshot) => {
          await AsyncStorage.setItem("company", snapshot.val().name).then(() => {
            setCompany(snapshot.val().name);
          });
        });
    }
  };

  const _storeDepartment = async (_department: string) => {
    if (_department != "") {
      await realtime
        .ref("departments")
        .child(_department)
        .once("value")
        .then(async (snapshot) => {
          await AsyncStorage.setItem("department", snapshot.val()).then(() => {
            setDepartment(snapshot.val());
          });
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        department,
        loading,
        signUp,
        signIn,
        signOut,
        recoverPassword,
        userUpdate,
      }}
    >
      <Dialog
        title={title}
        content={content}
        visible={visible}
        dismiss={() => {
          setVisible(false);
        }}
      />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
