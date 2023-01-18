import { useContext } from "react";
import { StatusBar } from 'expo-status-bar';
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Button } from "../../components/buttons/button";
import { AuthContext } from "../../contexts/auth.provider";
import { StackParams } from "../../types/stack.params";
import { Header } from "../../components/headers/header";
import { NavigationButton } from "../../components/buttons/navigation-button";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
    const authContext = useContext(AuthContext)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header fullName="William" imageURL="" returnOption={false} />
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.menu}>
                <NavigationButton
                    icon="attach-money"
                    title="Desconto"
                    onPress={() => { }} />
                <View style={{ width: 16 }} />
                <NavigationButton
                    icon="shopping-cart"
                    title="Caixas"
                    onPress={() => { }} />
            </ScrollView>
            <StatusBar style="light" backgroundColor='#212A4D' />
            <View style={styles.field}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0F2F7',
    },
    header: {
        flex: 1,
    },
    menu: {
        flex: 1,
        marginVertical: '5%',
        marginHorizontal: '5%',
    },
    field: {
        flex: 4,
        flexDirection: 'column',
        marginHorizontal: '5%',
    },
})