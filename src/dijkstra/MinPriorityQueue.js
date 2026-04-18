/**
 * A minimum priority queue implementation using a binary heap for Dijkstra's algorithm.
 *
 * This queue maintains elements in a binary heap structure, providing O(log n) insertion and
 * O(log n) deletion of the minimum element. The heap property ensures the lowest-priority
 * element is always at the root for efficient retrieval.
 *
 * Time Complexity: O(log n) for insertWithPriority and pullHighestPriorityElement
 * Space Complexity: O(n) for storing elements
 *
 * @class
 */
class MinPriorityQueue {
  /**
   * Creates a new MinPriorityQueue instance.
   */
  constructor() {
    this.items = [];
  }

  /**
   * Check whether the queue has no elements.
   *
   * @returns {boolean} Returns true if the queue is empty, false otherwise.
   */
  get isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Returns the highest-priority element but does not modify the queue.
   *
   * @returns {object|undefined} The highest-priority element or undefined if queue is empty.
   */
  get peek() {
    return this.items[0];
  }

  /**
   * Add an element to the queue with an associated priority.
   *
   * Uses the bubble-up algorithm to maintain the min-heap property.
   * Time Complexity: O(log n)
   *
   * @param {object} element The element to add to the queue with a priority property.
   * @returns {void}
   */
  insertWithPriority(element) {
    this.items.push(element);
    this.bubbleUp(this.items.length - 1);
  }

  /**
   * Remove the element from the queue that has the highest priority, and return it.
   *
   * Uses the bubble-down algorithm to restore the min-heap property after removal.
   * Time Complexity: O(log n)
   *
   * @returns {object|undefined} The highest-priority element or undefined if queue is empty.
   */
  pullHighestPriorityElement() {
    if (this.items.length === 0) {
      return undefined;
    }

    const min = this.items[0];

    if (this.items.length === 1) {
      this.items.pop();
    } else {
      this.items[0] = this.items.pop();
      this.bubbleDown(0);
    }

    return min;
  }

  /**
   * Moves an element up the heap to restore the min-heap property.
   *
   * @private
   * @param {number} index The index of the element to bubble up.
   * @returns {void}
   */
  bubbleUp(index) {
    if (index === 0) {
      return;
    }

    const parentIndex = Math.floor((index - 1) / 2);

    if (this.items[index].priority < this.items[parentIndex].priority) {
      [this.items[index], this.items[parentIndex]] = [
        this.items[parentIndex],
        this.items[index]
      ];

      this.bubbleUp(parentIndex);
    }
  }

  /**
   * Moves an element down the heap to restore the min-heap property.
   *
   * @private
   * @param {number} index The index of the element to bubble down.
   * @returns {void}
   */
  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let minIndex = index;

    if (leftChildIndex < this.items.length
        && this.items[leftChildIndex].priority < this.items[minIndex].priority) {
      minIndex = leftChildIndex;
    }

    if (rightChildIndex < this.items.length
        && this.items[rightChildIndex].priority < this.items[minIndex].priority) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== index) {
      [this.items[index], this.items[minIndex]] = [
        this.items[minIndex],
        this.items[index]
      ];

      this.bubbleDown(minIndex);
    }
  }
}

module.exports = MinPriorityQueue;
