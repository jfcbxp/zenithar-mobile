jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("@react-navigation/native");

jest.mock("firebase/compat/app", () => {
  return {
    initializeApp: jest.fn(() => {
      return {
        auth: () => {},
        firestore: () => {},
        database: () => {},
        storage: () => {},
      };
    }),
  };
});

jest.mock("firebase/auth");

jest.mock("@expo/vector-icons");

jest.mock("react-native-dropdown-picker");

jest.mock("axios");
