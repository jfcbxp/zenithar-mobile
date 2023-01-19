import { useState, useContext } from "react";
import { SafeAreaView, View, StyleSheet, Alert } from "react-native"
import { StatusBar } from 'expo-status-bar';
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { Button } from "../../components/buttons/button";
import { Dialog } from "../../components/modals/dialog";
import { AuthContext } from "../../contexts/auth.provider";
import { EmailInput } from "../../components/inputs/email-input";

interface Properties extends StackScreenProps<StackParams, "PasswordRecovery"> { }

export default function PasswordRecovery({ navigation }: Properties) {
    const authContext = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)

    const handleRecoverPassword = () => {
        if (email != '') {
            authContext.recoverPassword(email)
            setVisible(false)
            navigation.navigate("SignIn")
        } else {
            Alert.alert("Dado mandatório", "Por favor, forneça o seu e-mail para recuperar sua senha.")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginHorizontal: '10%' }}>
                <View>
                    <EmailInput
                        value={email}
                        onChangeText={setEmail} />
                    <Button
                        title='ENVIAR'
                        onPress={() => setVisible(true)} />
                </View>
            </View>
            <Dialog
                title="Recuperação de senha"
                content="Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para redefinição da sua senha."
                visible={visible}
                dismiss={handleRecoverPassword} />
            <StatusBar style="light" backgroundColor='silver' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F0F2F7',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#454545',
    },
})