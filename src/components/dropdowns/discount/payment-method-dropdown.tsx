import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { DropdownStyles as styles } from '../dropdown-styles'
import { Feather as Icon } from "@expo/vector-icons";

interface Properties {
    budget?: number
    branch?: string
}

export function PaymentMethodDropdown(properties: Properties) {
    const [visible, setVisible] = React.useState(false)

    const expand = () => {
        setVisible(current => (current == false ? true : false))
    }

    return (
        <View>
            <Pressable style={styles.container}
                onPress={expand}>
                <View style={styles.area}>
                    <Text style={styles.text}>Forma de pagamento</Text>
                    <Icon
                        name={visible === false ? 'chevron-down' : 'chevron-up'}
                        size={32} />
                </View>
            </Pressable>
            {visible &&
                <View style={styles.children}>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Forma</Text>
                        <Text style={styles.subText}>CC</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Valor</Text>
                        <Text style={styles.subText}>R$ 233,40</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Parcelas</Text>
                        <Text style={styles.subText}>3</Text>
                    </View>
                </View>
            }
        </View>
    )
}