import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../../types/stack.params";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { SwipeButton } from "../../../components/buttons/swipe-button";
import { useContext, useState } from "react";
import { Dialog } from "../../../components/modals/dialog";
import { GetTokenJWT } from "../../../services/token-jwt.service";
import { ReleaseDiscount } from "../../../services/discount.service";
import { AuthContext } from "../../../contexts/auth.provider";

interface Properties extends StackScreenProps<StackParams, "DiscountConfirmation"> { }

export default function DiscountConfirmation({ navigation, route }: Properties) {
  const { _branch, _budget, _budgetObject, _discountValue } = route.params
  const authContext = useContext(AuthContext)
  const defaultDialog = { title: "", content: "", visible: false }
  const [dialog, setDialog] = useState(defaultDialog);

  const releaseDiscount = () => {
    GetTokenJWT(
      authContext.user?.email!,
      authContext.user?.uid!,
      authContext.urlBackend!
    ).then((authToken) => {
      ReleaseDiscount(
        _budget,
        _branch,
        _discountValue,
        authToken?.token!,
        authContext.urlBackend!
      ).then(() => {
        Alert("Sucesso", "Efetuado desconto para o orçamento: " + _budget)
      }).catch(result => {
        Alert("Erro", result.response.data.error)
      })
    }).catch(result => {
      Alert("Erro", result.response.data.error)
    })
  }

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

  if (dialog.title != "Erro") {
    return (
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
        <View style={styles.topField}>
          <View style={styles.header}>
            <Icon
              testID="icon"
              name="keyboard-arrow-left"
              size={48}
              color="white"
              onPress={() => {
                navigation && navigation.navigate("Home");
              }}
            />
            <Text style={styles.headerText}>Desconto</Text>
          </View>
          <Text style={styles.client}>{_budgetObject.nomeCliente}</Text>
          <Text style={styles.budget}>Orçamento #{_budget}</Text>
        </View>
        <View style={styles.bottomField}>
          <View>
            <Text style={styles.result}>Normal</Text>
            <Text style={styles.description}>{_budgetObject.tipoOrcamento}</Text>
          </View>
          <View>
            <Text style={styles.result}>{_budgetObject.nomeVendedor}</Text>
            <Text style={styles.description}>Vendedor</Text>
          </View>
          <View>
            <Text style={styles.result}>Total R$ {((_budgetObject.totalBruto) - (_discountValue))}</Text>
            <Text style={styles.description}>
              Pagamento
              <Text style={{ fontWeight: "bold" }}> em {_budgetObject.pagamentos[0].forma}</Text>
            </Text>
          </View>
          <SwipeButton
            onComplete={releaseDiscount}
            title="EFETUAR DESCONTO"
            underlayTitle="LIBERAR" />
        </View>
        <Dialog
          visible={dialog.visible}
          title={dialog.title}
          content={dialog.content}
          dismiss={() => {
            navigation.navigate("Discount", { _branch, _budget })
            setDialog(defaultDialog)
          }} />
        <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
      </ScrollView>
    )
  } else {
    return (
      <View>
        <Dialog
          visible={dialog.visible}
          title={dialog.title}
          content={dialog.content}
          dismiss={() => {
            navigation.navigate("Home")
            setDialog(defaultDialog)
          }} />
      </View>
    )
  }
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
