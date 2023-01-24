import { useState } from 'react'
import { StyleSheet, Modal, ModalProps, View, Text, GestureResponderEvent, Pressable } from 'react-native'
import { SwipeButton } from '../buttons/swipe-button'
import { TextInput } from '../inputs/text-input'
import { useNavigation } from '@react-navigation/native'
import { NavigationParams } from '../../types/navigation.params'

interface Properties extends ModalProps {
    visible?: boolean | undefined
    dismiss?: ((event: GestureResponderEvent) => void) | undefined
}

export function Discount(properties: Properties) {
    const navigation = useNavigation<NavigationParams>()
    const [budget, setBudget] = useState('')

    return (
        <Modal {...properties}
            transparent={true}
            visible={properties.visible}
            animationType='fade'>
            <View style={styles.container}>
                <Pressable onPress={properties.dismiss} style={StyleSheet.absoluteFillObject} />
                <View style={styles.field}>
                    <Text style={styles.title}>Desconto</Text>
                    <TextInput
                        value={budget}
                        onChangeText={setBudget}
                        keyboardType='numeric'
                        placeholder='Número do Orçamento'
                        placeholderTextColor='#1F537E' />
                    <SwipeButton
                        title='CONSULTAR'
                        onSwipeSuccess={() => { }} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    field: {
        height: '50%',
        alignItems: 'center',
        paddingHorizontal: '5%',
        backgroundColor: '#F0F2F7',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#454545',
        marginVertical: 32,
    },
})