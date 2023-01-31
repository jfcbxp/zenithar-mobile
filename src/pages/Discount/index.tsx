import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "../../components/headers/header";
import { HeaderDropdown } from "../../components/dropdowns/discount/header-dropdown";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";
import { StackParams } from "../../types/stack.params";
import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Button } from "../../components/buttons/button";

interface Properties extends StackScreenProps<StackParams, "Discount"> { }

export default function Discount({ navigation }: Properties) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header returnOption={true} />
      </View>
      <View style={styles.body}>
        <ScrollView>
          <HeaderDropdown />
          <ItemsDropdown />
          <PaymentMethodDropdown />
        </ScrollView>
        <View style={styles.footer}>
          <Button
            title="CONCEDER DESCONTO"
            onPress={() => { navigation.navigate("DiscountConfirmation") }} />
        </View>
      </View>
      <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 6,
  },
  footer: {
    marginHorizontal: "5%",
    marginVertical: "5%",
  }
});
