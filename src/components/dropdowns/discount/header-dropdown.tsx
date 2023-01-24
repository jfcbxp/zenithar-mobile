import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { DropdownStyles as styles } from '../dropdown-styles'
import { Feather as Icon } from "@expo/vector-icons";

interface Properties {
    budget?: number
    branch?: string
}

export function HeaderDropdown(properties: Properties) {
    const [visible, setVisible] = React.useState(false)

    const expand = () => {
        setVisible(current => (current === false ? current = true : current = false))
    }

    return (
        <View>
            <Pressable style={styles.container}
                onPress={expand}>
                <View style={styles.area}>
                    <Text style={styles.text}>Cabeçalho</Text>
                    <Icon
                        name={visible === false ? 'chevron-down' : 'chevron-up'}
                        size={32} />
                </View>
            </Pressable>
            {visible &&
                <View style={styles.children}>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Código vendedor</Text>
                        <Text style={styles.subText}>000054</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Nome vendedor</Text>
                        <Text style={styles.subText}>ANDERSON GEORGE NOGUEIRA DINIZ</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Código cliente</Text>
                        <Text style={styles.subText}>119749</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Nome cliente</Text>
                        <Text style={styles.subText}>JOSE CARLOS NUNES COSTA</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Loja cliente</Text>
                        <Text style={styles.subText}>{properties.branch}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Status orçamento</Text>
                        <Text style={styles.subText}>Processado Pdv</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Tipo orçamento</Text>
                        <Text style={styles.subText}>Normal</Text>
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
                        <Text style={styles.subText}>Observação</Text>
                        <Text style={styles.subText}>ADRIANA 991557037</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Total bruto</Text>
                        <Text style={styles.subText}>R$ 233,40</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.subText}>Total líquido</Text>
                        <Text style={styles.subText}>R$ 233,40</Text>
                    </View>
                </View>
            }
        </View>
    )
}