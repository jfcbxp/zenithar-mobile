import { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { UserSettings } from "../modals/user-settings";

interface Properties {
  signOut: Function;
  userUpdate(
    _fullName: string,
    _portrait?: string | undefined,
    _currentPassword?: string | undefined,
    _newPassword?: string | undefined
  ): Promise<void>;
  fullName?: string;
  company?: string;
  department?: string;
  portrait?: string;
}

export function Header(properties: Properties) {
  const [visible, setVisible] = useState(false);

  const handleSignOut = async () => {
    properties.signOut();
  };

  const onPress = () => {
    setVisible(true);
  };
  return (
    <View style={styles.header}>
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <Image
            source={
              properties.portrait
                ? { uri: properties.portrait }
                : require("../../../assets/no-user.png")
            }
            style={styles.image}
          />
          <View>
            <Text style={styles.fullName}>{properties.fullName}</Text>
            <Text style={styles.descriptions}>{properties.company}</Text>
            <Text style={styles.descriptions}>{properties.department}</Text>
          </View>
          <Icon
            name="logout"
            size={32}
            color="white"
            onPress={handleSignOut}
            style={{ marginLeft: "auto" }}
          />
        </View>
      </Pressable>
      {visible && (
        <UserSettings
          fullName={properties.fullName}
          portrait={properties.portrait}
          userUpdate={properties.userUpdate}
          visible={visible}
          dismiss={() => {
            setVisible(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1F2D5A",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "5%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 90,
    borderColor: "white",
    borderWidth: 1,
    marginRight: 13,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  descriptions: {
    fontSize: 13,
    color: "white",
  },
});
