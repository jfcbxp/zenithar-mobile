import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from '../dividers/divider';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { UserLogs } from '../../models/user.logs.model';

export function LogsItem({ data }: { data: UserLogs }) {
    const [name, setName] = useState<any>("");
    useEffect(() => {
        if (data.type == "DESCONTO_ORCAMENTO") {
            setName("attach-money")
        }
        if (data.type == "LIBERACAO_ORCAMENTO") {
            setName("check-box")
        }
    }, [])
    return (
        <View>
            <View style={styles.container}>
                <Icon
                    name={name}
                    size={28}
                    color="#123262"
                    style={{ alignSelf: 'center' }} />
                <View>
                    <Text style={styles.text}>{data.title + ' ' + data.id}</Text>
                    <Text style={styles.sub}>{data.description}</Text>
                </View>
                <Text style={[styles.sub, { marginLeft: 'auto' }]}>{data.date}</Text>
            </View >
            <Divider />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#123262'
    },
    sub: {
        fontSize: 10,
        color: '#8894ac',
    }
})