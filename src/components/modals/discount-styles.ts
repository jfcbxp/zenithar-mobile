import { StyleSheet } from "react-native";

export const DiscountStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
  },
  field: {
    position: "absolute",
    width: "100%",
    height: "50%",
    alignItems: "center",
    paddingHorizontal: "5%",
    backgroundColor: "#F0F2F7",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    zIndex: 99,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#454545",
    marginVertical: 32,
  },
});
