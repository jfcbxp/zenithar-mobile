import { TextInput as ReactNativeTextInput, TextInputProps } from "react-native";
import { InputStyles as styles } from "./input-styles";

export function TextInput(properties: TextInputProps) {
    return (
        <ReactNativeTextInput {...properties} 
        placeholderTextColor= "#123262"
        style={styles.input} />
    )
}