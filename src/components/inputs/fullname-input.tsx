import { TextInput, TextInputProps } from "react-native";
import { InputStyles as styles } from "./input-styles";

export function FullNameInput(properties: TextInputProps) {
    return (
        <TextInput {...properties}
            placeholder="Nome completo"
            placeholderTextColor="#1F537E"
            style={styles.input} />
    )
}