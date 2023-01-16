import { createContext, useEffect, useState } from "react";
import { User } from "../models/user.model";
import { firebaseAuth, realtime } from "../services/firebase.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
  user: User | undefined;
  loading: boolean;
  signUp(_email: string, _password: string, _nome: string): Promise<void>;
  signIn(_email: string, _password: string): Promise<void>;
  signOut(): Promise<void>;
};

const defaultState = {
  user: undefined,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultState);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((result) => result && setUser(JSON.parse(result)))
      .finally(() => setLoading(false));
  }, [user]);

  const signUp = async (_email: string, _password: string, _nome: string) => {
    setLoading(true);
    firebaseAuth
      .createUserWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        result.user && _userRegister(result.user.uid, _email, _nome);
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Informe uma senha mais forte.");
        } else if (error.code === "auth/invalid-email") {
          alert("E-mail inválido.");
        } else {
          alert(error);
        }
      });
  };

  const _userRegister = async (_uid: string, _email: string, _nome: string) => {
    await realtime
      .ref("users")
      .child(_uid)
      .set({
        nome: _nome,
        email: _email,
      })
      .then(() => {
        let _user: User = { uid: _uid, nome: _nome, email: _email };
        _storeUser(_user);
      });
  };

  const signIn = async (_email: string, _password: string) => {
    setLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        result.user && _getUserRegister(result.user.uid);
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
          nome: snapshot.val().nome,
          email: snapshot.val().email,
        };
        _storeUser(_user);
      });
  };

  const _storeUser = async (_user: User) => {
    let jsonUser = JSON.stringify(_user);
    await AsyncStorage.setItem("user", jsonUser);
    setUser(_user);
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
