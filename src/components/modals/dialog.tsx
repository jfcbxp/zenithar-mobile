import {
  StyleSheet,
  GestureResponderEvent,
  Modal,
  Text,
  View,
} from "react-native";
import { Button } from "../buttons/button";

interface Properties {
  visible: boolean | undefined;
  dismiss: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  content: string;
}

export function Dialog(properties: Properties) {
  return (
    <Modal
      {...properties}
      visible={properties.visible}
      transparent={true}
      animationType="fade"
    >
      <View style={DialogStyles.container}>
        <View style={DialogStyles.field}>
          <Text style={DialogStyles.title}>{properties.title}</Text>
          <Text style={DialogStyles.content}>{properties.content}</Text>
          <Button onPress={properties.dismiss} title="CONTINUAR" />
        </View>
      </View>
    </Modal>
  );
}

export const DialogStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  field: {
    marginHorizontal: "5%",
    backgroundColor: "#F0F2F7",
    borderRadius: 18,
    padding: "5%",
  },
  title: {
    marginVertical: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    marginVertical: 8,
    paddingHorizontal: "5%",
    fontSize: 16,
    textAlign: "justify",
  },
});
