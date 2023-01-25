import { FlatList, ListRenderItem } from "react-native"
import { HistoricItem, iHistoricItem } from "./historic-item"

interface Properties {
    data?: Array<any>
}

export function Historic(properties: Properties) {
    const renderItem: ListRenderItem<iHistoricItem> = ({ item }) => <HistoricItem data={item} />

    return (
        <FlatList data={properties.data} renderItem={renderItem} />
    )
}