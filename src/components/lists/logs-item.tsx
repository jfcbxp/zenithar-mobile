import { StyleSheet, View, Text } from "react-native";
import { Divider } from "../dividers/divider";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { LogTypeEnum, UserLogs } from "../../models/user.logs.model";

export function LogsItem({ data }: { data: UserLogs }) {
  return (
    <View>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Icon
            testID="icon"
            name={
              data.type === LogTypeEnum.LIBERACAO_ORCAMENTO
                ? "attach-money"
                : "check-box"
            }
            size={28}
            color="#123262"
            style={{ alignSelf: "center" }}
          />
          <View>
            <Text testID="title" style={styles.text}>
              {`${data.title}`}
            </Text>
            <Text testID="description" style={styles.sub}>
              {data.description}
            </Text>
          </View>
        </View>
        <Text testID="date" style={styles.sub}>
          {data.date}
        </Text>
      </View>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#123262",
  },
  sub: {
    fontSize: 10,
    color: "#8894ac",
  },
});
