import { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { Button } from "../../components/buttons/button";
import { Dialog } from "../../components/modals/dialog";
import { AuthContext } from "../../contexts/auth.provider";
import { EmailInput } from "../../components/inputs/email-input";
import { StatusBar } from "expo-status-bar";

interface Properties
  extends StackScreenProps<StackParams, "PasswordRecovery"> {}

export default function PasswordRecovery({ navigation }: Properties) {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const defaultDialog = {
    title: "Recuperação de senha",
    content:
      "Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para redefinição da sua senha.",
  };
  const [dialog, setDialog] = useState(defaultDialog);

  const handleRecoverPassword = () => {
    if (email != "") {
      authContext.recoverPassword(email);
      navigation && navigation.navigate("SignIn");
    } else {
      Alert(
        "Dado mandatório",
        "Por favor, forneça o seu e-mail para recuperar sua senha."
      );
    }
    setVisible(false);
    setDialog(defaultDialog);
  };

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content });
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: "10%" }}>
        <View>
          <EmailInput value={email} onChangeText={setEmail} />
          <Button title="ENVIAR" onPress={() => setVisible(true)} />
        </View>
      </View>
      <Dialog
        title={dialog.title}
        content={dialog.content}
        visible={visible}
        dismiss={handleRecoverPassword}
      />
      <StatusBar style="light" translucent={false} backgroundColor="silver" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F0F2F7",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454545",
  },
});
