import { useEffect, useState } from "react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { DropdownStyles as styles } from "../dropdown-styles";
import { Feather as Icon } from "@expo/vector-icons";
import { Pagamentos } from "../../../models/from-api/pagamentos.model";
import { PaymentMethodItem } from "../../lists/discount/payment-method-item";

interface Properties {
  data: Pagamentos[] | undefined;
}

export function PaymentMethodDropdown(properties: Properties) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<typeof properties.data>()

  useEffect(() => {
    setData(properties.data)
  }, [visible])

  const expand = () => {
    setVisible((current) => !current);
  };

  const renderItem: ListRenderItem<Pagamentos> = ({ item }) => <PaymentMethodItem data={item} />

  return (
    <View>
      <Pressable style={styles.container} onPress={expand}>
        <View style={styles.area}>
          <Text style={styles.text}>Forma de pagamento</Text>
          <Icon
            testID="icon" size={32}
            name={visible === false ? "chevron-down" : "chevron-up"} />
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
