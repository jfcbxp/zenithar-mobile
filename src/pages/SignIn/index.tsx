import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../../contexts/auth.provider";
import { StackParams } from "../../types/stack.params";
import { Button } from "../../components/buttons/button";
import { CommandLink } from "../../components/buttons/command-link";
import { EmailInput } from "../../components/inputs/email-input";
import { PasswordInput } from "../../components/inputs/password-input";
import { StatusBar } from "expo-status-bar";

interface Properties extends StackScreenProps<StackParams, "SignIn"> {}

export default function SignIn({ navigation }: Properties) {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password));
  }, [email, password]);

  const handleSingIn = () => {
    authContext.signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: "10%" }}>
        <View style={{ marginBottom: 32 }}>
          <Image
            source={require("../../../assets/adaptive-icon.png")}
            style={{ width: 64, height: 64 }}
          />
          <Text style={styles.title}>Olá,</Text>
          <Text style={styles.title}>seja bem-vindo(a).</Text>
        </View>
        <View style={{ marginBottom: 40 }}>
          <EmailInput value={email} onChangeText={setEmail} />
          <PasswordInput value={password} onChangeText={setPassword} />
          <Button title="ENTRAR" disabled={disabled} onPress={handleSingIn} />
        </View>
        <CommandLink
          testID="link-login-phone"
          onPress={() => {
            navigation && navigation.navigate("PhoneSignIn");
          }}
          title="Entre com número de telefone móvel"
        />
        <CommandLink
          testID="link-cadastrar"
          onPress={() => {
            navigation && navigation.navigate("SignUp");
          }}
          title="Cadastre-se"
        />
        <CommandLink
          testID="link-recuperar-senha"
          onPress={() => {
            navigation && navigation.navigate("PasswordRecovery");
          }}
          title="Esqueceu sua senha?"
        />
      </View>
      <StatusBar style="light" translucent={false} backgroundColor="silver" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F7",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    width: 300,
    color: "#1F537E",
  },
});
