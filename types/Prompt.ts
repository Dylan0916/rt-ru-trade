import { Currency } from '../constants/currency';

export enum SelectedFunction {
  ExchangeCurrency = 'Exchange currency',
  DepositReserve = 'Deposit reserve',
  SetReserve = 'Set reserve',
  Exit = 'Exit',
}

export type Answers = {
  selectedFunction: SelectedFunction;
  currency?: Currency;
  amount?: number;
};
