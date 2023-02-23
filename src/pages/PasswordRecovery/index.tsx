import { useState, useContext, useEffect } from "react";
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
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogContent, setDialogContent] = useState<string>("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!email);
  }, [email]);

  const handleRecoverPassword = () => {
    if (email) {
      authContext.recoverPassword(email);
      navigation && navigation.navigate("SignIn");
    } else {
      Alert(
        "Dado mandatório",
        "Por favor, forneça o seu e-mail para recuperar sua senha."
      );
    }
    setDialogVisible(false);
  };

  const Alert = (title: string, content: string) => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: "10%" }}>
        <View>
          <EmailInput value={email} onChangeText={setEmail} />
          <Button
            title="ENVIAR"
            disabled={disabled}
            onPress={() => {
              Alert(
                "Recuperação de senha",
                "Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para redefinição da sua senha."
              );
            }}
          />
        </View>
      </View>
      <Dialog
        title={dialogTitle}
        content={dialogContent}
        visible={dialogVisible}
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
