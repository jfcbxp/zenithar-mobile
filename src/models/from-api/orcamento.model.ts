import { Itens } from "./itens.model";
import { Pagamentos } from "./pagamentos.model";

export interface Orcamento {
    numero: string,
    empresa: string,
    vendedor: string,
    nomeVendedor: string,
    cliente: string,
    loja: string,
    nomeCliente: string,
    statusOrcamento: string,
    tipoOrcamento: string,
    totalBruto: number,
    desconto: number,
    valorDesconto: number,
    totalLiquido: number,
    observacao: string,
    itens: Itens[],
    pagamentos: Pagamentos[],
}