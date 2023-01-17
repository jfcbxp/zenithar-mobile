import { StackScreenProps } from "@react-navigation/stack";
import { useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import { Button } from "../../components/buttons/button";
import { AuthContext } from "../../contexts/auth.provider";
import { StackParams } from "../../types/stack.params";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
    const authContext = useContext(AuthContext)
    return (
        <SafeAreaView>
            <Text>Home</Text>
            <Button title="Sair" onPress={() => { authContext.signOut() }} />
        </SafeAreaView>
    )
}