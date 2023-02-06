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
import { TextInput } from "../inputs/text-input";
import { Button } from "../buttons/button";

interface Properties extends ModalProps {
    visible: boolean;
    dismiss?: (event: GestureResponderEvent) => void | null;
}

export function ApplyDiscountModal(properties: Properties) {
    const navigation = useNavigation<NavigationParams>();
    const translation = useRef(new Animated.Value(400)).current;
    const [percentage, setPercentage] = useState("")
    const [value, setValue] = useState("")

    const reset = () => {
        setPercentage("")
        setValue("")
        translation.setValue(400);
    }

    return (
        <Modal
            transparent={true}
            visible={properties.visible}
            animationType="fade"
            onShow={() => {
                Animated.timing(translation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }}
        >
            <View style={styles.container}>
                <Pressable
                    onPressIn={reset}
                    onPressOut={properties.dismiss}
                    style={StyleSheet.absoluteFillObject} />
                <Animated.View
                    style={[
                        { transform: [{ translateY: translation }] },
                        styles.field
                    ]}>
                    <Text style={styles.title}>Desconto</Text>
                    <TextInput
                        value={percentage}
                        onChangeText={setPercentage}
                        keyboardType="numeric"
                        maxLength={2}
                        placeholder="Desconto %" />
                    <MaskedInput
                        value={value}
                        onChangeText={(maskedText, rawText) => {
                            setValue(rawText!)
                        }}
                        placeholder="Desconto Valor"
                        type="money"
                        options={{
                            precision: 2,
                            separator: ",",
                            delimiter: ".",
                            unit: "R$ ",
                            suffixUnit: ""
                        }} />
                    <Button
                        title="CONTINUAR"
                        onPressIn={() => {
                            navigation && navigation.navigate("DiscountConfirmation");
                            reset();
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
        justifyContent: "flex-end",
        backgroundColor: `rgba(0, 0, 0, 0.8)`,
    },
    field: {
        position: "absolute",
        width: "100%",
        height: "50%",
        alignItems: "center",
        paddingHorizontal: "5%",
        backgroundColor: "#F0F2F7",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        zIndex: 99,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#454545",
        marginVertical: 32,
    },
});
