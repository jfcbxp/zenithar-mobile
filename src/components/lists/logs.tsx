import { FlatList, ListRenderItem } from "react-native"
import { UserLogs } from "../../models/user.logs.model"
import { LogsItem } from "./logs-item"

interface Properties {
    data?: Array<any>
}

export function Logs(properties: Properties) {
    const renderItem: ListRenderItem<UserLogs> = ({ item }) => <LogsItem data={item} />

    return (
        <FlatList data={properties.data} renderItem={renderItem} />
    )
}