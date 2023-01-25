import { StyleSheet } from "react-native";
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

interface Properties extends PickerSelectProps {
    placeholder: string
}

export function Picker(properties: Properties) {
    return (
        <RNPickerSelect {...properties}
            pickerProps={{ style: styles.input }}
            placeholder={{ label: properties.placeholder }} />
    )
}

export const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        color: '#123262',
        marginBottom: 16
    },
})