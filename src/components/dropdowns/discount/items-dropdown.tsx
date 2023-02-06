import { useState, useEffect } from "react";
import { ListRenderItem, Pressable, Text, View } from "react-native";
import { DropdownStyles as styles } from "../dropdown-styles";
import { Feather as Icon } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Items } from "../../../models/items.model";
import { ItemsItem } from "../../lists/discount/items-item";

interface Properties {
  budget?: number;
  branch?: string;
}

export function ItemsDropdown(properties: Properties) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([])

  useEffect(() => {
    setData([])
  }, [])

  const expand = () => {
    setVisible((current) => !current);
  };

  const renderItem: ListRenderItem<Items> = ({ item }) => <ItemsItem data={item} />

  return (
    <View>
      <Pressable style={styles.container} onPress={expand}>
        <View style={styles.area}>
          <Text style={styles.text}>Itens</Text>
          <Icon
            testID="icon"
            name={visible === false ? "chevron-down" : "chevron-up"}
            size={32} />
        </View>
      </Pressable>
      {visible && (
        <View style={styles.children}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
}
