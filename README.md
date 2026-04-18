# Pathfinder

This project contains pathfinding algorithms optimized for two-dimensional map traversal.

## Algorithms

The project implements three pathfinding algorithms:

- **Breadth-First Search (BFS)** - Explores the graph level by level, guaranteeing the shortest path in unweighted graphs
- **Depth-First Search (DFS)** - Explores as far as possible along each branch before backtracking
- **Dijkstra's Algorithm** - Finds the shortest path in weighted graphs by always processing the lowest-cost node first

## Features

- Two-dimensional node mapping with customizable grid sizes
- Vector-based connections between nodes with magnitude weights
- Snapshot-based testing for path validation
- Full JSDoc documentation and TypeScript-style parameter typing
- Comprehensive linting with ESLint, markdownlint, and spell-check

## Installation

```bash
npm install
```

## Usage

```javascript
const Dijkstra = require('./src/dijkstra/Dijkstra');
const VectorMap = require('./src/vector-map/VectorMap');

// Create a vector map from a 2D array
const array = [
  ['🟩', '🟩', '🟩'],
  ['🟩', '🟩', '🟩'],
  ['🟩', '🟩', '🟩']
];

const vectorMap = VectorMap.twoDimensionalArrayToVectorMap(array);

// Find a path using Dijkstra's algorithm
const path = Dijkstra.findPath(
  vectorMap.findNode(0, 0),
  vectorMap.findNode(2, 2)
);

// Visualize the path
console.log(vectorMap.printTraversal(path));
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run build` | Build the project with webpack |
| `npm run lint` | Run all linting checks (ESLint, markdownlint, spell-check) |
| `npm run lint:js` | Run ESLint on source and test files |
| `npm run lint:md` | Run markdownlint on markdown files |
| `npm test` | Run Jest test suite |
| `npm start` | Start the Node.js application |

## Project Structure

```text
src/
  ├── algorithm/        # Base Algorithm class
  ├── breadth-first/    # BFS implementation
  ├── depth-first/      # DFS implementation
  ├── dijkstra/         # Dijkstra's algorithm
  ├── node/             # Node class
  ├── vector/           # Vector class
  └── vector-map/       # 2D plane representation
test/
  └── integration.test.js
```

## Development

- Node.js: >= 22.0.0
- Jest: 29.7.0 for testing
- ESLint: 8.52.0 with airbnb-base configuration
- All code requires full JSDoc documentation with types

## License

MIT
