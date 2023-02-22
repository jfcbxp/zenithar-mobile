import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../../types/stack.params";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { SwipeButton } from "../../../components/buttons/swipe-button";
import { useContext, useState } from "react";
import { Dialog } from "../../../components/modals/dialog";
import { useBudgetService } from "../../../services/budget.service";
import { AuthContext } from "../../../contexts/auth.provider";
import { LogTypeEnum, UserLogs } from "../../../models/user.logs.model";
import axios from "axios";

interface Properties
  extends StackScreenProps<StackParams, "DiscountConfirmation"> {}

export default function DiscountConfirmation({
  navigation,
  route,
}: Properties) {
  const { _branch, _budget, _budgetObject, _discountValue } = route.params;
  const authContext = useContext(AuthContext);
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const service = useBudgetService();

  const releaseDiscount = () => {
    service
      .releaseDiscount(_budget, _branch, _discountValue)
      .then(() => {
        let newLog: UserLogs = {
          title: `Desconto no orçamento ${_budget}`,
          date: `${day}/${month}/${year}`,
          description: `R$ ${_budgetObject.totalBruto - _discountValue}`,
          type: LogTypeEnum.DESCONTO_ORCAMENTO,
        };
        authContext.addLog(newLog);
        Alert("Sucesso", "Efetuado desconto para o orçamento: " + _budget);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          Alert("Erro", "Servidor indisponível");
        } else {
          Alert("Erro", error.response.data.error);
        }
      });
  };

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

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
          <Text style={styles.result}>{_budgetObject.tipoOrcamento}</Text>
          <Text style={styles.description}>Tipo do orçamento</Text>
        </View>
        <View>
          <Text style={styles.result}>{_budgetObject.nomeVendedor}</Text>
          <Text style={styles.description}>Vendedor</Text>
        </View>
        <View>
          <Text style={styles.result}>
            Total R${" "}
            {(_budgetObject.totalBruto - _discountValue)
              .toFixed(2)
              .replace(".", ",")}
          </Text>
          <Text style={styles.description}>
            Pagamento
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              em {_budgetObject.pagamentos[0].forma}
            </Text>
          </Text>
        </View>
        <SwipeButton
          onComplete={releaseDiscount}
          title="EFETUAR DESCONTO"
          underlayTitle="LIBERAR"
        />
      </View>
      <Dialog
        visible={dialog.visible}
        title={dialog.title}
        content={dialog.content}
        dismiss={() => {
          if (dialog.title != "Erro") {
            navigation && navigation.navigate("Home");
          }
          setDialog(defaultDialog);
        }}
      />
      <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
    </ScrollView>
  );
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
