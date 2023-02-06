import { StyleSheet, View, Image, Text } from "react-native";
import { Items } from "../../../models/items.model";

export function ItemsItem({ data }: { data: Items }) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: data.imageUrl }}
                style={{ maxWidth: 120, maxHeight: 100 }} />
            <View style={{ marginLeft: 8 }}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.description}>Armazem: {data.stock}</Text>
                <Text style={styles.description}>Tipo: {data.type}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.title}>{data.items} x R$ {data.value}</Text>
                    <Text style={styles.title}>R$ {data.total}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
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