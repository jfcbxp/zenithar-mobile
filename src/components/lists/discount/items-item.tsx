import { StyleSheet, View, Image, Text } from "react-native";
import { Itens } from "../../../models/from-api/itens.model";

export function ItemsItem({ data }: { data: Itens }) {
  const hidden = true;
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, alignItems: "center" }}>
        {hidden ? (
          <View style={styles.noPhoto}>
            <Text style={styles.noPhotoText}>
              {data.descricaoProduto.charAt(0).toUpperCase()}
            </Text>
          </View>
        ) : (
          <Image
            source={require("../../../../assets/no-photo.png")}
            style={{ width: 120, height: 100, borderRadius: 10 }}
          />
        )}
        <Text style={styles.title}>{data.produto}</Text>
      </View>
      <View style={{ flex: 4 }}>
        <View>
          <Text style={styles.title}>{data.descricaoProduto}</Text>
          <Text style={styles.description}>Armazem: {data.armazem}</Text>
          <Text style={styles.description}>Tipo: {data.tipoEntrega}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>
            {data.quantidade} x R$ {data.preco.toFixed(2).replace(".", ",")}
          </Text>
          <Text style={styles.title}>
            R$ {data.total.toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
  noPhoto: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#123262",
  },
  noPhotoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
});
