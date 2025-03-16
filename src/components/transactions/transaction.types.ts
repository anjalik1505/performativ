
export interface TransactionResponse {
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  portfolio_id: number;
  instrument_id: number;
  status: Status;
  comments: string;
  quantity: number;
  price: number;
  transaction_costs: number;
  trade_date: Date;
  fx_rate: string;
  price_uses_market_data: number;
  settlement_date: Date;
  transaction_type: TransactionType;
  sale_method: string;
  portfolio: string;
  total_amount: number;
}

export enum Status {
  Settled = "SETTLED",
}

export enum TransactionType {
  Buy = "BUY",
  CashCommitment = "CASH-COMMITMENT",
}