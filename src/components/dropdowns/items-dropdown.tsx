import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { DropdownStyles as styles } from './dropdown-styles'
import { Feather as Icon } from "@expo/vector-icons";

interface Properties {
    budget?: number
    branch?: string
}

export function ItemsDropdown(properties: Properties) {
    const [visible, setVisible] = React.useState(false)

    const expand = () => {
        setVisible(current => (current === false ? current = true : current = false))
    }

    return (
        <View>
            <Pressable style={styles.container}
                onPress={expand}>
                <View style={styles.area}>
                    <Text style={styles.text}>Itens</Text>
                    <Icon
                        name={visible === false ? 'chevron-down' : 'chevron-up'}
                        size={32} />
                </View>
            </Pressable>
            {visible &&
                <View style={styles.children}>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Produto</Text>
                        <Text style={styles.subText}>005001</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Descrição</Text>
                        <Text style={styles.subText}>CIMENTO 50KG NASSAU</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Quantidade</Text>
                        <Text style={styles.subText}>6</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Preço</Text>
                        <Text style={styles.subText}>R$ 38,90</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Total</Text>
                        <Text style={styles.subText}>R$ 233,40</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Desconto %</Text>
                        <Text style={styles.subText}>0%</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Valor desconto</Text>
                        <Text style={styles.subText}>R$ 0,00</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Armazém</Text>
                        <Text style={styles.subText}>01</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Tipo entrega</Text>
                        <Text style={styles.subText}>Entrega</Text>
                    </View>
                </View>
            }
        </View>
    )
}