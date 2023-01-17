import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Properties extends TouchableOpacityProps {
    title: string
}

export function Button(properties: Properties) {
    return (
        <TouchableOpacity {...properties} style={styles.button}>
            <Text style={styles.text}>{properties.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#1F2D5A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 18,
        elevation: 3,
        marginTop: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
    }
})