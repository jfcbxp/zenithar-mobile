import { useState } from "react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { DropdownStyles as styles } from "../dropdown-styles";
import { Feather as Icon } from "@expo/vector-icons";
import { PaymentMethod } from "../../../models/payment-method.model";
import { PaymentMethodItem } from "../../lists/discount/payment-method-item";

interface Properties {
  budget?: number;
  branch?: string;
}

export function PaymentMethodDropdown(properties: Properties) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([])

  const expand = () => {
    setVisible((current) => !current);
  };

  const renderItem: ListRenderItem<PaymentMethod> = ({ item }) => <PaymentMethodItem data={item} />

  return (
    <View>
      <Pressable style={styles.container} onPress={expand}>
        <View style={styles.area}>
          <Text style={styles.text}>Forma de pagamento</Text>
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
