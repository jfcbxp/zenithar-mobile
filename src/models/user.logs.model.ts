export interface UserLogs {
  id: string;
  date: string;
  title: string;
  description: string;
  type: LogTypeEnum;
}

export enum LogTypeEnum {
  DESCONTO_ORCAMENTO = "DESCONTO_ORCAMENTO",
  LIBERACAO_ORCAMENTO = "LIBERACAO_ORCAMENTO",
}
