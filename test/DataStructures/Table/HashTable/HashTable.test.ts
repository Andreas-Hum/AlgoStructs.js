import { HashTable } from '../../../../src/DataStructures/Table/HashTable';
import * as fc from 'fast-check';

describe('HashTable', () => {
    const toNumber = (key: string): number => {
        return key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    };

    const createHashTable = () => new HashTable<string, number>({ size: 10, toNumber });

    it('should correctly put and get values', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), (data) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                return Object.entries(data).every(([key, value]) => hashTable.get(key) === value);
            })
        );
    });

    it('should correctly remove values', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), fc.array(fc.string()), (data, keysToRemove) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                keysToRemove.forEach(key => hashTable.remove(key));

                return Object.entries(data).every(([key, value]) =>
                    keysToRemove.includes(key) ? hashTable.get(key) === null : hashTable.get(key) === value
                );
            })
        );
    });

    it('should correctly report size', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), (data) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                return hashTable.getSize() === Object.keys(data).length;
            })
        );
    });

    it('should correctly report contains key', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), fc.string(), (data, extraKey) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                return Object.keys(data).every(key => hashTable.containsKey(key)) &&
                    !hashTable.containsKey(extraKey + 'nonexistent');
            })
        );
    });

    it('should correctly get all keys', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), (data) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                const keys = hashTable.getKeys();
                return keys.length === Object.keys(data).length &&
                    Object.keys(data).every(key => keys.includes(key));
            })
        );
    });

    it('should correctly get all values', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), (data) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                const values = hashTable.getValues();
                return values.length === Object.values(data).length &&
                    Object.values(data).every(value => values.includes(value));
            })
        );
    });

    it('should correctly clear all entries', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), (data) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                hashTable.clear();
                return hashTable.getSize() === 0 &&
                    Object.keys(data).every(key => hashTable.get(key) === null);
            })
        );
    });

    it('should correctly handle collisions', () => {
        fc.assert(
            fc.property(fc.array(fc.tuple(fc.string(), fc.integer()), { minLength: 20, maxLength: 100 }), (entries) => {
                const hashTable = createHashTable();
                entries.forEach(([key, value]) => hashTable.put(key, value));

                return entries.every(([key, value]) => hashTable.get(key) === value);
            })
        );
    });

    it('should be iterable', () => {
        fc.assert(
            fc.property(fc.dictionary(fc.string(), fc.integer()), (data) => {
                const hashTable = createHashTable();
                Object.entries(data).forEach(([key, value]) => hashTable.put(key, value));

                const entries = Array.from(hashTable);
                return entries.length === Object.entries(data).length &&
                    Object.entries(data).every(([key, value]) =>
                        entries.some(([k, v]) => k === key && v === value)
                    );
            })
        );
    });
});