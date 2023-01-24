import { Picker, PickerItemProps } from "@react-native-picker/picker";

export function PickerItem(properties: PickerItemProps) {
    return (
        <Picker.Item {...properties}
            color='#123262' />
    )
}