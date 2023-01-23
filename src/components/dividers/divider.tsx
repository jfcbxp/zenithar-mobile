import { StyleSheet, View } from "react-native";

export function Divider() {
    return (
        <View style={styles.divider} />
    )
}

const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: 1,
        borderColor: 'silver',
    },
})