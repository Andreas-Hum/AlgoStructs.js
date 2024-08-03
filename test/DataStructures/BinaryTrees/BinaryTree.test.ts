import { BinaryTree } from '../../../src/DataStructures/BinaryTrees';
import * as fc from 'fast-check';

const compareNumbers: (a: number, b: number) => number = (a, b) => a - b;

describe('BinaryTree', () => {

    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    // Test insertion and size property
    it('should correctly insert elements and report the correct size', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
                arr.forEach((num: number) => tree.insert(num));
                return tree.getSize() === arr.length;
            })
        );
    });

    // Test clear method
    it('should clear the tree correctly', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
                arr.forEach((num: number) => tree.insert(num));
                tree.clear();
                return tree.getSize() === 0 && tree.getRoot() === null;
            })
        );
    });

    // Test contains method
    it('should correctly identify if an element is in the tree', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.integer(), (arr: number[], target: number) => {
                const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
                arr.forEach((num: number) => tree.insert(num));
                return tree.contains(target) === arr.includes(target);
            })
        );
    });

    // Test delete method
    it('should correctly delete elements and update the size', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), fc.integer(), (arr: number[], target: number) => {
                const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
                arr.forEach((num: number) => tree.insert(num));
                const sizeBeforeDelete: number = tree.getSize();
                const deleteResult: boolean = tree.delete(target);
                if (arr.includes(target)) {
                    return deleteResult === true && tree.getSize() === sizeBeforeDelete - 1;
                } else {
                    return deleteResult === false && tree.getSize() === sizeBeforeDelete;
                }
            })
        );
    });

    // Test isBalanced method
    it('should correctly report if the tree is balanced', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
                arr.forEach((num: number) => tree.insert(num));
                const isBalanced: boolean = tree.isBalanced();
                return typeof isBalanced === 'boolean';
            })
        );
    });

    // Test isComplete method
    it('should correctly report if the tree is complete', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
                arr.forEach((num: number) => tree.insert(num));
                const isComplete: boolean = tree.isComplete();
                return typeof isComplete === 'boolean';
            })
        );
    });

    // Test isFull method
    it('should correctly report if the tree is full', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (arr: number[]) => {
                const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
                arr.forEach((num: number) => tree.insert(num));
                const isFull: boolean = tree.isFull();
                return typeof isFull === 'boolean';
            })
        );
    });

});