import { useState, useEffect } from "react";
import { StyleSheet, View, Image, GestureResponderEvent } from "react-native";
import { Button } from "../buttons/button";

interface Properties {
  editable: boolean;
  source?: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function Portrait(properties: Properties) {
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    setDisable(properties.editable ? false : true)
  }, [properties.editable])

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
        disabled={disable}
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
