import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { StackParams } from "../../types/stack.params";
import { Header } from "../../components/headers/header";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { User } from "../../models/user.model";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        AsyncStorage.getItem("user").then(async (result) => {
            if (result) {
                let _user: User = JSON.parse(result);
                setUser(_user);
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header
                    fullName={user?.fullName}
                    imageURL={user?.portrait}
                    returnOption={false} />
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