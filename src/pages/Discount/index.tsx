import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import { Header } from "../../components/headers/header";
import { HeaderDropdown } from "../../components/dropdowns/discount/header-dropdown";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";
import { StackParams } from "../../types/stack.params";
import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

interface Properties extends StackScreenProps<StackParams, "Discount"> {}

export default function Discount({ navigation }: Properties) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header returnOption={true} />
      </View>
      <View style={styles.body}>
        <ScrollView>
          <HeaderDropdown />
          <ItemsDropdown />
          <PaymentMethodDropdown />
        </ScrollView>
      </View>
      <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
    </SafeAreaView>
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
    flex: 5,
  },
});
