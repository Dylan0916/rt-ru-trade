import { Currency } from '../../constants/currency';
import Trade from '../trade';

describe('trade', () => {
  const defaultReserve = {
    [Currency.TWD]: 10000,
    [Currency.USD]: 1000,
  };

  const prepare = (trade: Trade) => {
    trade.setReserve(defaultReserve[Currency.TWD], Currency.TWD);
    trade.setReserve(defaultReserve[Currency.USD], Currency.USD);
  };

  it('setReserve should work nice', () => {
    const trade = new Trade();
    const previous = trade.getReserve();

    trade.setReserve(1, Currency.TWD);
    trade.setReserve(2, Currency.USD);

    expect(trade.getReserve()).toEqual(
      expect.objectContaining({ [Currency.TWD]: 1 })
    );

    expect(trade.getReserve()).toEqual({
      ...previous,
      [Currency.USD]: 2,
      [Currency.TWD]: 1,
    });
  });

  it('depositReserve should work nice', () => {
    const trade = new Trade();
    const previous = trade.getReserve();

    prepare(trade);

    trade.depositReserve(1, Currency.TWD);
    trade.depositReserve(2, Currency.USD);

    expect(trade.getReserve()).toEqual({
      ...previous,
      [Currency.TWD]: defaultReserve[Currency.TWD] + 1,
      [Currency.USD]: defaultReserve[Currency.USD] + 2,
    });
  });

  describe('exchange', () => {
    const trade = new Trade();
    const testList = [
      {
        amount: 6000,
        from: Currency.TWD,
        to: Currency.USD,
        expected: {
          amount: 375,
          TWD: 16000,
          USD: 625,
        },
      },
      {
        amount: 0,
        from: Currency.USD,
        to: Currency.USD,
        expected: {
          amount: 0,
          TWD: 16000,
          USD: 625,
        },
      },
      {
        amount: 0,
        from: Currency.TWD,
        to: Currency.TWD,
        expected: {
          amount: 0,
          TWD: 16000,
          USD: 625,
        },
      },
      {
        amount: 300,
        from: Currency.USD,
        to: Currency.TWD,
        expected: {
          amount: 5189,
          TWD: 10811,
          USD: 925,
        },
      },
      {
        amount: 300,
        from: Currency.USD,
        to: Currency.TWD,
        expected: {
          amount: 2648,
          TWD: 8163,
          USD: 1225,
        },
      },
    ];

    beforeAll(() => {
      prepare(trade);
    });

    testList.forEach(item => {
      const { amount, from, to, expected } = item;
      const name = `should return correct value and the reserve are correct if "amount" is ${amount}, "from" is ${from} and "to" is ${to}`;

      it(name, () => {
        expect(trade.exchange(amount, from, to)).toBe(expected.amount);
        expect(trade.getReserve()).toEqual(
          expect.objectContaining({
            [Currency.USD]: expected.USD,
            [Currency.TWD]: expected.TWD,
          })
        );
      });
    });
  });
});
