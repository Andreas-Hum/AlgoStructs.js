import { Queue } from './../../../src/DataStructures/Queues/Queue';
import * as fc from 'fast-check';

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    test('should enqueue elements correctly', () => {
        queue.enqueue(1);
        queue.enqueue(2, 3);
        expect(queue.size()).toBe(3);
        expect(queue.front()).toBe(1);
    });

    test('should dequeue elements correctly', () => {
        queue.enqueue(1, 2, 3);
        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        expect(queue.size()).toBe(1);
        expect(queue.front()).toBe(3);
    });

    test('should return undefined when dequeue from an empty queue', () => {
        expect(queue.dequeue()).toBeUndefined();
    });

    test('should return the front element without removing it', () => {
        queue.enqueue(1, 2, 3);
        expect(queue.front()).toBe(1);
        expect(queue.size()).toBe(3);
    });

    test('should check if the queue is empty', () => {
        expect(queue.isEmpty()).toBe(true);
        queue.enqueue(1);
        expect(queue.isEmpty()).toBe(false);
    });

    test('should return the correct size of the queue', () => {
        expect(queue.size()).toBe(0);
        queue.enqueue(1, 2, 3);
        expect(queue.size()).toBe(3);
    });

    test('should clear the queue', () => {
        queue.enqueue(1, 2, 3);
        queue.clear();
        expect(queue.size()).toBe(0);
        expect(queue.isEmpty()).toBe(true);
    });

    test('should be iterable', () => {
        queue.enqueue(1, 2, 3);
        const items = [];
        for (const item of queue) {
            items.push(item);
        }
        expect(items).toEqual([1, 2, 3]);
    });

    test('should work correctly with random operations', () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer()),
                (operations) => {
                    const testQueue = new Queue<number>();
                    const referenceQueue: number[] = [];

                    operations.forEach(op => {
                        if (op >= 0) {
                            testQueue.enqueue(op);
                            referenceQueue.push(op);
                        } else {
                            expect(testQueue.dequeue()).toBe(referenceQueue.shift());
                        }
                    });

                    expect([...testQueue]).toEqual(referenceQueue);
                }
            )
        );
    });
});