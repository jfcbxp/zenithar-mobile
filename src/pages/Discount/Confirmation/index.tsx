import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../../types/stack.params";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { SwipeButton } from "../../../components/buttons/swipe-button";

interface Properties extends StackScreenProps<StackParams, "DiscountConfirmation"> { }

export default function DiscountConfirmation({ navigation }: Properties) {
    return (
        <View style={styles.container}>
            <View style={styles.topField}>
                <View style={styles.header}>
                    <Icon
                        name="keyboard-arrow-left"
                        size={48}
                        color="white"
                        onPress={() => {
                            navigation.navigate("Home");
                        }} />
                    <Text style={styles.headerText}>Desconto</Text>
                </View>
                <Text style={styles.client}>DEUZA MARIA CRISTINA</Text>
                <Text style={styles.budget}>Orçamento #564354</Text>
            </View>
            <View style={styles.bottomField}>
                <View>
                    <Text style={styles.result}>Normal</Text>
                    <Text style={styles.description}>Tipo do Orçamento</Text>
                </View>
                <View>
                    <Text style={styles.result}>ANDERSON JORGE</Text>
                    <Text style={styles.description}>Vendedor</Text>
                </View>
                <View>
                    <Text style={styles.result}>Total R$ 233,88</Text>
                    <Text style={styles.description}>Pagamento
                        <Text style={{ fontWeight: "bold" }}>em dinheiro</Text>
                    </Text>
                </View>
                <SwipeButton
                    onComplete={() => { }}
                    title="EFETUAR DESCONTO"
                    underlayTitle="CONFIRMAR DESCONTO" />
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#F0F2F7",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: 16,
        color: "white",
    },
    topField: {
        flex: 2,
        backgroundColor: "#1F2D5A",
    },
    client: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: "5%",
        paddingTop: 52,
    },
    budget: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: "5%",
        paddingTop: 64,
    },
    bottomField: {
        flex: 4,
        flexDirection: "column",
        marginHorizontal: "5%",
        justifyContent: "space-around",
    },
    result: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#454545",
    },
    description: {
        fontSize: 16,
        color: "#454545",
    },
});