import { StyleSheet, View, Image, Text } from "react-native";
import { Itens } from "../../../models/from-api/itens.model";

export function ItemsItem({ data }: { data: Itens }) {
    return (
        <View style={styles.container}>
            <View style={{ flex: 2 }}>
                <Image
                    source={require("../../../../assets/no-photo.png")}
                    style={{ width: 120, height: 100, borderRadius: 10 }} />
            </View>
            <View style={{ flex: 5 }}>
                <View style={{ flex: 4 }}>
                    <Text style={styles.title}>{data.produto} {data.descricaoProduto}</Text>
                    <Text style={styles.description}>Armazem: {data.armazem}</Text>
                    <Text style={styles.description}>Tipo: {data.tipoEntrega}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.title}>{data.quantidade} x R$ {data.preco.toFixed(2).replace('.', ',')}</Text>
                    <Text style={styles.title}>R$ {data.total.toFixed(2).replace('.', ',')}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#DFE1E6",
        borderRadius: 10,
        padding: 8,
        marginVertical: 4
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#123262",
    },
    description: {
        fontSize: 12,
        color: "grey",
    }
})