import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Pagamentos } from "../../../models/from-api/pagamentos.model";

export function PaymentMethodItem({ data }: { data: Pagamentos }) {
  const value: number = +data.valor;
  const installments: number = +data.parcelas;
  const [installment] = useState(value / installments);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.forma}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.description}>
          {data.parcelas} x R$ {installment.toFixed(2).replace(".", ",")}
        </Text>
        <Text style={styles.title}>
          R$ {data.valor.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DFE1E6",
    borderRadius: 10,
    padding: 8,
    marginVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#123262",
  },
  description: {
    fontSize: 12,
    color: "grey",
  },
});
