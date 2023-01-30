import { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native"
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { Button } from "../../components/buttons/button";
import { Dialog } from "../../components/modals/dialog";
import { AuthContext } from "../../contexts/auth.provider";
import { EmailInput } from "../../components/inputs/email-input";
import { StatusBar } from "expo-status-bar";

interface Properties extends StackScreenProps<StackParams, "PasswordRecovery"> { }

export default function PasswordRecovery({ navigation }: Properties) {
    const authContext = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [title, setTitle] = useState("Recuperação de senha")
    const [content, setContent] = useState("Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para redefinição da sua senha.")

    const handleRecoverPassword = () => {
        if (email != '') {
            authContext.recoverPassword(email)
            navigation.navigate("SignIn")
        } else {
            Alert("Dado mandatório", "Por favor, forneça o seu e-mail para recuperar sua senha.")
        }
        setVisible(false)
    }

    const Alert = (
        title: string,
        content: string,
    ) => {
        setTitle(title)
        setContent(content)
        setVisible(true)
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
                title={title}
                content={content}
                visible={visible}
                dismiss={handleRecoverPassword} />
            <StatusBar style="light" translucent={Platform.OS == "web" ? undefined : false} backgroundColor="silver" />
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