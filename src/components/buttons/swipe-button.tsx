import { ActivityIndicator, StyleSheet } from "react-native";
import { SwipeButton as RNExpoSwipeButton } from "react-native-expo-swipe-button";
import { MaterialIcons as Icon } from "@expo/vector-icons";

interface Properties {
  onComplete: () => void;
  title: string;
  underlayTitle: string;
  disabled?: boolean
}

export function SwipeButton(properties: Properties) {
  return (
    <RNExpoSwipeButton
      Icon={
        !properties.disabled ?
          <Icon name="keyboard-arrow-right" size={42} color="white" />
          :
          <ActivityIndicator size={42} color="white" />
      }
      onComplete={properties.onComplete}
      disabled={properties.disabled}
      title={properties.title}
      titleStyle={styles.title}
      underlayTitle={properties.underlayTitle}
      underlayTitleStyle={styles.title}
      underlayStyle={{ backgroundColor: "#212A4D" }}
      borderRadius={180}
      containerStyle={{ backgroundColor: "#1F2D5A", borderRadius: 180 }}
      circleBackgroundColor="#163E60"
      circleSize={58}
      goBackToStart={true}
      iconContainerStyle={{ paddingLeft: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
