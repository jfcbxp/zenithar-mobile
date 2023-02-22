import { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../types/navigation.params";
import { Button } from "../buttons/button";
import { Picker } from "../pickers/picker";
import { ItemType } from "react-native-dropdown-picker";
import { UserBranch } from "../../models/user.branch.model";
import { DiscountStyles as styles } from "./discount-styles";
import { MaskedInput } from "../inputs/masked-input";

interface Properties extends ModalProps {
  visible?: boolean;
  dismiss?: (event: GestureResponderEvent) => void | null;
  branches?: UserBranch[];
}

export function DiscountModal(properties: Properties) {
  const navigation = useNavigation<NavigationParams>();
  const [budget, setBudget] = useState("");
  const [branch, setBranch] = useState<UserBranch>();
  const [branches, setBranches] = useState<ItemType<UserBranch>[]>();
  const translation = useRef(new Animated.Value(400)).current;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let data = properties.branches;
    if (data) {
      let array: ItemType<UserBranch>[] = [];
      Object.entries(data).forEach(([key, value]) => {
        array = [
          ...array,
          {
            value: value,
            label: `${value.id} - ${value.name}`,
          },
        ];
      });
      setBranches(array);
    }
  }, []);

  useEffect(() => {
    if (budget.length == 6) {
      Keyboard.dismiss();
    }
    if (budget.length == 6 && branch) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [budget, branch]);

  return (
    <Modal
      transparent={true}
      visible={properties.visible}
      animationType="fade"
      onShow={() => {
        Animated.timing(translation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }}
    >
      <View style={styles.container}>
        <Pressable
          onPressIn={() => {
            translation.setValue(400);
            setBranch(undefined);
            setBudget("");
            setOpen(false);
          }}
          onPressOut={properties.dismiss}
          style={StyleSheet.absoluteFillObject}
        />
        <Animated.View
          style={[{ transform: [{ translateY: translation }] }, styles.field]}
        >
          <Text style={styles.title}>Desconto</Text>
          <MaskedInput
            value={budget}
            onChangeText={setBudget}
            autoCapitalize="characters"
            placeholder="Número do Orçamento"
            maxLength={6}
            type="custom"
            options={{
              mask: "SSSSSS",
            }}
          />
          <Picker
            items={branches!}
            value={branch}
            setValue={setBranch}
            open={open}
            setOpen={setOpen}
            placeholder="Filiais"
          />
          <Button
            title="CONTINUAR"
            onPressIn={() => {
              navigation &&
                navigation.navigate("Discount", {
                  _budget: budget.toUpperCase(),
                  _branch: branch!.id,
                });
              translation.setValue(400);
              setOpen(false);
              setBranch(undefined);
              setBudget("");
            }}
            onPressOut={properties.dismiss}
            disabled={disabled}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}
