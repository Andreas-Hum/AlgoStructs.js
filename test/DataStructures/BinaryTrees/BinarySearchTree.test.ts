import { BinarySearchTree } from '../../../src/DataStructures/BinaryTrees';
import * as fc from 'fast-check';

describe('BinarySearchTree', () => {
    const compareNumbers: (a: number, b: number) => number = (a, b) => a - b;

    it('should insert elements and maintain the binary search tree property', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const bst: BinarySearchTree<number> = new BinarySearchTree(compareNumbers);
                arr.forEach((num: number) => bst.insert(num));
                const inOrder: number[] = Array.from(bst);
                const sorted: number[] = [...arr].sort((a, b) => a - b);
                expect(inOrder).toEqual(sorted);
            })
        );
    });

    it('should correctly report size after insertions', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const bst: BinarySearchTree<number> = new BinarySearchTree(compareNumbers);
                arr.forEach((num: number) => bst.insert(num));
                expect(bst.getSize()).toBe(arr.length);
            })
        );
    });

    it('should correctly report presence of elements', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.integer(), (arr: number[], num: number) => {
                const bst: BinarySearchTree<number> = new BinarySearchTree(compareNumbers);
                arr.forEach((n: number) => bst.insert(n));
                arr.forEach((n: number) => expect(bst.contains(n)).toBe(true));
                expect(bst.contains(num)).toBe(arr.includes(num));
            })
        );
    });

    it('should delete elements correctly and maintain the binary search tree property', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const bst: BinarySearchTree<number> = new BinarySearchTree(compareNumbers);
                arr.forEach((num: number) => bst.insert(num));
                arr.forEach((num: number) => bst.delete(num));
                const inOrder: number[] = Array.from(bst);
                expect(inOrder).toEqual([]);
                expect(bst.getSize()).toBe(0);
            })
        );
    });

    it('should maintain the binary search tree properties after multiple operations', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.array(fc.integer()), (insertArr: number[], deleteArr: number[]) => {
                const bst: BinarySearchTree<number> = new BinarySearchTree(compareNumbers);
                insertArr.forEach((num: number) => bst.insert(num));
                deleteArr.forEach((num: number) => bst.delete(num));
                const inOrder: number[] = Array.from(bst);
                const expected: number[] = insertArr.filter((num: number) => !deleteArr.includes(num)).sort((a, b) => a - b);
                expect(inOrder).toEqual(expected);
            })
        );
    });

    it('should correctly report min and max values', () => {
        fc.assert(
            fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr: number[]) => {
                const bst: BinarySearchTree<number> = new BinarySearchTree(compareNumbers);
                arr.forEach((num: number) => bst.insert(num));
                const minNode = bst.getMinNode();
                const maxNode = bst.getMaxNode();
                expect(minNode?.get()).toBe(Math.min(...arr));
                expect(maxNode?.get()).toBe(Math.max(...arr));
            })
        );
    });
});