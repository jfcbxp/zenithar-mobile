import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface Properties extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
}

export function Button(properties: Properties) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(properties.disabled ? 0.5 : 1);
  }, [properties.disabled]);

  return (
    <TouchableOpacity
      {...properties}
      disabled={properties.disabled}
      style={[styles.button, { opacity: opacity }]}
    >
      <Text style={styles.text}>{properties.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#1F2D5A",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 90,
    elevation: 3,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
