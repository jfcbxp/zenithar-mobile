import { useContext, useState } from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../../contexts/auth.provider";
import { StackParams } from "../../types/stack.params";
import { TextInput } from "../../components/inputs/text-input";
import { Button } from "../../components/buttons/button";
import { StatusBar } from "expo-status-bar";
import { CommandLink } from "../../components/buttons/command-link";

interface Properties extends StackScreenProps<StackParams, "SignIn"> { }

export default function SignIn({ navigation }: Properties) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const authContext = useContext(AuthContext)

  const handleSingIn = () => {
    authContext.signIn(email, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: '10%' }}>
        <View style={{ marginBottom: 32 }}>
          <Image
            source={require('../../../assets/adaptive-icon.png')}
            style={{ width: 64, height: 64 }} />
          <Text style={styles.title}>Olá,</Text>
          <Text style={styles.title}>seja bem-vindo(a).</Text>
        </View>
        <View style={{ marginBottom: 40 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor="#1F537E"
            maxFontSizeMultiplier={14} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            textContentType='password'
            secureTextEntry
            autoCapitalize="none"
            placeholder='Senha'
            placeholderTextColor='#1F537E' />
          <Button onPress={handleSingIn} title='ENTRAR' />
        </View>
        <CommandLink
          onPress={() => { navigation.navigate("SignUp") }}
          title='Cadastre-se' />
        <CommandLink
          onPress={() => { navigation.navigate("PasswordRecovery") }}
          title='Esqueceu sua senha?' />
        <StatusBar style="light" backgroundColor='silver' />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F7',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    width: 300,
    color: '#1F537E',
  }
})
