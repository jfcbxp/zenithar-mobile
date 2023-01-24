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
                    size={42}
                    color="#123262"
                    style={{alignSelf: 'center'}} />
                <Text style={styles.text}>{properties.title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
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
        paddingVertical: 14,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#123262",
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})