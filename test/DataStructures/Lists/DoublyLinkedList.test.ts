import { DoublyLinkedList } from '../../../src/DataStructures/Lists/DoublyLinkedList';
import * as fc from 'fast-check';

describe('DoublyLinkedList', () => {
    let numberList: DoublyLinkedList<number>;
    let stringList: DoublyLinkedList<string>;

    beforeEach(() => {
        numberList = new DoublyLinkedList<number>((a, b) => a - b);
        stringList = new DoublyLinkedList<string>((a, b) => a.localeCompare(b));
    });

    test('should add elements correctly', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (numbers) => {
                numberList.clear();
                numberList.add(...numbers);
                expect(numberList.size()).toBe(numbers.length);
                expect(numberList.toArray()).toEqual(numbers);
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), (strings) => {
                stringList.clear();
                stringList.add(...strings);
                expect(stringList.size()).toBe(strings.length);
                expect(stringList.toArray()).toEqual(strings);
            })
        );
    });

    test('should remove elements correctly', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.integer(), (numbers, numToRemove) => {
                numberList.clear();
                numberList.add(...numbers);
                const removed = numberList.remove(numToRemove);
                const expectedArray = numbers.filter(num => num !== numToRemove);
                expect(numberList.size()).toBe(expectedArray.length);
                expect(numberList.toArray()).toEqual(expectedArray);
                if (numbers.includes(numToRemove)) {
                    expect(removed).toBe(numToRemove);
                } else {
                    expect(removed).toBe(null);
                }
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), fc.string({ minLength: 1 }), (strings, strToRemove) => {
                stringList.clear();
                stringList.add(...strings);
                const removed = stringList.remove(strToRemove);
                const expectedArray = strings.filter(str => str !== strToRemove);
                expect(stringList.size()).toBe(expectedArray.length);
                expect(stringList.toArray()).toEqual(expectedArray);
                if (strings.includes(strToRemove)) {
                    expect(removed).toBe(strToRemove);
                } else {
                    expect(removed).toBe(null);
                }
            })
        );
    });

    test('should check if the list contains an element', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.integer(), (numbers, numToCheck) => {
                numberList.clear();
                numberList.add(...numbers);
                expect(numberList.contains(numToCheck)).toBe(numbers.includes(numToCheck));
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), fc.string({ minLength: 1 }), (strings, strToCheck) => {
                stringList.clear();
                stringList.add(...strings);
                expect(stringList.contains(strToCheck)).toBe(strings.includes(strToCheck));
            })
        );
    });

    test('should check if the list is empty', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (numbers) => {
                numberList.clear();
                expect(numberList.isEmpty()).toBe(true);
                numberList.add(...numbers);
                expect(numberList.isEmpty()).toBe(numbers.length === 0);
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), (strings) => {
                stringList.clear();
                expect(stringList.isEmpty()).toBe(true);
                stringList.add(...strings);
                expect(stringList.isEmpty()).toBe(strings.length === 0);
            })
        );
    });

    test('should get the size of the list', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (numbers) => {
                numberList.clear();
                numberList.add(...numbers);
                expect(numberList.size()).toBe(numbers.length);
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), (strings) => {
                stringList.clear();
                stringList.add(...strings);
                expect(stringList.size()).toBe(strings.length);
            })
        );
    });

    test('should clear the list', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (numbers) => {
                numberList.clear();
                numberList.add(...numbers);
                numberList.clear();
                expect(numberList.size()).toBe(0);
                expect(numberList.isEmpty()).toBe(true);
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), (strings) => {
                stringList.clear();
                stringList.add(...strings);
                stringList.clear();
                expect(stringList.size()).toBe(0);
                expect(stringList.isEmpty()).toBe(true);
            })
        );
    });

    test('should get the value at the specified index', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.integer(), (numbers, index) => {
                numberList.clear();
                numberList.add(...numbers);
                if (index >= 0 && index < numbers.length) {
                    expect(numberList.get(index)).toBe(numbers[index]);
                } else {
                    expect(numberList.get(index)).toBe(null);
                }
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), fc.integer(), (strings, index) => {
                stringList.clear();
                stringList.add(...strings);
                if (index >= 0 && index < strings.length) {
                    expect(stringList.get(index)).toBe(strings[index]);
                } else {
                    expect(stringList.get(index)).toBe(null);
                }
            })
        );
    });

    test('should set the value at the specified index', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.integer(), fc.integer(), (numbers, index, newValue) => {
                numberList.clear();
                numberList.add(...numbers);
                const result = numberList.set(index, newValue);
                if (index >= 0 && index < numbers.length) {
                    expect(result).toBe(true);
                    expect(numberList.get(index)).toBe(newValue);
                } else {
                    expect(result).toBe(false);
                }
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), fc.integer(), fc.string({ minLength: 1 }), (strings, index, newValue) => {
                stringList.clear();
                stringList.add(...strings);
                const result = stringList.set(index, newValue);
                if (index >= 0 && index < strings.length) {
                    expect(result).toBe(true);
                    expect(stringList.get(index)).toBe(newValue);
                } else {
                    expect(result).toBe(false);
                }
            })
        );
    });

    test('should convert the list to an array', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (numbers) => {
                numberList.clear();
                numberList.add(...numbers);
                expect(numberList.toArray()).toEqual(numbers);
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), (strings) => {
                stringList.clear();
                stringList.add(...strings);
                expect(stringList.toArray()).toEqual(strings);
            })
        );
    });

    test('should be iterable', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (numbers) => {
                numberList.clear();
                numberList.add(...numbers);
                const numberItems = [];
                for (const item of numberList) {
                    numberItems.push(item);
                }
                expect(numberItems).toEqual(numbers);
            })
        );

        fc.assert(
            fc.property(fc.array(fc.string({ minLength: 1 })), (strings) => {
                stringList.clear();
                stringList.add(...strings);
                const stringItems = [];
                for (const item of stringList) {
                    stringItems.push(item);
                }
                expect(stringItems).toEqual(strings);
            })
        );
    });

    test('should work correctly with random operations', () => {
        fc.assert(
            fc.property(
                fc.array(fc.oneof(fc.integer(), fc.string({ minLength: 1 }))),
                (operations) => {
                    const testNumberList = new DoublyLinkedList<number>((a, b) => a - b);
                    const referenceNumberList: number[] = [];
                    const testStringList = new DoublyLinkedList<string>((a, b) => a.localeCompare(b));
                    const referenceStringList: string[] = [];

                    operations.forEach(op => {
                        if (typeof op === 'number') {
                            testNumberList.add(op);
                            referenceNumberList.push(op);
                        } else if (typeof op === 'string') {
                            testStringList.add(op);
                            referenceStringList.push(op);
                        }
                    });

                    expect(testNumberList.toArray()).toEqual(referenceNumberList);
                    expect(testStringList.toArray()).toEqual(referenceStringList);
                }
            )
        );
    });
});