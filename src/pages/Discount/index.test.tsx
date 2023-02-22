import React from "react";
import renderer, { act } from "react-test-renderer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { ActivityIndicator, Pressable } from "react-native";
import { User } from "../../models/user.model";
import { LogTypeEnum } from "../../models/user.logs.model";
import { AuthContext } from "../../contexts/auth.provider";
import { Orcamento } from "../../models/from-api/orcamento.model";
import { Dropdown } from "../../components/dropdowns/dropdown";
import { ApplyDiscountModal } from "../../components/modals/apply-discount";

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
      date: "Test",
      title: "Test",
      description: "Test",
      type: LogTypeEnum.LIBERACAO_ORCAMENTO,
    },
    {
      date: "Test 2",
      title: "Test 2",
      description: "Test 2",
      type: LogTypeEnum.DESCONTO_ORCAMENTO,
    },
  ],
};

jest.mock("../../services/budget.service", () => {
  return {
    useBudgetService: jest.fn(() => {
      return {
        loadBudget: (budget: string, branch: string): Promise<Orcamento> => {
          const _budget: Orcamento = {
            cliente: "",
            desconto: 0,
            empresa: "",
            itens: [
              {
                armazem: "",
                codigoBarras: "",
                desconto: 0,
                descricaoProduto: "",
                empresa: "",
                estoque: 0,
                numero: "",
                preco: 0,
                produto: "",
                quantidade: 0,
                tipoEntrega: "",
                total: 0,
                valorDesconto: 0,
              },
            ],
            loja: "",
            nomeCliente: "",
            nomeVendedor: "",
            numero: "",
            observacao: "",
            pagamentos: [
              {
                empresa: "",
                forma: "",
                numero: "",
                parcelas: 1,
                valor: 0,
              },
            ],
            statusOrcamento: "",
            tipoOrcamento: "",
            totalBruto: 0,
            totalLiquido: 0,
            valorDesconto: 0,
            vendedor: "",
          };
          return Promise.resolve(_budget);
        },
      };
    }),
  };
});

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

  it("test Discount Dropdowns", async () => {
    await act(() =>
      rendered.update(
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
      )
    );

    const dropdowns = rendered.root.findAllByType(Dropdown);

    const pressable = dropdowns[0].findByType(Pressable);

    await act(() => pressable.props.onPress());

    expect(dropdowns[0]).toBeTruthy();
    expect(dropdowns.length).toBe(2);
  });

  it("test Discount ApplyDiscountModal", async () => {
    const applyDiscountModal = rendered.root.findByType(ApplyDiscountModal);

    await act(() => applyDiscountModal.props.dismiss());

    expect(applyDiscountModal).toBeTruthy();
  });
});
