import { Currency } from '../constants/currency';
import { SelectedFunction } from '../types/Prompt';

export default [
  {
    type: 'list',
    name: 'selectedFunction',
    message: 'Please select function:',
    choices: Object.values(SelectedFunction),
  },
  {
    type: 'list',
    name: 'currency',
    message: 'Please select a currency to exchange:',
    choices: Object.values(Currency),
    when({ selectedFunction }: { selectedFunction: SelectedFunction }) {
      return selectedFunction === SelectedFunction.ExchangeCurrency;
    },
  },
  {
    type: 'list',
    name: 'currency',
    message: 'Please select a currency to deposit:',
    choices: Object.values(Currency),
    when({ selectedFunction }: { selectedFunction: SelectedFunction }) {
      return selectedFunction === SelectedFunction.DepositReserve;
    },
  },
  {
    type: 'list',
    name: 'currency',
    message: 'Please select a currency to set:',
    choices: Object.values(Currency),
    when({ selectedFunction }: { selectedFunction: SelectedFunction }) {
      return selectedFunction === SelectedFunction.SetReserve;
    },
  },
  {
    type: 'input',
    name: 'amount',
    message: 'Please enter the amount:',
    when({ selectedFunction }: { selectedFunction: SelectedFunction }) {
      return selectedFunction !== SelectedFunction.Exit;
    },
    filter: (value: string) => (Number.isNaN(+value) ? 0 : +value),
  },
];
