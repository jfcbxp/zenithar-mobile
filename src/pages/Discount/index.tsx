import { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Header } from "../../components/headers/header";
import { User } from "../../models/user.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderDropdown } from "../../components/dropdowns/discount/header-dropdown";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";
import { StackParams } from "../../types/stack.params";
import { StackScreenProps } from "@react-navigation/stack";

interface Properties extends StackScreenProps<StackParams, "Discount"> { }

export default function Discount({ navigation }: Properties) {
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
                    company={user?.company}
                    department={user?.department}
                    returnOption={true} />
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <HeaderDropdown />
                    <ItemsDropdown />
                    <PaymentMethodDropdown />
                </ScrollView>
            </View>
            <StatusBar backgroundColor='#212A4D' barStyle={"light-content"} translucent={false} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 5,
    }
})