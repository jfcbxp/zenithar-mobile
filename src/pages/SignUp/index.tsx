import { useContext, useState } from "react";
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const authContext = useContext(AuthContext);

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

  const handleSignUp = () => {
    if (email == "" || password == "" || fullName == "" || portrait == "") {
      alert("Por favor, preencher todos os campos");
    } else {
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: "10%" }}>
        <View>
          <Portrait source={portrait} onPress={pickImage} />
          <FullNameInput
            value={fullName}
            onChangeText={setFullName}
            maxLength={20} />
          <EmailInput
            value={email}
            onChangeText={setEmail} />
          <PasswordInput
            value={password}
            onChangeText={setPassword} />
          <Button onPress={handleSignUp} title="CONTINUAR" />
        </View>
      </View>
      <Dialog
        title="Verificação de e-mail"
        content={
          "Aguarde. Um e-mail de verificação foi enviado para: " +
          email +
          ". Após a verificação, tente efetuar acesso."
        }
        visible={visible}
        dismiss={() => {
          setVisible(false);
          authContext.signUp(email, password, fullName, portrait);
          navigation.navigate("SignIn");
        }} />
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
