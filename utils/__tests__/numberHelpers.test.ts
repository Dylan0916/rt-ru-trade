import { toPrecision } from '../numberHelpers';

describe('numberHelpers', () => {
  describe('toPrecision', () => {
    const testList = [
      { input: 0.1 + 0.2, output: 0.3 },
      { input: 0.2 + 0.4, output: 0.6 },
      { input: 925 - 78.32, output: 846.68 },
    ];

    testList.forEach(({ input, output }) => {
      const name = `should return ${output} if input is ${input}`;

      it(name, () => {
        expect(toPrecision(input)).toBe(output);
      });
    });
  });
});
