import { StyleSheet, GestureResponderEvent, Modal, ModalProps, Text, View } from "react-native";
import { Button } from "../buttons/button";

interface Properties extends ModalProps {
    visible?: boolean | undefined
    dismiss?: ((event: GestureResponderEvent) => void) | undefined
    title: string
    content: string
}

export function Dialog(properties: Properties) {
    return (
        <Modal {...properties}
            visible={properties.visible}
            transparent={true}
            animationType="fade">
            <View style={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.title}>{properties.title}</Text>
                    <Text style={styles.content}>{properties.content}</Text>
                    <Button onPress={properties.dismiss} title='CONTINUAR' />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    field: {
        marginHorizontal: '5%',
        backgroundColor: '#F0F2F7',
        borderRadius: 18,
        padding: '5%',
    },
    title: {
        marginVertical: 8,
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        marginVertical: 8,
        paddingHorizontal: '5%',
        fontSize: 16,
        textAlign: 'justify',
    }
})