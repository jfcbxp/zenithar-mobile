import { Orcamento } from "../models/from-api/orcamento.model";
import { API } from "./api";

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