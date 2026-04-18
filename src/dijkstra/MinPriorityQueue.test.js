const MinPriorityQueue = require('./MinPriorityQueue');

describe('MinPriorityQueue', () => {
  it('is a MinPriorityQueue', () => {
    const queue = new MinPriorityQueue();

    expect(queue).toBeInstanceOf(MinPriorityQueue);
  });

  describe('isEmpty', () => {
    it('returns true for an empty queue', () => {
      const queue = new MinPriorityQueue();

      expect(queue.isEmpty).toBe(true);
    });

    it('returns false for a non-empty queue', () => {
      const queue = new MinPriorityQueue();
      queue.insertWithPriority({ node: 'A', priority: 5 });

      expect(queue.isEmpty).toBe(false);
    });
  });

  describe('peek', () => {
    it('returns undefined for an empty queue', () => {
      const queue = new MinPriorityQueue();

      expect(queue.peek).toBeUndefined();
    });

    it('returns the element with the lowest priority', () => {
      const queue = new MinPriorityQueue();
      const element1 = { node: 'A', priority: 10 };
      const element2 = { node: 'B', priority: 5 };
      const element3 = { node: 'C', priority: 8 };

      queue.insertWithPriority(element1);
      queue.insertWithPriority(element2);
      queue.insertWithPriority(element3);

      expect(queue.peek).toEqual(element2);
    });

    it('does not remove the element from the queue', () => {
      const queue = new MinPriorityQueue();
      const element = { node: 'A', priority: 5 };

      queue.insertWithPriority(element);
      // eslint-disable-next-line no-unused-expressions
      queue.peek;
      // eslint-disable-next-line no-unused-expressions
      queue.peek;

      expect(queue.isEmpty).toBe(false);
    });
  });

  describe('insertWithPriority', () => {
    it('adds an element to the queue', () => {
      const queue = new MinPriorityQueue();
      const element = { node: 'A', priority: 5 };

      queue.insertWithPriority(element);

      expect(queue.isEmpty).toBe(false);
      expect(queue.peek).toEqual(element);
    });

    it('maintains the min-heap property with multiple insertions', () => {
      const queue = new MinPriorityQueue();
      const element1 = { node: 'A', priority: 10 };
      const element2 = { node: 'B', priority: 5 };
      const element3 = { node: 'C', priority: 3 };
      const element4 = { node: 'D', priority: 7 };

      queue.insertWithPriority(element1);
      queue.insertWithPriority(element2);
      queue.insertWithPriority(element3);
      queue.insertWithPriority(element4);

      expect(queue.peek).toEqual(element3);
    });

    it('handles duplicate priorities correctly', () => {
      const queue = new MinPriorityQueue();
      const element1 = { node: 'A', priority: 5 };
      const element2 = { node: 'B', priority: 5 };
      const element3 = { node: 'C', priority: 5 };

      queue.insertWithPriority(element1);
      queue.insertWithPriority(element2);
      queue.insertWithPriority(element3);

      expect(queue.peek.priority).toBe(5);
    });
  });

  describe('pullHighestPriorityElement', () => {
    it('returns undefined for an empty queue', () => {
      const queue = new MinPriorityQueue();

      expect(queue.pullHighestPriorityElement()).toBeUndefined();
    });

    it('removes and returns the element with the lowest priority', () => {
      const queue = new MinPriorityQueue();
      const element1 = { node: 'A', priority: 10 };
      const element2 = { node: 'B', priority: 5 };
      const element3 = { node: 'C', priority: 8 };

      queue.insertWithPriority(element1);
      queue.insertWithPriority(element2);
      queue.insertWithPriority(element3);

      const pulled = queue.pullHighestPriorityElement();

      expect(pulled).toEqual(element2);
      expect(queue.peek).toEqual(element3);
    });

    it('returns elements in priority order', () => {
      const queue = new MinPriorityQueue();
      const elements = [
        { node: 'A', priority: 10 },
        { node: 'B', priority: 5 },
        { node: 'C', priority: 3 },
        { node: 'D', priority: 7 },
        { node: 'E', priority: 1 }
      ];

      elements.forEach((elem) => queue.insertWithPriority(elem));

      const results = [];
      while (!queue.isEmpty) {
        results.push(queue.pullHighestPriorityElement());
      }

      expect(results[0].priority).toBe(1);
      expect(results[1].priority).toBe(3);
      expect(results[2].priority).toBe(5);
      expect(results[3].priority).toBe(7);
      expect(results[4].priority).toBe(10);
    });

    it('maintains heap property after removal', () => {
      const queue = new MinPriorityQueue();
      const element1 = { node: 'A', priority: 10 };
      const element2 = { node: 'B', priority: 5 };
      const element3 = { node: 'C', priority: 3 };
      const element4 = { node: 'D', priority: 7 };
      const element5 = { node: 'E', priority: 6 };

      queue.insertWithPriority(element1);
      queue.insertWithPriority(element2);
      queue.insertWithPriority(element3);
      queue.insertWithPriority(element4);
      queue.insertWithPriority(element5);

      queue.pullHighestPriorityElement();

      expect(queue.peek.priority).toBe(5);
    });
  });
});
