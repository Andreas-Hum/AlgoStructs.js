import { Stack } from '../../../src/DataStructures/Stacks';
import * as fc from 'fast-check';

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    test('should initialize an empty stack', () => {
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
    });

    test('should push elements onto the stack', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr) => {
                stack = new Stack<number>(); // Ensure stack is reset
                arr.forEach((num) => stack.push(num));
                expect(stack.size()).toBe(arr.length);
                if (arr.length > 0) {
                    expect(stack.peek()).toBe(arr[arr.length - 1]);
                }
            })
        );
    });

    test('should pop elements from the stack', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr) => {
                stack = new Stack<number>(); // Ensure stack is reset
                arr.forEach((num) => stack.push(num));
                while (arr.length > 0) {
                    expect(stack.pop()).toBe(arr.pop());
                }
                expect(stack.pop()).toBeUndefined();
            })
        );
    });

    test('should peek the top element without removing it', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr) => {
                stack = new Stack<number>(); // Ensure stack is reset
                arr.forEach((num) => stack.push(num));
                if (arr.length > 0) {
                    expect(stack.peek()).toBe(arr[arr.length - 1]);
                    expect(stack.size()).toBe(arr.length);
                }
            })
        );
    });

    test('should check if the stack is empty', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr) => {
                stack = new Stack<number>(); // Ensure stack is reset
                expect(stack.isEmpty()).toBe(true);
                arr.forEach((num) => stack.push(num));
                expect(stack.isEmpty()).toBe(arr.length === 0);
            })
        );
    });

    test('should return the correct size of the stack', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr) => {
                stack = new Stack<number>(); // Ensure stack is reset
                arr.forEach((num) => stack.push(num));
                expect(stack.size()).toBe(arr.length);
            })
        );
    });

    test('should clear the stack', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr) => {
                stack = new Stack<number>(); // Ensure stack is reset
                arr.forEach((num) => stack.push(num));
                stack.clear();
                expect(stack.isEmpty()).toBe(true);
                expect(stack.size()).toBe(0);
            })
        );
    });

    test('should iterate over the stack in LIFO order', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr) => {
                stack = new Stack<number>(); // Ensure stack is reset
                arr.forEach((num) => stack.push(num));
                const elements = [];
                for (const item of stack) {
                    elements.push(item);
                }
                expect(elements).toEqual(arr.reverse());
            })
        );
    });
});