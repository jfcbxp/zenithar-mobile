import { useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, StyleSheet } from "react-native";
import { TextInput } from "../../components/inputs/text-input";
import { TextInputMask } from "../../components/inputs/text-input-mask";
import { Button } from "../../components/buttons/button";
import { Dialog } from "../../components/modals/dialog";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { AuthContext } from "../../contexts/auth.provider";

interface Properties extends StackScreenProps<StackParams, "SignUp"> { }

export default function SignUp({ navigation }: Properties) {
    const [fullName, setFullName] = useState('')
    const [cpf, setCPF] = useState('')
    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const authContext = useContext(AuthContext)

    const handleSignUp = () => {
        if (email == '' || password == '' || fullName == '' || cpf == '' || cellphone == '' || birthDate == '') {
            alert('Por favor, preencher todos os campos')
        } else {
            authContext.signUp(email, password, fullName, cpf, cellphone, birthDate)
            setVisible(true)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginHorizontal: '10%' }}>
                <View>
                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder='Nome completo'
                        placeholderTextColor='#1F537E' />
                    <TextInputMask
                        value={cpf}
                        onChangeText={setCPF}
                        type="cpf"
                        keyboardType='numeric'
                        maxFontSizeMultiplier={14}
                        maxLength={14}
                        placeholder='CPF'
                        placeholderTextColor='#1F537E' />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        maxFontSizeMultiplier={14}
                        placeholder='E-mail'
                        placeholderTextColor='#1F537E' />
                    <TextInputMask
                        value={cellphone}
                        onChangeText={setCellphone}
                        type="cel-phone"
                        options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
                        keyboardType='numeric'
                        maxFontSizeMultiplier={14}
                        maxLength={15}
                        placeholder='Celular'
                        placeholderTextColor='#1F537E' />
                    <TextInputMask
                        value={birthDate}
                        onChangeText={setBirthDate}
                        type="datetime"
                        options={{ mask: 'dd/MM/yyyy' }}
                        keyboardType='numeric'
                        maxFontSizeMultiplier={14}
                        maxLength={10}
                        placeholder='Data de nascimento'
                        placeholderTextColor='#1F537E' />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        textContentType='password'
                        secureTextEntry
                        placeholder='Senha'
                        placeholderTextColor='#1F537E' />
                    <Button onPress={handleSignUp} title="CONTINUAR" />
                </View>
            </View>
            <Dialog
                title="Enviando..."
                content="Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para ativar da sua conta."
                visible={visible}
                dismiss={() => { setVisible(false) }} />
            <StatusBar style="light" backgroundColor='silver' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F0F2F7'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#454545',
    }
})