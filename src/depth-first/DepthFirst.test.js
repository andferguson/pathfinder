const Algorithm = require('../algorithm/Algorithm');
const Vector = require('../vector/Vector');
const VectorMap = require('../vector-map/VectorMap');

const DepthFirst = require('./DepthFirst');

describe('DepthFirst', () => {
  test('extends Algorithm', () => {
    expect(new DepthFirst()).toBeInstanceOf(Algorithm);
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

        expect(DepthFirst.findPath(
          vectorMap.findNode(0, 0),
          vectorMap.findNode(0, 2)
        )).toBeUndefined();

        expect(DepthFirst.findPath(
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
         * *️⃣⬅️🟩
         */
        expect(DepthFirst.findPath(
          vectorMap.findNode(1, 1),
          vectorMap.findNode(0, 2)
        )).toEqual([
          new Vector(vectorMap.findNode(1, 1), vectorMap.findNode(1, 2), 1),
          new Vector(vectorMap.findNode(1, 2), vectorMap.findNode(0, 2), 1)
        ]);

        /**
         * 🟩⬛️⬇️
         * 🟩*️⃣⬇️
         * 🟩⬆️⬅️
         */
        expect(DepthFirst.findPath(
          vectorMap.findNode(2, 0),
          vectorMap.findNode(1, 1)
        )).toEqual([
          new Vector(vectorMap.findNode(2, 0), vectorMap.findNode(2, 1), 1),
          new Vector(vectorMap.findNode(2, 1), vectorMap.findNode(2, 2), 1),
          new Vector(vectorMap.findNode(2, 2), vectorMap.findNode(1, 2), 1),
          new Vector(vectorMap.findNode(1, 2), vectorMap.findNode(1, 1), 1)
        ]);

        /**
         * ⬇️⬛️*️⃣
         * ⬇️🟩⬆️
         * ➡️➡️⬆️
         */
        expect(DepthFirst.findPath(
          vectorMap.findNode(0, 0),
          vectorMap.findNode(2, 0)
        )).toEqual([
          new Vector(vectorMap.findNode(0, 0), vectorMap.findNode(0, 1), 1),
          new Vector(vectorMap.findNode(0, 1), vectorMap.findNode(0, 2), 1),
          new Vector(vectorMap.findNode(0, 2), vectorMap.findNode(1, 2), 1),
          new Vector(vectorMap.findNode(1, 2), vectorMap.findNode(2, 2), 1),
          new Vector(vectorMap.findNode(2, 2), vectorMap.findNode(2, 1), 1),
          new Vector(vectorMap.findNode(2, 1), vectorMap.findNode(2, 0), 1)
        ]);
      });

      test('returns an array of directed vectors - medium', () => {
        /**
         * 🟩🟩🟩⬛️🟩
         * 🟩🟩🟩🟩🟩
         * ⬛️🟩🟩🟩🟩
         * ⬛️🟩🟩⬛️🟩
         * ⬛️⬛️⬛️⬛️🟩
         */
        const array = [
          ['🟩', '🟩', '🟩', '⬛️', '🟩'],
          ['🟩', '🟩', '🟩', '🟩', '🟩'],
          ['⬛️', '🟩', '🟩', '🟩', '🟩'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩'],
          ['⬛️', '⬛️', '⬛️', '⬛️', '🟩']
        ];

        const vectorMap = VectorMap.twoDimensionalArrayToVectorMap(array);

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(0, 0),
          vectorMap.findNode(4, 4)
        ))).toMatchSnapshot();

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(4, 4),
          vectorMap.findNode(0, 0)
        ))).toMatchSnapshot();

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(4, 0),
          vectorMap.findNode(1, 3)
        ))).toMatchSnapshot();

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(1, 3),
          vectorMap.findNode(4, 0)
        ))).toMatchSnapshot();
      });

      test('returns an array of directed vectors - hard', () => {
        /**
         * 🟩🟩🪜⬛️⬛️⬛️⬛️
         * 🟩🟩🟩🪜🟩🟩🪜
         * ⬛️⬛️🟩⬛️🟩🟩⬛️
         * ⬛️🟩🟩⬛️🪜🟩⬛️
         * 🟩🟩🟩⬛️🪜🟩⬛️
         * ⬛️🪜🟩🪜🟩🟩🟩
         * ⬛️⬛️⬛️⬛️🟩🟩🟩
         */
        const array = [
          ['🟩', '🟩', '🪜', '⬛️', '⬛️', '⬛️', '⬛️'],
          ['🟩', '🟩', '🟩', '🪜', '🟩', '🟩', '🪜'],
          ['⬛️', '⬛️', '🟩', '⬛️', '🟩', '🟩', '⬛️'],
          ['⬛️', '🟩', '🟩', '⬛️', '🪜', '🟩', '⬛️'],
          ['🟩', '🟩', '🟩', '⬛️', '🪜', '🟩', '⬛️'],
          ['⬛️', '🪜', '🟩', '🪜', '🟩', '🟩', '🟩'],
          ['⬛️', '⬛️', '⬛️', '⬛️', '🟩', '🟩', '🟩']
        ];

        const vectorMap = VectorMap.twoDimensionalArrayToVectorMap(array);

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(0, 0),
          vectorMap.findNode(6, 6)
        ))).toMatchSnapshot();

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(6, 6),
          vectorMap.findNode(0, 0)
        ))).toMatchSnapshot();

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(0, 6),
          vectorMap.findNode(6, 0)
        ))).toMatchSnapshot();

        expect(vectorMap.printTraversal(DepthFirst.findPath(
          vectorMap.findNode(6, 0),
          vectorMap.findNode(0, 6)
        ))).toMatchSnapshot();
      });
    });
  });
});
