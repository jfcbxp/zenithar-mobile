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
