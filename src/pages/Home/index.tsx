import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { StackParams } from "../../types/stack.params";
import { Header } from "../../components/headers/header";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { User } from "../../models/user.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeContainer } from "../../components/containers/home-container";
import { Historic } from "../../lists/historic";
import { Discount } from "../../components/modals/discount";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
    const [user, setUser] = useState<User>()
    const DATA = [
        {
            id: 1,
            icon: 'check-box',
            title: 'Liberação orçamento',
            description: 'DEUSA MARIA COSTA',
            date: '20 OUT'
        },
        {
            id: 2,
            icon: 'attach-money',
            title: 'Desconto orçamento',
            description: 'R$150,00 (DEUSA MARIA COSTA)',
            date: '20 OUT'
        },
    ]
    const [containerTitle, setContainerTitle] = useState('Histórico')
    const [containerChild, setContainerChild] = useState<React.ReactNode>(<Historic data={DATA} />)
    const [discount, setDiscount] = useState(false)

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
                    onPress={() => { setDiscount(true) }} />
            </ScrollView>
            <View style={styles.field}>
                <HomeContainer title={containerTitle}>
                    {containerChild}
                </HomeContainer>
            </View>
            <Discount
                visible={discount}
                dismiss={() => { setDiscount(false) }} />
            <StatusBar style="light" backgroundColor='#212A4D' />
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