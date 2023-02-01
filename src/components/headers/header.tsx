import { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { AuthContext } from "../../contexts/auth.provider";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { UserSettings } from "../modals/user-settings";
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../types/navigation.params";

interface Properties {
  returnOption: boolean;
}

export function Header(properties: Properties) {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationParams>();
  const [visible, setVisible] = useState(false);

  const handleSignOut = async () => {
    authContext.signOut();
  };

  const onPress = () => {
    setVisible(true);
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={onPress}>
        <View
          style={
            properties.returnOption === false
              ? styles.container
              : styles.containerReturn
          }
        >
          {properties.returnOption && (
            <Icon
              name="keyboard-arrow-left"
              size={48}
              color="white"
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={{ marginLeft: -60 }}
            />
          )}
          <Image
            source={
              authContext.user?.portrait
                ? { uri: authContext.user?.portrait }
                : require("../../../assets/no-user.png")
            }
            style={styles.image}
          />
          <View>
            <Text style={styles.fullName}>{authContext.user?.fullName}</Text>
            <Text style={styles.descriptions}>{authContext.company}</Text>
            <Text style={styles.descriptions}>{authContext.department}</Text>
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
  containerReturn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "5%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    paddingLeft: "10%",
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
