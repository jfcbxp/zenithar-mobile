import { useContext, useRef, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StackParams } from "../../../types/stack.params";
import { AuthContext } from "../../../contexts/auth.provider";
import { Button } from "../../../components/buttons/button";
import { MaskedInput } from "../../../components/inputs/masked-input";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../../services/firebase.service";

interface Properties extends StackScreenProps<StackParams, "PhoneSignIn"> { }

export default function PhoneSignIn({ navigation }: Properties) {
    const authContext = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState("")
    const recaptchaVerifier = useRef<any>(null)

    const handlePhoneSingIn = () => {
        authContext.phoneSignIn(`+55${phoneNumber}`, recaptchaVerifier.current)
    };

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: "10%" }}>
                <View style={{ marginBottom: 32 }}>
                    <Image
                        source={require("../../../../assets/adaptive-icon.png")}
                        style={{ width: 64, height: 64 }}
                    />
                    <Text style={styles.title}>Olá,</Text>
                    <Text style={styles.title}>seja bem-vindo(a).</Text>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <MaskedInput
                        value={phoneNumber}
                        onChangeText={(text, rawText) => setPhoneNumber(rawText!)}
                        type="cel-phone"
                        options={{
                            maskType: "BRL",
                            withDDD: true,
                            dddMask: "(99) "
                        }}
                        keyboardType="phone-pad"
                        placeholder="Nº telefone celular" />
                    <Button
                        title="ENVIAR"
                        disabled={phoneNumber ? false : true}
                        onPress={handlePhoneSingIn} />
                </View>
            </View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig} />
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
