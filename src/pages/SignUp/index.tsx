import { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { TextInput } from "../../components/inputs/text-input";
import { TextInputMask } from "../../components/inputs/text-input-mask";
import { Button } from "../../components/buttons/button";
import { Dialog } from "../../components/modals/dialog";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { AuthContext } from "../../contexts/auth.provider";
import * as ImagePicker from "expo-image-picker";
import Portrait from "../../components/portrait/portrait";

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
    if (
      email == "" ||
      password == "" ||
      fullName == "" ||
      portrait == ""
    ) {
      alert("Por favor, preencher todos os campos");
    } else {
      authContext.signUp(
        email,
        password,
        fullName,
        portrait
      );
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: "10%" }}>
        <View>
          <Portrait source={portrait} onPress={pickImage} />
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nome completo"
            placeholderTextColor="#1F537E"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            maxFontSizeMultiplier={14}
            placeholder="E-mail"
            placeholderTextColor="#1F537E"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            textContentType="password"
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#1F537E"
          />
          <Button onPress={handleSignUp} title="CONTINUAR" />
        </View>
      </View>
      <Dialog
        title="Validação de e-mail"
        content="Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para ativar da sua conta."
        visible={visible}
        dismiss={() => {
          setVisible(false)
          authContext.signOut()
          navigation.navigate("SignIn")
        }}
      />
      <StatusBar style="light" backgroundColor="silver" />
    </SafeAreaView>
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
