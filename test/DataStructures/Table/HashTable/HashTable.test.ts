import { HashTable } from '../../../../src/DataStructures/Table';
import * as fc from 'fast-check';

// Define a simple string to number hash function
const stringToNumber: (str: string) => number = (str: string): number => {
    let sum: number = 0;
    for (let i: number = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
};

// Define a simple number to number hash function
const numberToNumber: (num: number) => number = (num: number): number => {
    return num;
};

// Helper function to ensure unique pairs of keys and values
const ensureUniquePairs = <K, V>(keys: K[], values: V[]): [K[], V[]] => {
    const uniquePairs: Map<K, V> = new Map();
    keys.forEach((key: K, index: number) => {
        uniquePairs.set(key, values[index]);
    });
    return [Array.from(uniquePairs.keys()), Array.from(uniquePairs.values())];
};

// Property-based tests
describe('HashTable', () => {
    it('should correctly insert and retrieve values with string keys', () => {
        fc.assert(
            fc.property(fc.string(), fc.integer(), (key: string, value: number) => {
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                hashTable.put(key, value);
                const retrievedValue: number | undefined = hashTable.get(key);
                expect(retrievedValue).toBe(value);
            })
        );
    });

    it('should correctly insert and retrieve values with number keys', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (key: number, value: number) => {
                const hashTable: HashTable<number, number> = new HashTable<number, number>({ size: 10, toNumber: numberToNumber });
                hashTable.put(key, value);
                const retrievedValue: number | undefined = hashTable.get(key);
                expect(retrievedValue).toBe(value);
            })
        );
    });

    it('should correctly remove values', () => {
        fc.assert(
            fc.property(fc.string(), fc.integer(), (key: string, value: number) => {
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                hashTable.put(key, value);
                hashTable.remove(key);
                const retrievedValue: number | undefined = hashTable.get(key);
                expect(retrievedValue).toBe(undefined);
            })
        );
    });

    it('should check if a key is in the hash table', () => {
        fc.assert(
            fc.property(fc.string(), fc.integer(), (key: string, value: number) => {
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                hashTable.put(key, value);
                expect(hashTable.containsKey(key)).toBe(true);
                hashTable.remove(key);
                expect(hashTable.containsKey(key)).toBe(false);
            })
        );
    });

    it('should return all keys in the hash table', () => {
        fc.assert(
            fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 10 }), fc.array(fc.integer(), { minLength: 1, maxLength: 10 }), (keys: string[], values: number[]) => {
                fc.pre(keys.length === values.length); // Ensure lengths are the same
                const [uniqueKeys, uniqueValues] = ensureUniquePairs(keys, values);
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                uniqueKeys.forEach((key: string, index: number) => {
                    hashTable.put(key, uniqueValues[index]);
                });
                const retrievedKeys: string[] = hashTable.getKeys();
                uniqueKeys.forEach((key: string) => {
                    expect(retrievedKeys).toContain(key);
                });
            })
        );
    });

    it('should return all values in the hash table', () => {
        fc.assert(
            fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 10 }), fc.array(fc.integer(), { minLength: 1, maxLength: 10 }), (keys: string[], values: number[]) => {
                fc.pre(keys.length === values.length); // Ensure lengths are the same
                const [uniqueKeys, uniqueValues] = ensureUniquePairs(keys, values);
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                uniqueKeys.forEach((key: string, index: number) => {
                    hashTable.put(key, uniqueValues[index]);
                });
                const retrievedValues: number[] = hashTable.getValues();
                uniqueValues.forEach((value: number) => {
                    expect(retrievedValues).toContain(value);
                });
            })
        );
    });

    it('should clear all elements in the hash table', () => {
        fc.assert(
            fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 10 }), fc.array(fc.integer(), { minLength: 1, maxLength: 10 }), (keys: string[], values: number[]) => {
                fc.pre(keys.length === values.length); // Ensure lengths are the same
                const [uniqueKeys, uniqueValues] = ensureUniquePairs(keys, values);
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                uniqueKeys.forEach((key: string, index: number) => {
                    hashTable.put(key, uniqueValues[index]);
                });
                hashTable.clear();
                expect(hashTable.getSize()).toBe(0);
                uniqueKeys.forEach((key: string) => {
                    expect(hashTable.get(key)).toBe(undefined);
                });
            })
        );
    });

    it('should return the correct size of the hash table', () => {
        fc.assert(
            fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 10 }), fc.array(fc.integer(), { minLength: 1, maxLength: 10 }), (keys: string[], values: number[]) => {
                fc.pre(keys.length === values.length); // Ensure lengths are the same
                const [uniqueKeys, uniqueValues] = ensureUniquePairs(keys, values);
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                uniqueKeys.forEach((key: string, index: number) => {
                    hashTable.put(key, uniqueValues[index]);
                });
                expect(hashTable.getSize()).toBe(uniqueKeys.length);
            })
        );
    });

    it('should iterate over all elements in the hash table', () => {
        fc.assert(
            fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 10 }), fc.array(fc.integer(), { minLength: 1, maxLength: 10 }), (keys: string[], values: number[]) => {
                fc.pre(keys.length === values.length); // Ensure lengths are the same
                const [uniqueKeys, uniqueValues] = ensureUniquePairs(keys, values);
                const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber: stringToNumber });
                uniqueKeys.forEach((key: string, index: number) => {
                    hashTable.put(key, uniqueValues[index]);
                });
                const elements: Array<[string, number]> = [];
                for (const [key, value] of hashTable.iteratorGenerator()) {
                    elements.push([key, value]);
                }
                uniqueKeys.forEach((key: string, index: number) => {
                    expect(elements).toContainEqual([key, uniqueValues[index]]);
                });
            })
        );
    });
});