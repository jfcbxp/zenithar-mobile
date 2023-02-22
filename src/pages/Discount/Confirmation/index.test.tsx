import React from "react";
import renderer, { act } from "react-test-renderer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import DiscountConfirmation from ".";
import { Dialog } from "../../../components/modals/dialog";
import { SwipeButton } from "../../../components/buttons/swipe-button";

jest.mock("../../../services/budget.service", () => {
  return {
    useBudgetService: jest.fn(() => {
      return {
        releaseDiscount: (
          budget: string,
          branch: string,
          discountValue: number
        ): Promise<void> => {
          return Promise.resolve();
        },
      };
    }),
  };
});

const navigation =
  useNavigation<StackNavigationProp<StackParams, "DiscountConfirmation">>();
const mockRoute = (): RouteProp<StackParams, "DiscountConfirmation"> => {
  return {
    params: {
      _branch: "",
      _budget: "",
      _budgetObject: {
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
      },
      _discountValue: 0,
    },
    name: "DiscountConfirmation",
    key: "DiscountConfirmation",
  };
};

const rendered = renderer.create(
  <DiscountConfirmation navigation={navigation} route={mockRoute()} />
);

describe("DiscountConfirmation test without error", () => {
  it("test DiscountConfirmation Icon", async () => {
    const icon = rendered.root.findAllByProps({ testID: "icon" })[0];

    await act(() => icon.props.onPress());
  });

  it("test DiscountConfirmation Dialog", async () => {
    const dialog = rendered.root.findByType(Dialog);

    await act(() => dialog.props.dismiss());

    expect(dialog).toBeTruthy();
  });

  it("test DiscountConfirmation SwipeButton", async () => {
    const swipeButton = rendered.root.findByType(SwipeButton);

    await act(() => swipeButton.props.onComplete());

    expect(swipeButton).toBeTruthy();
  });
});
