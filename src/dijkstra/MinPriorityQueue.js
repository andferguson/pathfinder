const _ = require('lodash');

/**
 * Class representing a minimum priority queue for Dijkstra's algorithm.
 * Maintains elements sorted by priority in ascending order.
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
    return Boolean(this.items.length);
  }

  /**
   * Returns the highest-priority element but does not modify the queue.
   *
   * @returns {object|undefined} The highest-priority element or undefined if queue is empty.
   */
  get peek() {
    return _.head(this.items);
  }

  /**
   * Add an element to the queue with an associated priority.
   *
   * @param {object} element The element to add to the queue with a priority property.
   * @returns {void}
   */
  insertWithPriority(element) {
    this.items.push(element);
    this.items = _.sortBy(this.items, 'priority');
  }

  /**
   * Remove the element from the queue that has the highest priority, and return it.
   *
   * @returns {object|undefined} The highest-priority element or undefined if queue is empty.
   */
  pullHighestPriorityElement() {
    return this.items.shift();
  }
}

module.exports = MinPriorityQueue;
