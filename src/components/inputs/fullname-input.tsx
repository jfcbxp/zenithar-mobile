import { TextInput, TextInputProps } from "react-native";
import { TextInputStyles as styles } from "./text-input";

export function FullNameInput(properties: TextInputProps) {
    return (
        <TextInput {...properties}
            placeholder="Nome completo"
            placeholderTextColor="#1F537E"
            style={styles.input} />
    )
}