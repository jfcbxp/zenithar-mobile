import { useEffect, useState } from "react";
import { GestureResponderEvent, Modal, ModalProps, View } from "react-native";
import { Dialog, DialogStyles as styles } from "./dialog";
import { Button } from "../buttons/button";
import { FullNameInput } from "../inputs/fullname-input";
import { PasswordInput } from "../inputs/password-input";
import { Portrait } from "../portrait/portrait";
import * as ImagePicker from "expo-image-picker";
import { CommandLink } from "../buttons/command-link";

interface Properties extends ModalProps {
  visible: boolean | undefined;
  userUpdate(
    _fullName: string,
    _portrait?: string | undefined,
    _currentPassword?: string | undefined,
    _newPassword?: string | undefined
  ): Promise<void>;
  fullName?: string;
  portrait?: string;
  dismiss: ((event: GestureResponderEvent) => void) | undefined;
}

export function UserSettings(properties: Properties) {
  const FULLNAME = properties.fullName;
  const PORTRAIT = properties.portrait;
  const [fullName, setFullName] = useState<string | undefined>(FULLNAME);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [portrait, setPortrait] = useState<string | undefined>(PORTRAIT);
  const [changePassword, setChangePassword] = useState<boolean | undefined>();
  const [disabled, setDisabled] = useState(false);
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);

  useEffect(() => {
    if (!changePassword) {
      if (portrait == (PORTRAIT || "") && fullName == (FULLNAME || "")) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [portrait, fullName]);

  useEffect(() => {
    if (changePassword) {
      if (
        portrait == (PORTRAIT || "") &&
        fullName == (FULLNAME || "") &&
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
      Alert("Dados mandatórios", "Por favor, preencher todos os campos");
    } else {
      await properties.userUpdate(
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
    setFullName(FULLNAME);
    setPortrait(PORTRAIT);
  };

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
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
      {dialog.visible && (
        <Dialog
          title={dialog.title}
          content={dialog.content}
          visible={dialog.visible}
          dismiss={() => {
            setDialog(defaultDialog);
          }}
        />
      )}
    </Modal>
  );
}
