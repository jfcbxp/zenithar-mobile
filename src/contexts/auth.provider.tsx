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
};

const defaultState = {
  user: undefined,
  loading: true,
  signUp: async () => { },
  signIn: async () => { },
  signOut: async () => { },
  uploadImage: async () => { },
};

export const AuthContext = createContext<AuthContextProps>(defaultState);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          AsyncStorage.getItem("user").then(async (result) => {
            if (result) {
              let usuario: User = JSON.parse(result);
              setUser(usuario);
            }
          });
        } else {
          Alert.alert("E-mail não verificado", "Por favor verifique seu [e-mail].")
          firebaseAuth.signOut();
        }
      } else {
        firebaseAuth.signOut();
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
          await _userRegister(
            result.user.uid,
            _email,
            _password,
            _fullName,
            _portrait
          );
        }
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          Alert.alert("Senha fraca", "Informe uma senha mais forte.")
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("E-mail inválido", "Por favor informe um e-mail válido.")
        } else {
          alert(error);
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
    firebaseAuth
      .signInWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        if (result.user) {
          _getUserRegister(result.user.uid);
        }
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  const _getUserRegister = async (_uid: string) => {
    await realtime
      .ref("users")
      .child(_uid)
      .once("value")
      .then((snapshot) => {
        let _user: User = {
          uid: _uid,
          fullName: snapshot.val().fullName,
          email: snapshot.val().email,
          portrait: snapshot.val().portrait,
        };
        _storeUser(_user);
      });
  };

  const _storeUser = async (_user: User) => {
    let jsonUser = JSON.stringify(_user);
    await AsyncStorage.setItem("user", jsonUser);
  };

  const signOut = async () => {
    setLoading(true);
    await firebaseAuth.signOut();
    await AsyncStorage.clear();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
