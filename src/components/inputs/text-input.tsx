import { StyleSheet, TextInput as ReactNativeTextInput, TextInputProps } from "react-native";

export function TextInput(properties: TextInputProps) {
    return (
        <ReactNativeTextInput {...properties} style={styles.input} />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        color: '#123262',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 18,
        paddingHorizontal: 16,
        marginBottom: 16
    }
})