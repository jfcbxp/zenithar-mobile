import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ListRenderItem } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Button } from "../../components/buttons/button";
import { ApplyDiscountModal } from "../../components/modals/apply-discount";
import { Orcamento } from "../../models/from-api/orcamento.model";
import { Dialog } from "../../components/modals/dialog";
import { GetTokenJWT } from "../../services/token-jwt.service";
import { LoadBudget } from "../../services/budget.service";
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

  const renderItemItens: ListRenderItem<Itens> = ({ item }) => {
    return <ItemsItem data={item} />;
  };

  const renderItemPagamentos: ListRenderItem<Pagamentos> = ({ item }) => {
    return <PaymentMethodItem data={item} />;
  };

  useEffect(() => {
    GetTokenJWT(authContext.user?.uid!, authContext.urlBackend!)
      .then((authToken) => {
        LoadBudget(_budget, _branch, authToken?.token!, authContext.urlBackend!)
          .then((budget) => setBudgetData(budget))
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              Alert("Erro", "Servidor indisponível");
            } else {
              Alert("Erro", error.response.data.error);
            }
          });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          Alert("Erro", "Servidor indisponível");
        } else {
          Alert("Erro", error.response.data.error);
        }
      });
  }, []);

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

  if (dialog.title != "Erro") {
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
                {budgetData?.vendedor} - {budgetData?.nomeVendedor}
              </Text>
              <Text style={styles.title}>Cliente</Text>
              <Text style={styles.subTitle}>
                {budgetData?.cliente} - {budgetData?.nomeCliente}
              </Text>
            </View>
            <View style={styles.budget}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <View style={[{ backgroundColor: "limegreen" }, styles.box]}>
                  <Text style={styles.headerText}>
                    {budgetData?.tipoOrcamento}
                  </Text>
                </View>
                <View style={[{ backgroundColor: "red" }, styles.box]}>
                  <Text style={styles.headerText}>
                    {budgetData?.statusOrcamento}
                  </Text>
                </View>
              </View>
              {budgetData?.desconto! > 0 ? (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "grey",
                      textDecorationLine: "line-through",
                    }}
                  >
                    R$ {budgetData?.totalBruto.toFixed(2).replace(".", ",")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    R$ {budgetData?.totalLiquido.toFixed(2).replace(".", ",")}
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
                  R$ {budgetData?.totalLiquido.toFixed(2).replace(".", ",")}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.bottomField}>
          <View style={{ flex: 5, paddingTop: "2.5%" }}>
            <Dropdown
              title="Itens"
              renderItem={renderItemItens}
              data={budgetData?.itens}
            />
            <Dropdown
              renderItem={renderItemPagamentos}
              title="Forma de pagamento"
              data={budgetData?.pagamentos}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button onPress={() => setVisible(true)} title="CONTINUAR" />
          </View>
        </View>
        <ApplyDiscountModal
          dismiss={() => {
            navigation.navigate("DiscountConfirmation", {
              _budget: _budget,
              _branch: _branch,
              _budgetObject: budgetData!,
              _discountValue: _discountValue!,
            });
            setVisible(false);
          }}
          discountLimit={authContext.user?.discountLimit!}
          visible={visible}
          budget={_budget}
          branch={_branch}
          total={budgetData?.totalBruto!}
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
      <View style={styles.container}>
        <Dialog
          visible={dialog.visible}
          title={dialog.title}
          content={dialog.content}
          dismiss={() => {
            navigation.navigate("Home");
            setDialog(defaultDialog);
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
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  topField: {
    flex: 2,
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
    flex: 4,
    flexDirection: "column",
    marginHorizontal: "5%",
  },
});
