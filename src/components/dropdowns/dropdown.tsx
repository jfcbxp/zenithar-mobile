import { useState } from "react";
import {
  ListRenderItem,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

interface Properties<T> {
  data: T[] | undefined;
  renderItem: ListRenderItem<T>;
  title: string;
}

export function Dropdown<T extends unknown>(properties: Properties<T>) {
  const [visible, setVisible] = useState(false);

  const expand = () => {
    setVisible((current) => !current);
  };

  return (
    <View>
      <Pressable style={styles.container} onPress={expand}>
        <View style={styles.area}>
          <Text style={styles.text}>{properties.title}</Text>
          <Icon
            testID="icon"
            name={visible === false ? "chevron-down" : "chevron-up"}
            size={32}
          />
        </View>
      </Pressable>
      {visible && (
        <View style={styles.children}>
          <FlatList data={properties.data} renderItem={properties.renderItem} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: "1.25%",
    paddingHorizontal: "5%",
    paddingVertical: "2.5%",
    borderTopStartRadius: 9,
    borderTopEndRadius: 9,
    justifyContent: "center",
    backgroundColor: "#DFE1E6",
  },
  area: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  children: {
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  subText: {
    fontSize: 13,
  },
});
