import React from "react";
import renderer from "react-test-renderer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { ActivityIndicator } from "react-native";
import { User } from "../../models/user.model";
import { LogTypeEnum } from "../../models/user.logs.model";
import { AuthContext } from "../../contexts/auth.provider";

const company = "companyTest";
const department = "departmentTest";
const loading = false;
const urlBackend = "urlTest";
const signUp = jest.fn();
const signIn = jest.fn();
const signOut = jest.fn();
const recoverPassword = jest.fn();
const userUpdate = jest.fn();
const addLog = jest.fn();
const user: User = {
  uid: "uuidTest",
  fullName: "fullNameTest",
  company: "companyTest",
  department: "departmentTest",
  discountLimit: 15,
  verified: true,
  portrait: "portraitTest",
  branches: [
    {
      id: "1",
      name: "Test",
    },
  ],
  logs: [
    {
      id: "1",
      date: "Test",
      title: "Test",
      description: "Test",
      type: LogTypeEnum.LIBERACAO_ORCAMENTO,
    },
    {
      id: "2",
      date: "Test 2",
      title: "Test 2",
      description: "Test 2",
      type: LogTypeEnum.DESCONTO_ORCAMENTO,
    },
  ],
};

describe("Discount test", () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  const mockRoute = (): RouteProp<StackParams, "Discount"> => {
    return {
      params: {
        _branch: "01",
        _budget: "000001",
        _discountValue: 0,
      },
      name: "Discount",
      key: "Discount",
    };
  };

  const rendered = renderer.create(
    <AuthContext.Provider
      value={{
        user,
        company,
        department,
        urlBackend,
        loading,
        signUp,
        signIn,
        signOut,
        recoverPassword,
        userUpdate,
        addLog,
      }}
    >
      <Discount navigation={navigation} route={mockRoute()} />
    </AuthContext.Provider>
  );

  it("test Discount ActivityIndicator", async () => {
    const activityIndicator = rendered.root.findAllByType(ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });
});
