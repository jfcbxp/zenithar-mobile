import { StyleSheet, Text, Pressable, PressableProps } from 'react-native';

interface Properties extends PressableProps {
    title: string
}

export function CommandLink(properties: Properties) {
    return (
        <Pressable {...properties}>
            <Text style={styles.text}>{properties.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        width: '100%',
        height: 40,
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#1F537E',
        textAlign: 'center',
        marginBottom: 40
    }
})