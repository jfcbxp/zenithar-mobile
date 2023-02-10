import React, { useContext, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View, ScrollView } from "react-native";
import { StackParams } from "../../types/stack.params";
import { Header } from "../../components/headers/header";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { HomeContainer } from "../../components/containers/home-container";
import { DiscountModal } from "../../components/modals/discount";
import { Logs } from "../../components/lists/logs";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../contexts/auth.provider";
import { Dialog } from "../../components/modals/dialog";
import { UserLogs } from "../../models/user.logs.model";
import GetSecret from "../../services/auth-secret";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
  const authContext = useContext(AuthContext);
  const [data] = useState<UserLogs[]>(authContext.user?.logs!);
  const [containerTitle] = useState("Histórico");
  const [containerChild] = useState<React.ReactNode>(<Logs data={data} />);
  const [discount, setDiscount] = useState(false);
  const defaultDialog = { title: "", content: "", visible: false }
  const [dialog, setDialog] = useState(defaultDialog);

  const NavigationButtonOnPress = () => {
    if (authContext.company != "") {
      setDiscount(true);
    } else {
      Alert("Alerta", "Você não possui autorização para utilizar esta opção.");
    }
  };

  const Alert = (title: string, content: string) => {
    setDialog({ title: title, content: content, visible: true });
  };

  return (
    <View style={styles.container}>
      <View>
        <Header returnOption={false} />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.menu}
      >
        <NavigationButton
          icon="attach-money"
          title="Desconto"
          onPress={NavigationButtonOnPress}
        />
      </ScrollView>
      <View style={styles.field}>
        <HomeContainer title={containerTitle}>{containerChild}</HomeContainer>
      </View>
      {discount && (
        <DiscountModal
          visible={discount}
          dismiss={() => {
            setDiscount(false);
          }}
        />
      )}
      <Dialog
        title={dialog.title}
        content={dialog.content}
        visible={dialog.visible}
        dismiss={() => {
          setDialog(defaultDialog);
        }}
      />
      <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F0F2F7",
  },
  menu: {
    flex: 1,
    marginVertical: "5%",
    marginHorizontal: "5%",
  },
  field: {
    flex: 4,
    flexDirection: "column",
    marginHorizontal: "5%",
  },
});
