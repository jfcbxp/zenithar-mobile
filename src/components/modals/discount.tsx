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
import { AuthContext } from "../../contexts/auth.provider";
import { Button } from "../buttons/button";
import { Picker } from "../pickers/picker";
import { ItemType } from "react-native-dropdown-picker";

interface Properties extends ModalProps {
  visible?: boolean;
  dismiss?: (event: GestureResponderEvent) => void | null;
}

export function DiscountModal(properties: Properties) {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationParams>();
  const [budget, setBudget] = useState("");
  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState<ItemType<any>[]>();
  const translation = useRef(new Animated.Value(400)).current;
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let data = authContext.user?.branches!;
    let array: ItemType<any>[] = [];
    Object.entries(data).forEach(([key, value]) => {
      array = [
        ...array,
        {
          value: value.id,
          label: `${value.id} - ${value.name}`,
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
          toValue: 1, duration: 500, useNativeDriver: true
        }).start()
      }}>
      <View style={styles.container}>
        <Pressable
          onPressIn={() => {
            translation.setValue(400)
            setOpen(false)
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
            setValue={setBranch}
            open={open}
            setOpen={setOpen}
            placeholder="Filiais" />
          <Button
            title="CONTINUAR"
            onPressIn={() => {
              translation.setValue(400)
              setOpen(false)
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
