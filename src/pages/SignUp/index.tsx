import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../../components/buttons/button";
import { Dialog } from "../../components/modals/dialog";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { AuthContext } from "../../contexts/auth.provider";
import * as ImagePicker from "expo-image-picker";
import { Portrait } from "../../components/portrait/portrait";
import { EmailInput } from "../../components/inputs/email-input";
import { PasswordInput } from "../../components/inputs/password-input";
import { FullNameInput } from "../../components/inputs/fullname-input";
import { StatusBar } from "expo-status-bar";

interface Properties extends StackScreenProps<StackParams, "SignUp"> { }

export default function SignUp({ navigation }: Properties) {
  const authContext = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [portrait, setPortrait] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.canceled) {
      setPortrait(result.assets[0].uri);
    }
  };

  useEffect(() => {
    check(fullName, email, password, confirmPassword, portrait)
  }, [portrait])

  const check = (fullName: string, email: string, password: string, confirmPassword: string, portrait: string) => {
    if (fullName && email && password && confirmPassword && portrait && password == confirmPassword) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: "10%" }}>
        <View>
          <Portrait
            source={portrait}
            editable={true}
            onPress={pickImage} />
          <FullNameInput
            value={fullName}
            onChangeText={(text) => {
              setFullName(text)
              check(fullName, email, password, confirmPassword, portrait)
            }}
            maxLength={20} />
          <EmailInput
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              check(fullName, text, password, confirmPassword, portrait)
            }} />
          <PasswordInput
            value={password}
            onChangeText={(text) => {
              setPassword(text)
              check(fullName, email, text, confirmPassword, portrait)
            }} />
          <PasswordInput
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text)
              check(fullName, email, password, text, portrait)
            }} />
          <Button
            title="CONTINUAR"
            testID="continuar"
            disabled={disabled}
            onPress={() => setVisible(true)}
          />
        </View>
      </View>
      <Dialog
        title="Verificação de e-mail"
        content={
          "Aguarde. Um e-mail de verificação foi enviado para sua caixa de entrada. Após a verificação, tente efetuar acesso."
        }
        visible={visible}
        dismiss={() => {
          setVisible(false);
          authContext.signUp(email, password, fullName, portrait);
          navigation && navigation.navigate("SignIn");
        }}
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
