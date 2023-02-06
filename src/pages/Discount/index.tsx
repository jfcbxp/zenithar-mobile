import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Button } from "../../components/buttons/button";
import { ApplyDiscountModal } from "../../components/modals/apply-discount";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";

interface Properties
  extends StackScreenProps<StackParams, "Discount"> { }

export default function Discount({ navigation }: Properties) {
  const [visible, setVisible] = useState(false)
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
        <Text style={styles.title}>Vendedor</Text>
        <Text style={styles.subTitle}>000054 - ANDERSON</Text>
        <Text style={styles.title}>Cliente</Text>
        <Text style={styles.subTitle}>119749 - JOSE CARLOS</Text>
        <View style={styles.budget}>
          <View style={{ flexDirection: "row" }}>
            <View style={[{ backgroundColor: "limegreen" }, styles.box]}>
              <Text style={styles.headerText}>Normal</Text>
            </View>
            <View style={[{ backgroundColor: "red" }, styles.box]}>
              <Text style={styles.headerText}>Proc. PDV</Text>
            </View>
          </View>
          <Text style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
          }}>R$ 200,00</Text>
        </View>
      </View>
      <View style={styles.bottomField}>
        <View style={{ flex: 6, paddingTop: "2.5%" }}>
          <ItemsDropdown />
          <PaymentMethodDropdown />
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
    marginTop: 52,
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
