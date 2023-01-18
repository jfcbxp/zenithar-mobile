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
            <View style={styles.area}>
                <Icon
                    name={properties.icon}
                    size={48}
                    color="#123262"
                    style={{alignSelf: 'center'}} />
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
    area: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#123262",
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})