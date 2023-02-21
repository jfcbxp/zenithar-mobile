import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Platform } from "expo-modules-core";

interface Properties extends TouchableOpacityProps {
  disabled?: boolean;
}

export function ButtonGoogle(properties: Properties) {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    if (properties.disabled) {
      setOpacity(0.5);
    } else {
      setOpacity(1);
    }
  }, [properties.disabled]);

  if (Platform.OS == "android" || Platform.OS == "ios") {
    return (
      <TouchableOpacity
        {...properties}
        style={[styles.button, { opacity: opacity }]}
        disabled={properties.disabled}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: 256,
          }}
        >
          <Icon name="google" size={28} color="#1F2D5A" />
          <Text style={styles.text}>ENTRAR COM O GOOGLE</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return <View />;
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#F0F2F7",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#1F2D5A",
    elevation: 3,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#1F2D5A",
  },
});
