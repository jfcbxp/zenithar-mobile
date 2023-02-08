import { useEffect, useState } from "react";
import { ListRenderItem, Pressable, Text, View } from "react-native";
import { DropdownStyles as styles } from "../dropdown-styles";
import { Feather as Icon } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Itens } from "../../../models/from-api/itens.model";
import { ItemsItem } from "../../lists/discount/items-item";

interface Properties {
  data: Itens[] | undefined
}

export function ItemsDropdown(properties: Properties) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<Itens[] | undefined>()

  useEffect(() => {
    setData(properties.data)
  }, [visible])

  const expand = () => {
    setVisible((current) => !current);
  };

  const renderItem: ListRenderItem<Itens> = ({ item }) => <ItemsItem data={item} />

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
