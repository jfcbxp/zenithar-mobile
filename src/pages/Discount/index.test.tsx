import React from "react";
import renderer, { act } from "react-test-renderer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { ActivityIndicator, Modal, Pressable } from "react-native";
import { User } from "../../models/user.model";
import { LogTypeEnum } from "../../models/user.logs.model";
import { AuthContext } from "../../contexts/auth.provider";
import { Orcamento } from "../../models/from-api/orcamento.model";
import { Dropdown } from "../../components/dropdowns/dropdown";
import { ApplyDiscountModal } from "../../components/modals/apply-discount";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Button } from "../../components/buttons/button";
import { Dialog } from "../../components/modals/dialog";
import { MaskedInput } from "../../components/inputs/masked-input";

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
const pickImage = jest.fn();
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
                armazem: "01",
                codigoBarras: "123",
                desconto: 10,
                descricaoProduto: "TESTE",
                empresa: "01",
                estoque: 1,
                numero: "TESTE",
                preco: 20,
                produto: "TESTE",
                quantidade: 1,
                tipoEntrega: "1",
                total: 20,
                valorDesconto: 10,
              },
            ],
            loja: "",
            nomeCliente: "",
            nomeVendedor: "",
            numero: "",
            observacao: "",
            pagamentos: [
              {
                empresa: "01",
                forma: "TS",
                numero: "TESTE",
                parcelas: 1,
                valor: 10,
              },
              {
                empresa: "01",
                forma: "TS",
                numero: "TESTE",
                parcelas: 1,
                valor: 10,
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
        pickImage,
      }}
    >
      <Discount navigation={navigation} route={mockRoute()} />
    </AuthContext.Provider>
  );

  it("test Discount ActivityIndicator", async () => {
    const activityIndicator = rendered.root.findAllByType(ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });

  it("test Discount Dialog without budgetData", async () => {
    const dialog = rendered.root.findByType(Dialog);

    await act(() => dialog.props.dismiss());

    expect(dialog).toBeTruthy();
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
            pickImage,
          }}
        >
          <Discount navigation={navigation} route={mockRoute()} />
        </AuthContext.Provider>
      )
    );

    const dropdowns = rendered.root.findAllByType(Dropdown);

    const pressable1 = dropdowns[0].findByType(Pressable);
    const pressable2 = dropdowns[1].findByType(Pressable);

    await act(() => pressable1.props.onPress());
    await act(() => pressable2.props.onPress());

    expect(dropdowns[0]).toBeTruthy();
    expect(dropdowns[1]).toBeTruthy();

    expect(dropdowns.length).toBe(2);
  });

  it("test Discount ApplyDiscountModal", async () => {
    const button = rendered.root.findByType(Button);

    await act(() => button.props.onPress());

    const applyDiscountModal = rendered.root.findByType(ApplyDiscountModal);

    const modal = applyDiscountModal.findByType(Modal);

    await act(() => modal.props.onShow());

    const maskedInputs = applyDiscountModal.findAllByType(MaskedInput);

    await act(() => maskedInputs[0].props.onFocus());
    await act(() => maskedInputs[0].props.onChangeText("10", "10"));

    await act(() => maskedInputs[1].props.onFocus());
    await act(() => maskedInputs[1].props.onChangeText("10", "10"));

    const pressable = applyDiscountModal.findByType(Pressable);

    await act(() => pressable.props.onPressIn());
    await act(() => pressable.props.onPressOut());

    await act(() => applyDiscountModal.props.dismiss());

    expect(applyDiscountModal).toBeTruthy();
    expect(modal).toBeTruthy();
    expect(maskedInputs[0]).toBeTruthy();
    expect(maskedInputs[1]).toBeTruthy();
    expect(pressable).toBeTruthy();
  });

  it("test Discount Icon", async () => {
    const icon = rendered.root.findByType(Icon);

    await act(() => icon.props.onPress());

    expect(icon).toBeTruthy();
  });

  it("test Discount Button", async () => {
    const button = rendered.root.findByType(Button);

    await act(() => button.props.onPress());

    expect(button).toBeTruthy();
  });

  it("test Discount Dialog with budgetData", async () => {
    const dialogs = rendered.root.findAllByType(Dialog);

    await act(() => dialogs[0].props.dismiss());
    await act(() => dialogs[1].props.dismiss());

    expect(dialogs[0]).toBeTruthy();
    expect(dialogs[1]).toBeTruthy();
    expect(dialogs.length).toBe(2);
  });
});
