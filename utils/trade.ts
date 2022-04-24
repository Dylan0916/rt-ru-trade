import { Currency } from '../constants/currency';

class Trade {
  private reserve = {
    [Currency.TWD]: 10000,
    [Currency.USD]: 1000,
  };

  public setReserve = (amount: number, currency: Currency) => {
    if (typeof this.reserve[currency] === 'undefined') {
      return console.error('Currency not found!');
    }

    this.reserve[currency] = amount;
  };

  public depositReserve = (amount: number, currency: Currency) => {
    if (typeof this.reserve[currency] === 'undefined') {
      return console.error('Currency not found!');
    }

    this.reserve[currency] += amount;
  };

  private rounding = (amount: number, currency: Currency) => {
    switch (currency) {
      case Currency.USD:
        return +amount.toFixed(2);
      default:
        return +amount.toFixed(0);
    }
  };

  public getReserve = () => this.reserve;

  public exchange = (amount: number, from: Currency, to: Currency) => {
    if (to === from) {
      return amount;
    }
    if (amount === 0) {
      return 0;
    }

    const fromReserve = this.reserve[from];
    const toReserve = this.reserve[to];

    if (!fromReserve || !toReserve) {
      return 0;
    }

    // (from-reserve + x) * (to-reserve + y) = from-reserve * to-reserve
    const reserveTotal = fromReserve * toReserve;
    const result = this.rounding(
      toReserve - reserveTotal / (fromReserve + amount),
      to
    );

    if (result !== 0) {
      this.reserve[from] += amount;
      this.reserve[to] -= result;
    }

    return result;
  };
}

export default Trade;
