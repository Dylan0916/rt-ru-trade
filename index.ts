import inquirer from 'inquirer';

import { Currency } from './constants/currency';
import { Answers, SelectedFunction } from './types/Prompt';
import promptSpec from './utils/promptSpec';
import Trade from './utils/trade';

const trade = new Trade();

function handleExchangeCurrency(amount: number, currency: Currency) {
  switch (currency) {
    case Currency.TWD: {
      const exchangedAmount = trade.exchange(
        amount,
        Currency.TWD,
        Currency.USD
      );

      console.log(`Exchange to "${exchangedAmount}" ${Currency.USD}`);

      break;
    }
    case Currency.USD: {
      const exchangedAmount = trade.exchange(
        amount,
        Currency.USD,
        Currency.TWD
      );

      console.log(`Exchange to "${exchangedAmount}" ${Currency.TWD}`);

      break;
    }
    default: {
      break;
    }
  }
}

function logReserver() {
  console.log('===========================');
  console.log('The current reserves are:');
  console.log(JSON.stringify(trade.getReserve(), null, 2));
  console.log('===========================');
}

async function startQuestion() {
  const answers = await inquirer.prompt<Answers>(promptSpec);
  const { selectedFunction, currency, amount = 0 } = answers;

  switch (selectedFunction) {
    case SelectedFunction.ExchangeCurrency:
      handleExchangeCurrency(amount, currency!);
      break;
    case SelectedFunction.DepositReserve:
      trade.depositReserve(amount, currency!);
      break;
    case SelectedFunction.SetReserve:
      trade.setReserve(amount, currency!);
      break;
    default:
      process.exit();
  }

  logReserver();
  startQuestion();
}

async function start() {
  logReserver();
  startQuestion();
}

start();
