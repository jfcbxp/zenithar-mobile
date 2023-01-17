import { createContext, useEffect, useState } from "react";
import { User } from "../models/user.model";
import { firebaseAuth, realtime } from "../services/firebase.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
  user: User | undefined;
  loading: boolean;
  signUp(
    _email: string,
    _password: string,
    _fullName: string,
    _cpf: string,
    _cellphone: string,
    _birthDate: string
  ): Promise<void>;
  signIn(
    _email: string,
    _password: string
  ): Promise<void>;
  signOut(): Promise<void>;
};

const defaultState = {
  user: undefined,
  loading: true,
  signUp: async () => { },
  signIn: async () => { },
  signOut: async () => { },
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
        AsyncStorage.getItem("user").then(async (result) => {
          if (result) {
            let usuario: User = JSON.parse(result);
            setUser(usuario);
          }
        });
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
    _cpf: string,
    _cellphone: string,
    _birthDate: string
  ) => {
    setLoading(true);
    firebaseAuth
      .createUserWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        if (result.user && result.user.emailVerified) {
          _userRegister(
            result.user.uid,
            _email,
            _password,
            _fullName,
            _cpf,
            _cellphone,
            _birthDate,
          )
        } else {
          firebaseAuth.signOut()
          alert("Você ainda não verificou seu [e-mail].")
        }
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
    setLoading(false)
  };

  const _userRegister = async (
    _uid: string,
    _email: string,
    _password: string,
    _fullName: string,
    _cpf: string,
    _cellphone: string,
    _birthDate: string
  ) => {
    await realtime
      .ref("users")
      .child(_uid)
      .set({
        fullName: _fullName,
        cpf: _cpf,
        cellphone: _cellphone,
        birthDate: _birthDate,
      })
      .then(() => {
        let _user: User = { uid: _uid, fullName: _fullName, email: _email };
        _storeUser(_user);
      });
  };

  const signIn = async (_email: string, _password: string) => {
    setLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        if (result.user && result.user.emailVerified) {
          _getUserRegister(result.user.uid);
        } else {
          firebaseAuth.signOut()
          alert("Você ainda não verificou seu [e-mail].")
        }
      })
      .catch((error) => {
        alert(error.code);
      });
    setLoading(false)
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
