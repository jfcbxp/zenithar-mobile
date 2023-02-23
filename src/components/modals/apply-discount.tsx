import { useState, useRef } from "react";
import {
  StyleSheet,
  Modal,
  ModalProps,
  View,
  Text,
  GestureResponderEvent,
  Pressable,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../types/navigation.params";
import { MaskedInput } from "../inputs/masked-input";
import { Button } from "../buttons/button";
import { DiscountStyles as styles } from "./discount-styles";
import { Dialog } from "./dialog";
import { Orcamento } from "../../models/from-api/orcamento.model";

interface Properties extends ModalProps {
  visible: boolean;
  dismiss?: (event: GestureResponderEvent) => void | null;
  total: number;
  budget: string;
  branch: string;
  budgetObject: Orcamento;
  discountLimit: number;
}

export function ApplyDiscountModal(properties: Properties) {
  const navigation = useNavigation<NavigationParams>();
  const translation = useRef(new Animated.Value(400)).current;
  const [percentage, setPercentage] = useState("");
  const [value, setValue] = useState("");
  const [newTotal, setNewTotal] = useState("");
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);
  const [discountValue, setDiscountValue] = useState(0);

  const changePercentageByValue = (value: number) => {
    let total = properties.total;
    let discountPercentage = (value * 100) / total;
    if (discountPercentage > properties.discountLimit) {
      Alert(
        "Aviso",
        `Limite de desconto permitido: ${properties.discountLimit}%`
      );
    } else {
      setPercentage(discountPercentage.toString());
      total -= value;
      setNewTotal(total.toFixed(2).replace(".", ","));
      setDiscountValue(value);
    }
  };

  const changeValueByPercentage = (percentage: number) => {
    let total = properties.total;
    if (percentage > properties.discountLimit) {
      Alert(
        "Aviso",
        `Limite de desconto permitido: ${properties.discountLimit}%`
      );
    } else {
      let newValue = (total * percentage) / 100;
      setValue(newValue.toFixed(2));
      total -= newValue;
      setNewTotal(total.toFixed(2).replace(".", ","));
      setDiscountValue(newValue);
    }
  };

  const initialValues = () => {
    setDialog(defaultDialog);
    setPercentage("");
    setValue("");
    setNewTotal("");
  };

  const reset = () => {
    initialValues();
    translation.setValue(400);
  };

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

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
          onPressIn={() => reset()}
          onPressOut={properties.dismiss}
          style={StyleSheet.absoluteFillObject}
        />
        <Animated.View
          style={[{ transform: [{ translateY: translation }] }, styles.field]}
        >
          <Text style={styles.title}>Desconto</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "red",
              marginBottom: 16,
            }}
          >
            {newTotal ? `R$ ${newTotal}` : ""}
          </Text>
          <MaskedInput
            value={percentage}
            onChangeText={(maskedText, rawText) => {
              setPercentage(rawText!);
              changeValueByPercentage(parseFloat(rawText!));
            }}
            placeholder="Desconto %"
            onFocus={() => {
              initialValues();
            }}
            type="money"
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "% ",
              suffixUnit: "",
            }}
          />

          <MaskedInput
            value={value}
            onChangeText={(maskedText, rawText) => {
              setValue(rawText!);
              changePercentageByValue(parseFloat(rawText!));
            }}
            placeholder="Desconto Valor"
            onFocus={() => {
              initialValues();
            }}
            type="money"
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$ ",
              suffixUnit: "",
            }}
          />
          <Button
            title="CONTINUAR"
            onPressIn={() => {
              navigation &&
                navigation.navigate("DiscountConfirmation", {
                  _budget: properties.budget,
                  _branch: properties.branch,
                  _budgetObject: properties.budgetObject,
                  _discountValue: discountValue,
                });
              reset();
            }}
            onPressOut={properties.dismiss}
          />
        </Animated.View>
        <Dialog
          visible={dialog.visible}
          title={dialog.title}
          content={dialog.content}
          dismiss={initialValues}
        />
      </View>
    </Modal>
  );
}
