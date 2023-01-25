import { useContext, useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  View,
  Alert,
} from "react-native";
import { DialogStyles as styles } from "./dialog";
import { Button } from "../buttons/button";
import { FullNameInput } from "../inputs/fullname-input";
import { PasswordInput } from "../inputs/password-input";
import { Portrait } from "../portrait/portrait";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../contexts/auth.provider";
import { CommandLink } from "../buttons/command-link";

interface Properties extends ModalProps {
  visible: boolean | undefined;
  dismiss: ((event: GestureResponderEvent) => void) | undefined;
}

export function UserSettings(properties: Properties) {
  const authContext = useContext(AuthContext);
  const [fullName, setFullName] = useState<string | undefined>("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [portrait, setPortrait] = useState<string | undefined>("");
  const [changePassword, setChangePassword] = useState<boolean | undefined>();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setFullName(authContext.user?.fullName)
    setPortrait(authContext.user?.portrait)
  }, [])

  useEffect(() => {
    if (changePassword) {
      if (
        currentPassword.length > 5 &&
        newPassword.length > 5 &&
        confirmPassword.length > 5
      ) {
        if (newPassword == confirmPassword) {
          setDisabled(false);
        }
      } else {
        setDisabled(true);
      }
    }
  }, [confirmPassword]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.canceled) {
      setPortrait(result.assets[0].uri);
    }
  };

  const handleUpdateUser = async () => {
    if (fullName == "") {
      Alert.alert("Dados mandatórios", "Por favor, preencher todos os campos");
    } else {
      await authContext.userUpdate(
        fullName!,
        portrait,
        currentPassword,
        newPassword
      );
    }
    handleCancel();
  };

  const handleChangePassword = () => {
    setDisabled(true);
    setChangePassword(true);
  };

  const handleCancel = () => {
    setChangePassword(undefined);
    setDisabled(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setFullName(authContext.user?.fullName!);
    setPortrait(authContext.user?.portrait!);
  };

  return (
    <Modal
      {...properties}
      visible={properties.visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.field}>
          <Portrait source={portrait} onPress={pickImage} />
          <FullNameInput
            value={fullName}
            onChangeText={setFullName}
            maxLength={20}
          />
          {!changePassword && (
            <CommandLink onPress={handleChangePassword} title="Alterar senha" />
          )}
          {changePassword && (
            <View>
              <PasswordInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Senha atual"
              />
              <PasswordInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nova senha"
              />
              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmar nova senha"
              />
            </View>
          )}
          <Button
            onPressIn={handleCancel}
            onPressOut={properties.dismiss}
            title="CANCELAR"
          />
          <Button
            disabled={disabled}
            onPressIn={handleUpdateUser}
            onPressOut={properties.dismiss}
            title="CONFIRMAR"
          />
        </View>
      </View>
    </Modal>
  );
}
