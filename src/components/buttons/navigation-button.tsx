import { StyleSheet, Pressable, PressableProps, Text, View } from "react-native";
import { MaterialIcons as Icon } from '@expo/vector-icons';

interface Properties extends PressableProps {
    icon: any
    title: string
}

export function NavigationButton(properties: Properties) {
    return (
        <Pressable {...properties}
            style={styles.container}>
            <View>
                <Icon
                    name={properties.icon}
                    size={38}
                    color="#123262"
                    style={{ marginVertical: 16 }} />
                <Text style={styles.text}>{properties.title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 105,
        height: 105,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#8894ac',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#123262",
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: -26
    }
})