import { StyleSheet, View, Text } from "react-native";
import { Picker as RNPicker, PickerProps } from "@react-native-picker/picker";
import { InputStyles as styles } from "../inputs/input-styles";

interface Properties extends PickerProps {
    title: string
    children?: React.ReactNode
}

export function Picker(properties: Properties) {
    return (
        <View style={pickerStyles.container}>
            <Text style={pickerStyles.title}>{properties.title}</Text>
            <RNPicker {...properties}
                style={styles.input}>
                {properties.children}
            </RNPicker>
        </View>
    )
}

const pickerStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        marginBottom: 64,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#123262',
        marginBottom: 8,
    },
})