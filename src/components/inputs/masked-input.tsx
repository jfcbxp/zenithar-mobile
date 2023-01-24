import { TextInputMask, TextInputMaskProps } from "react-native-masked-text"
import { InputStyles as styles } from "./input-styles";

interface Properties extends TextInputMaskProps { }

export function MaskedInput(properties: Properties) {
    return (
        <TextInputMask {...properties} style={styles.input} />
    )
}