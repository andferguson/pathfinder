const Algorithm = require('../algorithm/Algorithm');
const VectorMap = require('../vector-map/VectorMap');

const Dijkstra = require('./Dijkstra');

describe('Dijkstra', () => {
  test('extends Algorithm', () => {
    expect(new Dijkstra()).toBeInstanceOf(Algorithm);
  });

  describe('static', () => {
    describe('findPath', () => {
      test('returns undefined when there is no path between the origin and destination', () => {
        /**
         * 🟩🟩🟩⬛️⬛️⬛️⬛️
         * 🟩🟩🟩🟩🟩🟩⬛️
         * ⬛️🟩🟩⬛️🟩🟩⬛️
         * ⬛️🟩🟩⬛️🟩🟩🟩
         * ⬛️⬛️⬛️⬛️🟩🟩🟩
         */
        const array = [
          ['🟩', '🟩', '🟩', '⬛️', '⬛️', '⬛️', '⬛️'],
          ['🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '⬛️'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '⬛️'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '🟩'],
          ['⬛️', '⬛️', '⬛️', '⬛️', '🟩', '🟩', '🟩']
        ];

        const vectorMap = VectorMap.twoDimensionalArrayToVectorMap(array);

        expect(Dijkstra.findPath(
          vectorMap.findNode(0, 0),
          vectorMap.findNode(0, 2)
        )).toBeUndefined();

        expect(Dijkstra.findPath(
          vectorMap.findNode(0, 0),
          vectorMap.findNode(3, 0)
        )).toBeUndefined();
      });

      test('returns an array of directed vectors - easy', () => {
        /**
         * 🟩⬛️🟩
         * 🟩🟩🟩
         * 🟩🟩🟩
         */
        const array = [
          ['🟩', '⬛️', '🟩'],
          ['🟩', '🟩', '🟩'],
          ['🟩', '🟩', '🟩']
        ];

        const vectorMap = VectorMap.twoDimensionalArrayToVectorMap(array);

        /**
         * 🟩⬛️🟩
         * 🟩⬇️🟩
         * ️⃣⬅️🟩
         */
        expect(vectorMap.printTraversal(Dijkstra.findPath(
          vectorMap.findNode(1, 1),
          vectorMap.findNode(0, 2)
        ))).toMatchSnapshot();
      });
    });
  });
});
