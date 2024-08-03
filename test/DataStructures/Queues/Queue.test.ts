import { Queue } from './../../../src/DataStructures/Queues/Queue';
import * as fc from 'fast-check';

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    test('should enqueue elements correctly', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                queue = new Queue<number>(); // Ensure queue is reset
                arr.forEach((num: number) => queue.enqueue(num));
                expect(queue.size()).toBe(arr.length);
                if (arr.length > 0) {
                    expect(queue.front()).toBe(arr[0]);
                }
            })
        );
    });

    test('should dequeue elements correctly', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                queue = new Queue<number>(); // Ensure queue is reset
                arr.forEach((num: number) => queue.enqueue(num));
                arr.forEach((num: number) => {
                    expect(queue.dequeue()).toBe(num);
                });
                expect(queue.size()).toBe(0);
            })
        );
    });

    test('should return undefined when dequeue from an empty queue', () => {
        expect(queue.dequeue()).toBeUndefined();
    });

    test('should return the front element without removing it', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                queue = new Queue<number>(); // Ensure queue is reset
                arr.forEach((num: number) => queue.enqueue(num));
                if (arr.length > 0) {
                    expect(queue.front()).toBe(arr[0]);
                    expect(queue.size()).toBe(arr.length);
                }
            })
        );
    });

    test('should check if the queue is empty', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                queue = new Queue<number>(); // Ensure queue is reset
                expect(queue.isEmpty()).toBe(true);
                arr.forEach((num: number) => queue.enqueue(num));
                expect(queue.isEmpty()).toBe(arr.length === 0);
            })
        );
    });

    test('should return the correct size of the queue', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                queue = new Queue<number>(); // Ensure queue is reset
                arr.forEach((num: number) => queue.enqueue(num));
                expect(queue.size()).toBe(arr.length);
            })
        );
    });

    test('should clear the queue', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                queue = new Queue<number>(); // Ensure queue is reset
                arr.forEach((num: number) => queue.enqueue(num));
                queue.clear();
                expect(queue.size()).toBe(0);
                expect(queue.isEmpty()).toBe(true);
            })
        );
    });

    test('should be iterable', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                queue = new Queue<number>(); // Ensure queue is reset
                arr.forEach((num: number) => queue.enqueue(num));
                const items: number[] = [];
                for (const item of queue) {
                    items.push(item);
                }
                expect(items).toEqual(arr);
            })
        );
    });

    test('should work correctly with random operations', () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer()),
                (operations: number[]) => {
                    const testQueue: Queue<number> = new Queue<number>();
                    const referenceQueue: number[] = [];

                    operations.forEach((op: number) => {
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