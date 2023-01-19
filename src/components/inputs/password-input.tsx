import { TextInput, TextInputProps } from "react-native";
import { TextInputStyles as styles } from "./text-input";

export function PasswordInput(properties: TextInputProps) {
    return (
        <TextInput {...properties}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            placeholder="Senha"
            placeholderTextColor="#1F537E"
            style={styles.input} />
    )
}