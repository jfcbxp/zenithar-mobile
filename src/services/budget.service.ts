import { AxiosResponse } from "axios";
import { Orcamento } from "../models/from-api/orcamento.model";
import { API } from "./api";

export async function LoadBudget(
  budget: string,
  branch: string,
  token: string,
  urlBackend: string
): Promise<Orcamento> {
  const api = API(urlBackend, token);
  const url: string = `orcamento/consultar?numeroOrcamento=${budget}&empresa=${branch}`;
  const response: AxiosResponse<Orcamento> = await api.get<Orcamento>(url);
  return response.data;
}

export async function ReleaseDiscount(
  budget: string,
  branch: string,
  discountValue: number,
  token: string,
  urlBackend: string
) {
  const api = API(urlBackend, token);
  const url: string = `orcamento/efetuarDesconto?numeroOrcamento=${budget}&empresa=${branch}&valorDesconto=${discountValue}`;
  await api.patch<Orcamento>(url, token);
}
