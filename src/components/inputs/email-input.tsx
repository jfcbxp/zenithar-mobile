import { TextInput, TextInputProps } from "react-native";
import { TextInputStyles as styles } from "./text-input";

export function EmailInput(properties: TextInputProps) {
    return (
        <TextInput {...properties}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            maxFontSizeMultiplier={14}
            placeholder="E-mail"
            placeholderTextColor="#1F537E"
            style={styles.input} />
    )
}