import { AxiosResponse } from "axios";
import { Orcamento } from "../models/from-api/orcamento.model";
import { API } from "./api";
import { useTokenService } from "./token-jwt.service";

export const useBudgetService = () => {
  const tokenService = useTokenService();

  const loadBudget = async (
    budget: string,
    branch: string
  ): Promise<Orcamento> => {
    const secret = (await tokenService.getToken())?.data.secret;
    const api = API(tokenService.getUrl(), secret);
    const url: string = `orcamento/consultar?numeroOrcamento=${budget}&empresa=${branch}`;
    const response: AxiosResponse<Orcamento> = await api.get<Orcamento>(url);
    return response.data;
  };

  const releaseDiscount = async (
    budget: string,
    branch: string,
    discountValue: number
  ): Promise<void> => {
    const secret = (await tokenService.getToken())?.data.secret;
    const api = API(tokenService.getUrl(), secret);
    const url: string = `orcamento/efetuarDesconto?numeroOrcamento=${budget}&empresa=${branch}&valorDesconto=${discountValue}`;
    await api.patch<Orcamento>(url);
  };

  return {
    loadBudget,
    releaseDiscount,
  };
};
