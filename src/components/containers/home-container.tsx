import { StyleSheet, Text, View } from "react-native";
import { Divider } from "../dividers/divider";

interface Properties {
  title: string;
  children?: React.ReactNode;
}

export function HomeContainer(properties: Properties) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{properties.title}</Text>
      <Divider />
      {properties.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: "2.5%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 1,
    borderColor: "#8894ac",
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F537E",
    marginBottom: "2.5%",
  },
});
