import randomWeightedChoice from '../randomWeightedChoice';

const withMockEntropy = (testFn) => {
  for (let mockEntropy = 0; mockEntropy < 1; mockEntropy += 0.001) {
    testFn(mockEntropy);
  }
};

describe('randomWeightedChoice', () => {
  describe('error handling', () => {
    it('returns null when items array is empty', () => {
      // Entropy isn't important for this test
      const mockEntropy = () => 0.5;
      expect(randomWeightedChoice([], mockEntropy)).toBe(null);
    });

    it('throws RangeError when probabilities do not sum to 0', () => {
      const invalidItemSets = [
        [{name: 'DMX', weight: 0.120}],
        [{name: 'Lil Wayne', weight: 0.42}, {name: 'Fat Joe', weight: 2}],
        [{name: 'Migos', weight: 0.25}, {name: 'Cardi B', weight: 0.25}]
      ];
      // Entropy isn't important for this test
      const mockEntropy = () => 0.5;

      invalidItemSets.forEach(invalidItems => {
        expect(() => {
          randomWeightedChoice(invalidItems, mockEntropy)
        }).toThrow(RangeError);
      });
    });
  });

  describe('item selection', () => {
    it(`always returns a valid object`, () => {
      const items = [
        {name: 'Will Smith', weight: 0.5},
        {name: 'Matt Damon', weight: 0.25},
        {name: 'Ben Affleck', weight: 0.125},
        {name: 'Amy Schumer', weight: 0.125}
      ];

      withMockEntropy((entropy) => {
        const result = randomWeightedChoice(items, () => entropy);
        expect(typeof result.name).toBe('string');
      });
    });

    it(`returns every possible item, given enough entropy`, () => {
      const items = [
        {name: 'Sarah Silverman', weight: 0.5},
        {name: 'Matt Damon', weight: 0.25},
        {name: 'Ben Affleck', weight: 0.0625},
        {name: 'Amy Schumer', weight: 0.0625},
        {name: 'Robin Williams', weight: 0.0625},
        {name: 'Chris Rock', weight: 0.0625}
      ];
      const selectedNames = new Set();

      withMockEntropy((entropy) => {
        const result = randomWeightedChoice(items, () => entropy);
        selectedNames.add(result.name);
      });

      expect(selectedNames.size).toBe(items.length);
    });

    it(`returns the same result when the items list has one element`, () => {
      const items = [{ name: 'Bruce Wayne', weight: 1}];
      const expectedName = items[0].name;

      withMockEntropy((entropy) => {
        expect(randomWeightedChoice(items, () => entropy).name)
          .toBe(expectedName);
      });
    });
  });
});
