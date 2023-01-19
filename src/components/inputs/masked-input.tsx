import { TextInputMask, TextInputMaskProps } from "react-native-masked-text"
import { TextInputStyles as styles } from './text-input'

interface Properties extends TextInputMaskProps { }

export function MaskedInput(properties: Properties) {
    return (
        <TextInputMask {...properties} style={styles.input} />
    )
}