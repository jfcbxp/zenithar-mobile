import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Button } from "../../components/buttons/button";
import { ApplyDiscountModal } from "../../components/modals/apply-discount";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { Orcamento } from "../../models/from-api/orcamento.model";
import { Dialog } from "../../components/modals/dialog";
import { AxiosResponse } from "axios";
import { API } from "../../services/api";
import { AuthContext } from "../../contexts/auth.provider";
import { AuthToken } from "../../models/from-api/authtoken.model";
import GetSecret from "../../services/auth-secret";

interface Properties
  extends StackScreenProps<StackParams, "Discount"> { }

export default function Discount({ route, navigation }: Properties) {
  const { _budget, _branch } = route.params
  const authContext = useContext(AuthContext)
  const [visible, setVisible] = useState(false)
  const [budget] = useState(_budget)
  const [branch] = useState(_branch)
  const [budgetData, setBudgetData] = useState<Orcamento>()
  const defaultDialog = { title: "", content: "", visible: false }
  const [dialog, setDialog] = useState(defaultDialog);

  useEffect(() => {
    loadBudget(budget, branch)
      .then(budget => setBudgetData(budget))
      .catch(error => Alert("Erro", "Os dados do orçamento não foram encontrados" + error.message))
  }, [])

  const getTokenJwt = async (): Promise<AuthToken> => {
    const secret = GetSecret(authContext.urlBackend!)
    const authToken: AuthToken = {
      email: authContext.user?.email!,
      uuid: authContext.user?.uid!,
      secret: secret
    }
    const api = API(authContext.urlBackend!)
    const url: string = `auth/token`;
    const response: AxiosResponse<AuthToken> = await api.post<AuthToken>(url, authToken);
    return response.data;
  };

  const loadBudget = async (budget: string, branch: string): Promise<Orcamento> => {
    const authToken = await getTokenJwt();
    const api = API(authContext.urlBackend!, authToken.token)
    const url: string = `orcamento/consultar?numeroOrcamento=${budget}&empresa=${branch}`;
    const response: AxiosResponse<Orcamento> = await api.get<Orcamento>(url);
    return response.data;
  };

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

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
          <Text style={styles.headerText}>Orçamento #564354</Text>
        </View>
        <View style={{ flex: 4, justifyContent: "space-between", paddingBottom: 8 }}>
          <View>
            <Text style={styles.title}>Vendedor</Text>
            <Text style={styles.subTitle}>{budgetData?.vendedor} - {budgetData?.nomeVendedor}</Text>
            <Text style={styles.title}>Cliente</Text>
            <Text style={styles.subTitle}>{budgetData?.cliente} - {budgetData?.nomeCliente}</Text>
          </View>
          <View style={styles.budget}>
            <View style={{ flexDirection: "row" }}>
              <View style={[{ backgroundColor: "limegreen" }, styles.box]}>
                <Text style={styles.headerText}>{budgetData?.tipoOrcamento}</Text>
              </View>
              <View style={[{ backgroundColor: "red" }, styles.box]}>
                <Text style={styles.headerText}>{budgetData?.statusOrcamento}</Text>
              </View>
            </View>
            <Text style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}>R$ {budgetData?.totalBruto.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomField}>
        <View style={{ flex: 5, paddingTop: "2.5%" }}>
          <ItemsDropdown
            data={budgetData?.itens} />
          <PaymentMethodDropdown
            data={budgetData?.pagamentos} />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => { setVisible(true) }}
            title="CONTINUAR" />
        </View>
      </View>
      <ApplyDiscountModal
        dismiss={() => {
          setVisible(false)
        }}
        visible={visible} />
      <Dialog
        visible={dialog.visible}
        title={dialog.title}
        content={dialog.content}
        dismiss={() => setDialog(defaultDialog)} />
      <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
    </View>
  );
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
