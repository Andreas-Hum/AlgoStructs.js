import { HashTable } from '../../../../src/DataStructures/Table/HashTable';
import * as fc from 'fast-check';

// Define a custom object type
type CustomObject = { id: number; value: string };

// Function to convert numbers to hash keys
const numberToKey = (num: number): number => num;

// Function to convert strings to hash keys
const stringToKey = (str: string): number => {
    if (str.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
};

// Function to convert custom objects to hash keys
const customObjectToKey = (obj: CustomObject): number => {
    return obj.id;
};

// Property-based tests
describe('HashTable', () => {
    it('should correctly insert and retrieve numbers', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (key, value) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                hashTable.put(key, value);
                expect(hashTable.get(key)).toBe(value);
            })
        );
    });

    it('should correctly insert and retrieve strings', () => {
        fc.assert(
            fc.property(fc.string(), fc.string(), (key, value) => {
                const hashTable = new HashTable<string, string>({ size: 10, toNumber: stringToKey });
                hashTable.put(key, value);
                expect(hashTable.get(key)).toBe(value);
            })
        );
    });

    it('should correctly insert and retrieve custom objects', () => {
        fc.assert(
            fc.property(
                fc.record({ id: fc.integer(), value: fc.string() }),
                fc.string(),
                (key, value) => {
                    const hashTable = new HashTable<CustomObject, string>({ size: 10, toNumber: customObjectToKey });
                    hashTable.put(key, value);
                    expect(hashTable.get(key)).toBe(value);
                }
            )
        );
    });

    it('should correctly remove elements', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (key, value) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                hashTable.put(key, value);
                hashTable.remove(key);
                expect(hashTable.get(key)).toBeUndefined();
            })
        );
    });

    it('should correctly identify if a key is present', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (key, value) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                hashTable.put(key, value);
                expect(hashTable.containsKey(key)).toBe(true);
                hashTable.remove(key);
                expect(hashTable.containsKey(key)).toBe(false);
            })
        );
    });

    it('should return all keys', () => {
        fc.assert(
            fc.property(fc.array(fc.tuple(fc.integer(), fc.integer())), (entries) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                const keys = new Set<number>();
                for (const [key, value] of entries) {
                    hashTable.put(key, value);
                    keys.add(key);
                }
                const hashTableKeys = hashTable.getKeys();
                expect(new Set(hashTableKeys)).toEqual(keys);
            })
        );
    });

    it('should return all values', () => {
        fc.assert(
            fc.property(fc.array(fc.tuple(fc.integer(), fc.integer())), (entries) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                const values = new Set<number>();
                for (const [key, value] of entries) {
                    hashTable.put(key, value);
                    values.add(value);
                }
                const hashTableValues = hashTable.getValues();
                expect(new Set(hashTableValues)).toEqual(values);
            })
        );
    });

    it('should clear all elements', () => {
        fc.assert(
            fc.property(fc.array(fc.tuple(fc.integer(), fc.integer())), (entries) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                for (const [key, value] of entries) {
                    hashTable.put(key, value);
                }
                hashTable.clear();
                expect(hashTable.getSize()).toBe(0);
                for (const [key] of entries) {
                    expect(hashTable.get(key)).toBeUndefined();
                }
            })
        );
    });

    it('should return the correct size', () => {
        fc.assert(
            fc.property(fc.array(fc.tuple(fc.integer(), fc.integer())), (entries) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                for (const [key, value] of entries) {
                    hashTable.put(key, value);
                }
                expect(hashTable.getSize()).toBe(entries.length);
            })
        );
    });

    it('should provide a correct string representation', () => {
        fc.assert(
            fc.property(fc.array(fc.tuple(fc.integer(), fc.integer())), (entries) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                for (const [key, value] of entries) {
                    hashTable.put(key, value);
                }
                const stringRepresentation = hashTable.toString();
                for (const [key, value] of entries) {
                    expect(stringRepresentation).toContain(`${key}: ${value}`);
                }
            })
        );
    });

    it('should iterate over all elements', () => {
        fc.assert(
            fc.property(fc.array(fc.tuple(fc.integer(), fc.integer())), (entries) => {
                const hashTable = new HashTable<number, number>({ size: 10, toNumber: numberToKey });
                for (const [key, value] of entries) {
                    hashTable.put(key, value);
                }
                const iteratedEntries: Array<[number, number]> = [];
                for (const [key, value] of hashTable.iteratorGenerator()) {
                    iteratedEntries.push([key, value]);
                }
                expect(new Set(iteratedEntries)).toEqual(new Set(entries));
            })
        );
    });
});
