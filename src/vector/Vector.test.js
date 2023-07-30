const Node = require('../node/Node');
const Vector = require('./Vector');

describe('Vector', () => {
  let destination, magnitude, origin, vector;

  beforeEach(() => {
    origin = new Node(1, 2, '◻︎');
    destination = new Node(2, 2, '◻︎');
    magnitude = 0.05;
    vector = new Vector(origin, destination, magnitude);
  });

  test('is a Vector with the correct properties', () => {
    expect(vector).toBeInstanceOf(Vector);
    expect(vector.origin).toBe(origin);
    expect(vector.destination).toBe(destination);
    expect(vector.magnitude).toBe(magnitude);
  });

  describe('get print', () => {
    test('returns a printable sting representing the vector', () => {
      const originString = '[origin]';
      const destinationString = '[destination]';

      jest.spyOn(origin, 'print', 'get').mockReturnValue(originString)
      jest.spyOn(destination, 'print', 'get').mockReturnValue(destinationString)

      expect(vector.print).toBe(`${originString} -[${magnitude}]-> ${destinationString}`);
    });
  });

  describe('get log', () => {
    test('console logs a printable sting representing the vector', () => {
      const vectorString = '[origin] -[1]-> [destination]';

      jest.spyOn(vector, 'print', 'get').mockReturnValue(vectorString);
      jest.spyOn(console, 'log').mockImplementation();

      expect(vector.log).toBeUndefined();
      expect(console.log).toBeCalledWith(vectorString);
    });
  });
});
