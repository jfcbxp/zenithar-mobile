import { StyleSheet, View, Image, GestureResponderEvent } from "react-native";
import { Button } from "../buttons/button";

interface Properties {
  editable?: boolean;
  source?: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function Portrait(properties: Properties) {
  return (
    <View style={styles.container}>
      <Image
        source={
          properties.source
            ? { uri: properties.source }
            : require("../../../assets/no-user.png")
        }
        style={styles.image}
      />
      <Button
        title="SELECIONAR"
        disabled={properties.editable ? properties.editable : false}
        onPress={properties.onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 172,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 16,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 90,
    marginBottom: 2,
  },
});
