import React, { useState, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import { StackParams } from "../../types/stack.params";
import { Header } from "../../components/headers/header";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { HomeContainer } from "../../components/containers/home-container";
import { DiscountModal } from "../../components/modals/discount";
import { Historic } from "../../components/lists/historic";
import { StatusBar } from "expo-status-bar";

interface Properties extends StackScreenProps<StackParams, "Home"> {}

export default function Home({ navigation }: Properties) {
  const DATA = [
    {
      id: 1,
      icon: "check-box",
      title: "Liberação orçamento",
      description: "DEUSA MARIA COSTA",
      date: "20 OUT",
    },
    {
      id: 2,
      icon: "attach-money",
      title: "Desconto orçamento",
      description: "R$150,00 (DEUSA MARIA COSTA)",
      date: "20 OUT",
    },
  ];
  const [containerTitle, setContainerTitle] = useState("Histórico");
  const [containerChild, setContainerChild] = useState<React.ReactNode>(
    <Historic data={DATA} />
  );
  const [discount, setDiscount] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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
          onPress={() => {
            setDiscount(true);
          }}
        />
      </ScrollView>
      <View style={styles.field}>
        <HomeContainer title={containerTitle}>{containerChild}</HomeContainer>
      </View>
      <DiscountModal
        visible={discount}
        dismiss={() => {
          setDiscount(false);
        }}
      />
      <StatusBar style="light" translucent={false} backgroundColor="#212A4D" />
    </SafeAreaView>
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
