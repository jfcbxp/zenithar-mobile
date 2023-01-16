import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../../contexts/auth.provider";
import { StackParams } from "../../types/stack.params";

interface Props extends StackScreenProps<StackParams, "SignIn"> {}

const SignIn = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const handleSingIn = () => {
    authContext.signIn(email, password);
  };

  return <View></View>;
};

export default SignIn;

const styles = StyleSheet.create({});
