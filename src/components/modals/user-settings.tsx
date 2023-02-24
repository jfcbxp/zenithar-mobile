import { useContext, useEffect, useState } from "react";
import { GestureResponderEvent, Modal, ModalProps, View } from "react-native";
import { Dialog, DialogStyles as styles } from "./dialog";
import { Button } from "../buttons/button";
import { FullNameInput } from "../inputs/fullname-input";
import { PasswordInput } from "../inputs/password-input";
import { Portrait } from "../portrait/portrait";
import { CommandLink } from "../buttons/command-link";
import { AuthContext } from "../../contexts/auth.provider";

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
  const authContext = useContext(AuthContext);
  const FULLNAME = properties.fullName;
  const PORTRAIT = properties.portrait;
  const [fullName, setFullName] = useState<string | undefined>(FULLNAME);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [portrait, setPortrait] = useState<string | undefined>(PORTRAIT);
  const [changePassword, setChangePassword] = useState<boolean | undefined>();
  const [disabled, setDisabled] = useState(false);
  const [editable, setEditable] = useState(true);
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);

  const comparePasswords = (current: string, new_: string, confirm: string) => {
    if (
      current.length > 5 &&
      new_.length > 5 &&
      confirm.length > 5 &&
      new_ &&
      confirm &&
      new_ == confirm
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleUpdateUser = async () => {
    await properties.userUpdate(
      fullName!,
      portrait,
      currentPassword,
      newPassword
    );
    initials();
  };

  const handleChangePassword = () => {
    setFullName(FULLNAME);
    setDisabled(true);
    setEditable(false);
    setChangePassword(true);
  };

  const initials = () => {
    setChangePassword(undefined);
    setDisabled(false);
    setEditable(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setFullName(FULLNAME);
    setPortrait(PORTRAIT);
  };

  const pickImage = async () => {
    const uri = await authContext.pickImage();
    if (uri) {
      setPortrait(uri);
      setDisabled(portrait == PORTRAIT);
    } else {
      Alert(
        "Erro",
        "O retrato deve ser uma imagem de formato PNG/JPEG e não deve exceder o tamanho de 2MBs"
      );
      setPortrait(PORTRAIT);
    }
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
          <Portrait source={portrait} editable={editable} onPress={pickImage} />
          <FullNameInput
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              setDisabled(text != FULLNAME && text ? false : true);
            }}
            maxLength={20}
            editable={editable}
          />
          {!changePassword && (
            <CommandLink onPress={handleChangePassword} title="Alterar senha" />
          )}
          {changePassword && (
            <View>
              <PasswordInput
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text);
                  comparePasswords(text, newPassword, confirmPassword);
                }}
                placeholder="Senha atual"
              />
              <PasswordInput
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  comparePasswords(currentPassword, text, confirmPassword);
                }}
                placeholder="Nova senha"
              />
              <PasswordInput
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  comparePasswords(currentPassword, newPassword, text);
                }}
                placeholder="Confirmar nova senha"
              />
            </View>
          )}
          <Button
            onPressIn={initials}
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
        <Dialog
          title={dialog.title}
          content={dialog.content}
          visible={dialog.visible}
          dismiss={() => {
            setDialog(defaultDialog);
          }}
        />
      </View>
    </Modal>
  );
}
