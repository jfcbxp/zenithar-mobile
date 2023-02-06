import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { PaymentMethod } from "../../../models/payment-method.model";

export function PaymentMethodItem({ data }: { data: PaymentMethod }) {
    const value: number = +(data.value)
    const installments: number = +(data.installments)
    const [installment] = useState(value / installments)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.method}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.description}>{data.installments} x {installment}</Text>
                <Text style={styles.title}>{data.value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DFE1E6",
        borderRadius: 10,
        padding: 8,
        marginVertical: 4
    },
    title: {
        fontSize: 14,
        color: "#123262",
    },
    description: {
        fontSize: 10,
        color: "silver",
    }
})