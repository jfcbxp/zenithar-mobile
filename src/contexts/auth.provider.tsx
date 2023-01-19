import { createContext, useEffect, useState } from "react";
import { User } from "../models/user.model";
import { firebaseAuth, storage, realtime } from "../services/firebase.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type AuthContextProps = {
  user: User | undefined;
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
};

const defaultState = {
  user: undefined,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  recoverPassword: async () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultState);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        if (user.emailVerified) {
          await _getUserRegister(user.uid);
        } else {
          Alert.alert(
            "E-mail não verificado",
            "Por favor verifique seu [e-mail]."
          );

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
            Alert.alert(
              "Erro",
              `Erro ao enviar o e-mail de verificação. ${error.message}`
            );
          });
          if (result.user && validate == true) {
            await _userRegister(
              result.user.uid,
              _email,
              _password,
              _fullName,
              _portrait
            );
          }
        }
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          Alert.alert("Senha fraca", "Informe uma senha mais forte.");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("E-mail inválido", "Por favor informe um e-mail válido.");
        } else {
          Alert.alert("Erro", `Ocorreu um problema. ${error.message}`);
        }
      });
  };

  const uploadImage = async (_portrait: string) => {
    const response = await fetch(_portrait);
    const blob = await response.blob();
    const filename = _portrait.substring(_portrait.lastIndexOf("/") + 1);
    let urlImage = "";
    await storage
      .ref()
      .child(`images/${filename}`)
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
    _password: string,
    _fullName: string,
    _portrait: string
  ) => {
    const _portraitURL = await uploadImage(_portrait);
    await realtime
      .ref("users")
      .child(_uid)
      .set({
        fullName: _fullName,
        portrait: _portraitURL,
      })
      .then(() => {
        let _user: User = {
          uid: _uid,
          fullName: _fullName,
          email: _email,
          portrait: _portrait,
        };
        _storeUser(_user);
      });
  };

  const signIn = async (_email: string, _password: string) => {
    setLoading(true);
    await firebaseAuth
      .signInWithEmailAndPassword(_email, _password)
      .catch((error) => {
        if (error) {
          Alert.alert(
            "Inválido",
            "Nenhum usuário encontrado com as credenciais fornecidas."
          );
        }
        setLoading(false);
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
        };
        await _storeUser(_user);
      });
  };

  const _storeUser = async (_user: User) => {
    let jsonUser = JSON.stringify(_user);
    await AsyncStorage.setItem("user", jsonUser);
    setUser(_user);
  };

  const recoverPassword = async (_email: string) => {
    await firebaseAuth.sendPasswordResetEmail(_email).catch((error) => {
      Alert.alert(
        "Erro",
        `Não foi encontrado um usuário com o endereço de e-mail fornecido. ${error.message}`
      );
    });
  };

  const signOut = async () => {
    setLoading(true);
    await firebaseAuth.signOut();
    await AsyncStorage.clear();
    setUser(undefined);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut, recoverPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
