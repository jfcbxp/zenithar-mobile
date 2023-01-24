import { TextInput, TextInputProps } from "react-native";
import { TextInputStyles as styles } from "./text-input";

interface Properties extends TextInputProps {
    placeholder?: string
}
export function PasswordInput(properties: Properties) {
    return (
        <TextInput {...properties}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            placeholder={properties.placeholder ? properties.placeholder : "Senha"}
            placeholderTextColor="#1F537E"
            style={styles.input} />
    )
}