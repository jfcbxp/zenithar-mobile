import { useEffect, useState } from "react";
import { ListRenderItem, Pressable, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Itens } from "../../models/from-api/itens.model";
import { Pagamentos } from "../../models/from-api/pagamentos.model";
import { ItemsItem } from "../lists/discount/items-item";
import { PaymentMethodItem } from "../lists/discount/payment-method-item";
import { DropdownStyles as styles } from "./dropdown-styles";

interface Properties {
  data: Itens[] | Pagamentos[] | undefined;
  title: string;
}

export function Dropdown(properties: Properties) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any[] | undefined>();

  useEffect(() => {
    setData(properties.data);
  }, [visible]);

  const expand = () => {
    setVisible((current) => !current);
  };

  const isPagamento = (item: Itens | Pagamentos): item is Pagamentos =>
    Object.keys(item).includes("parcelas");

  const renderItem: ListRenderItem<Itens | Pagamentos> = ({ item }) => {
    if (isPagamento(item)) {
      return <PaymentMethodItem data={item} />;
    } else {
      return <ItemsItem data={item} />;
    }
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
          <FlatList data={data} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
}
