const Pathfinder = require('../src');

describe('Integration', () => {
  test('Pathfinder exports main module', () => {
    expect(Pathfinder).toBeDefined();
  });
});
