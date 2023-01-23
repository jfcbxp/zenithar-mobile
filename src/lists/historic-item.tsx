import { StyleSheet, View, Text } from 'react-native';
import { Divider } from '../components/dividers/divider';
import { MaterialIcons as Icon } from '@expo/vector-icons';

export interface iHistoricItem {
    id: number
    icon: any
    title: string
    description: string
    date: string
}

export function HistoricItem({ data }: { data: iHistoricItem }) {
    return (
        <View>
            <View style={styles.container}>
                <Icon
                    name={data.icon}
                    size={32}
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
        fontSize: 14,
        fontWeight: 'bold',
        color: '#123262'
    },
    sub: {
        fontSize: 12,
        color: '#8894ac',
    }
})