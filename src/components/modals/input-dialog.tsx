import {
  GestureResponderEvent,
  Modal,
  Text,
  View,
} from "react-native";
import { Button } from "../buttons/button";
import { FullNameInput } from "../inputs/fullname-input";
import { TextInput } from "../inputs/text-input";
import { DialogStyles as styles } from "./dialog";

interface Properties {
  visible: boolean | undefined;
  dismiss: ((event: GestureResponderEvent) => void) | undefined;
  value: string | undefined
  onChangeText: ((text: string) => void) | undefined
  title: string
}

export function InputDialog(properties: Properties) {
  return (
    <Modal
      {...properties}
      visible={properties.visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.title}>
            {properties.title.includes("Código") ?
              "Código de verificação"
              :
              "Dado obrigatório"
            }
          </Text>
          {properties.title.includes("Código") ?
            <View>
              <TextInput
                value={properties.value}
                onChangeText={properties.onChangeText}
                keyboardType="number-pad"
                placeholder={properties.title}
                maxLength={6} />
              <Button
                title="CONFIRMAR"
                disabled={properties.value!.length == 6 ? false : true}
                onPress={properties.dismiss} />
            </View>
            :
            <View>
              <FullNameInput
                value={properties.value}
                onChangeText={properties.onChangeText} />
              <Button
                title="CONFIRMAR"
                disabled={properties.value ? false : true}
                onPress={properties.dismiss} />
            </View>
          }
        </View>
      </View>
    </Modal>
  );
}