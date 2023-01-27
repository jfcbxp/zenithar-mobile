import { StyleSheet } from "react-native";
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker";

export function Picker(properties: DropDownPickerProps<any>) {
    return (
        <DropDownPicker {...properties}
            style={styles.picker}
            textStyle={styles.font}
            labelStyle={styles.font}
        />
    )
}

const styles = StyleSheet.create({
    picker: {
        backgroundColor: 'white',
        marginBottom: 24,
        height: 40,
        paddingHorizontal: 16,
        borderWidth: 0,
        borderRadius: 18,
    },
    font: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#123262',
    }
})