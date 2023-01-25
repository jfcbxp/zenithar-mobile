import { StyleSheet } from "react-native";
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

interface Properties extends PickerSelectProps {
    placeholder: string
}

export function Picker(properties: Properties) {
    return (
        <RNPickerSelect {...properties}
            pickerProps={{ style: styles.input }}
            placeholder={{
                label: properties.placeholder,
                color: '#123262'
            }}
            style={{
                inputIOS: styles.input,
                inputAndroid: styles.input
            }} />
    )
}

export const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        marginBottom: 16,
    },
})