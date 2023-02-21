export interface UserLogs {
  date: string;
  title: string;
  description: string;
  type: LogTypeEnum;
}

export enum LogTypeEnum {
  DESCONTO_ORCAMENTO = "DESCONTO_ORCAMENTO",
  LIBERACAO_ORCAMENTO = "LIBERACAO_ORCAMENTO",
}
