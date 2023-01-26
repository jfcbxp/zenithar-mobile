import { TextStyle } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

interface Properties extends PickerSelectProps {
    placeholder: string
}

export function Picker(properties: Properties) {
    return (
        <RNPickerSelect {...properties}
            placeholder={{
                label: properties.placeholder,
            }}
            style={{
                inputIOS: styles,
                inputAndroid: styles
            }} />
    )
}

const styles: TextStyle = {
    backgroundColor: 'white',
    marginBottom: 24,
    height: 40,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
}