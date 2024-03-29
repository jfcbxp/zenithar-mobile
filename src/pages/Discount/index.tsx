import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  ListRenderItem,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Button } from "../../components/buttons/button";
import { ApplyDiscountModal } from "../../components/modals/apply-discount";
import { Orcamento } from "../../models/from-api/orcamento.model";
import { Dialog } from "../../components/modals/dialog";
import { useBudgetService } from "../../services/budget.service";
import { AuthContext } from "../../contexts/auth.provider";
import { Dropdown } from "../../components/dropdowns/dropdown";
import { Itens } from "../../models/from-api/itens.model";
import { Pagamentos } from "../../models/from-api/pagamentos.model";
import { ItemsItem } from "../../components/lists/discount/items-item";
import { PaymentMethodItem } from "../../components/lists/discount/payment-method-item";
import axios from "axios";

interface Properties extends StackScreenProps<StackParams, "Discount"> {}

export default function Discount({ route, navigation }: Properties) {
  const { _budget, _branch, _discountValue } = route.params;
  const authContext = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [budgetData, setBudgetData] = useState<Orcamento>();
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);
  const service = useBudgetService();

  const renderItemItens: ListRenderItem<Itens> = ({ item }) => {
    return <ItemsItem data={item} />;
  };

  const renderItemPagamentos: ListRenderItem<Pagamentos> = ({ item }) => {
    return <PaymentMethodItem data={item} />;
  };

  useEffect(() => {
    service
      .loadBudget(_budget, _branch)
      .then((budget) => {
        setBudgetData(budget);
      })
      .catch((result) => {
        if (axios.isAxiosError(result)) {
          if (result.response?.data?.error) {
            Alert("Erro", result.response?.data?.error);
          } else {
            Alert("Erro", "Servidor indisponível");
          }
        }
      });
  }, []);

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

  if (budgetData) {
    return (
      <View style={styles.container}>
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
            <Text style={styles.headerText}>Orçamento #{_budget}</Text>
          </View>
          <View
            style={{
              flex: 4,
              justifyContent: "space-between",
              paddingBottom: 8,
            }}
          >
            <View>
              <Text style={styles.title}>Vendedor</Text>
              <Text style={styles.subTitle}>
                {budgetData.vendedor} - {budgetData.nomeVendedor}
              </Text>
              <Text style={styles.title}>Cliente</Text>
              <Text style={styles.subTitle}>
                {budgetData.cliente} - {budgetData.nomeCliente}
              </Text>
            </View>
            <View style={styles.budget}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <View style={[{ backgroundColor: "limegreen" }, styles.box]}>
                  <Text style={styles.headerText}>
                    {budgetData.tipoOrcamento}
                  </Text>
                </View>
                <View style={[{ backgroundColor: "red" }, styles.box]}>
                  <Text style={styles.headerText}>
                    {budgetData.statusOrcamento}
                  </Text>
                </View>
              </View>
              {budgetData.desconto > 0 ? (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "grey",
                      textDecorationLine: "line-through",
                    }}
                  >
                    R$ {budgetData.totalBruto.toFixed(2).replace(".", ",")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    R$ {budgetData.totalLiquido.toFixed(2).replace(".", ",")}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  R$ {budgetData.totalLiquido.toFixed(2).replace(".", ",")}
                </Text>
              )}
            </View>
          </View>
        </View>
        <ScrollView style={styles.bottomField}>
          <Dropdown
            title="Itens"
            renderItem={renderItemItens}
            data={budgetData.itens}
          />
          <Dropdown
            renderItem={renderItemPagamentos}
            title="Forma de pagamento"
            data={budgetData.pagamentos}
          />
        </ScrollView>
        <footer>
          <View style={{ padding: "5%" }}>
            <Button title="CONTINUAR" onPress={() => setVisible(true)} />
          </View>
        </footer>
        <ApplyDiscountModal
          dismiss={() => {
            setVisible(false);
          }}
          budgetObject={budgetData}
          discountLimit={authContext.user?.discountLimit!}
          visible={visible}
          budget={_budget}
          branch={_branch}
          total={budgetData.totalBruto}
        />
        <Dialog
          visible={dialog.visible}
          title={dialog.title}
          content={dialog.content}
          dismiss={() => setDialog(defaultDialog)}
        />
        <StatusBar
          style="light"
          translucent={false}
          backgroundColor="#212A4D"
        />
      </View>
    );
  } else {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={128} color="white" />
        <Dialog
          visible={dialog.visible}
          title={dialog.title}
          content={dialog.content}
          dismiss={() => {
            navigation && navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F0F2F7",
  },
  loading: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212A4D",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  topField: {
    height: 256,
    backgroundColor: "#1F2D5A",
  },
  title: {
    fontSize: 14,
    color: "silver",
    paddingHorizontal: "5%",
  },
  subTitle: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: "5%",
    marginBottom: 8,
  },
  budget: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
  },
  box: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  bottomField: {
    flex: 5,
    paddingTop: "2.5%",
    marginHorizontal: "5%",
  },
});
