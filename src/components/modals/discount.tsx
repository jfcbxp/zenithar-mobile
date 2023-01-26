import { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Modal,
  ModalProps,
  View,
  Text,
  GestureResponderEvent,
  Pressable,
  Keyboard,
  Animated,
} from "react-native";
import { TextInput } from "../inputs/text-input";
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../types/navigation.params";
import { Picker } from "../pickers/picker";
import { AuthContext } from "../../contexts/auth.provider";
import { Item } from "react-native-picker-select";
import { Button } from "../buttons/button";

interface Properties extends ModalProps {
  visible?: boolean;
  dismiss?: (event: GestureResponderEvent) => void | null;
}

export function DiscountModal(properties: Properties) {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationParams>();
  const [budget, setBudget] = useState("");
  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState<Item[]>();
  const translation = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    let data = authContext.user?.branches!;
    let array: Item[] = [];
    Object.entries(data).forEach(([key, value]) => {
      array = [
        ...array,
        {
          key: key,
          value: value.id,
          label: `${value.id} - ${value.name}`,
          color: "#123262",
        },
      ];
    });
    setBranches(array);
  }, []);

  useEffect(() => {
    if (budget.length == 6) {
      Keyboard.dismiss();
    }
  }, [budget]);

  return (
    <Modal
      transparent={true}
      visible={properties.visible}
      animationType="fade"
      onShow={() => {
        Animated.timing(translation, {
          toValue: 1, useNativeDriver: true
        }).start()
      }}>
      <View style={styles.container}>
        <Pressable
          onPressIn={() => {
            translation.setValue(400)
          }}
          onPressOut={properties.dismiss}
          style={StyleSheet.absoluteFillObject} />
        <Animated.View style={[{ transform: [{ translateY: translation }] }, styles.field]}>
          <Text style={styles.title}>Desconto</Text>
          <TextInput
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
            placeholder="Número do Orçamento"
            maxLength={6}
            placeholderTextColor="#1F537E" />
          <Picker
            items={branches!}
            value={branch}
            onValueChange={setBranch}
            placeholder="Filiais" />
          <Button
            title="CONTINUAR"
            onPressIn={() => {
              translation.setValue(400)
              navigation.navigate("Discount")
            }}
            onPressOut={properties.dismiss} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
  },
  field: {
    position: 'absolute',
    width: "100%",
    height: "50%",
    alignItems: "center",
    paddingHorizontal: "5%",
    backgroundColor: "#F0F2F7",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    zIndex: 99
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#454545",
    marginVertical: 32,
  },
});
