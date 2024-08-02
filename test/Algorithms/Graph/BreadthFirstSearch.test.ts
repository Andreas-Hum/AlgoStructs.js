// BreadthFirstSearch.test.ts
import { breadthFirstSearch } from '../../../src/Algorithms/Graph';
import GraphOptions from '../../../src/Options/AlgorithmOptions/GraphOptions/GraphOptions';
import * as fc from 'fast-check';

describe('breadthFirstSearch', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    const getNeighbors = (graph: { [key: number]: number[] }) => (node: number): number[] => graph[node] || [];

    const bfsManual = (graph: { [key: number]: number[] }, startNode: number): number[] => {
        if (!(startNode in graph)) {
            return [startNode];
        }
        const queue: number[] = [startNode];
        const visited: Set<number> = new Set<number>();
        const order: number[] = [];

        while (queue.length > 0) {
            const node = queue.shift()!;
            if (!visited.has(node)) {
                visited.add(node);
                order.push(node);
                queue.push(...(graph[node] || []));
            }
        }
        return order;
    };

    test('should visit all nodes in BFS order', () => {
        fc.assert(
            fc.property(
                fc.dictionary(fc.string(), fc.array(fc.integer({ min: 1, max: 20 }))),
                fc.integer({ min: 1, max: 20 }),
                (graph, startNode) => {
                    const intGraph: {
                        [k: string]: number[];
                    } = Object.fromEntries(Object.entries(graph).map(([key, value]) => [parseInt(key), value]));

                    const visit: jest.Mock<any, any, any> = jest.fn();
                    const options: GraphOptions<number> = { getNeighbors: getNeighbors(intGraph), startNode, visit };
                    const visitedNodes: number[] = breadthFirstSearch(options);

                    const expectedOrder: number[] = bfsManual(intGraph, startNode);

                    expect(visitedNodes).toEqual(expectedOrder);
                    expect(visit).toHaveBeenCalledTimes(expectedOrder.length);
                    expectedOrder.forEach((node, index) => {
                        expect(visit).toHaveBeenNthCalledWith(index + 1, node);
                    });
                }
            )
        );
    });

    test('should stop when target node is found', () => {
        fc.assert(
            fc.property(
                fc.dictionary(fc.string(), fc.array(fc.integer({ min: 1, max: 20 }))),
                fc.integer({ min: 1, max: 20 }),
                fc.integer({ min: 1, max: 20 }),
                (graph, startNode, targetNode) => {
                    const intGraph: {
                        [k: string]: number[];
                    } = Object.fromEntries(Object.entries(graph).map(([key, value]) => [parseInt(key), value]));

                    const visit: jest.Mock<any, any, any> = jest.fn();
                    const options: GraphOptions<number> = { getNeighbors: getNeighbors(intGraph), startNode, visit, targetNode };
                    const visitedNodes: number[] = breadthFirstSearch(options);

                    const targetIndex: number = visitedNodes.indexOf(targetNode);
                    if (targetIndex !== -1) {
                        expect(visitedNodes.slice(0, targetIndex + 1)).toContain(targetNode);
                        expect(visit).toHaveBeenCalledTimes(targetIndex + 1);
                        expect(visit).toHaveBeenNthCalledWith(targetIndex + 1, targetNode);
                    }
                }
            )
        );
    });

    test('should handle graph with no edges', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 20 }),
                (startNode) => {
                    const graph: { [key: number]: number[] } = {};
                    for (let i: number = 1; i <= 20; i++) {
                        graph[i] = [];
                    }

                    const visit: jest.Mock<any, any, any> = jest.fn();
                    const options: GraphOptions<number> = { getNeighbors: getNeighbors(graph), startNode, visit };
                    const visitedNodes: number[] = breadthFirstSearch(options);

                    expect(visitedNodes).toEqual([startNode]);
                    expect(visit).toHaveBeenCalledTimes(1);
                    expect(visit).toHaveBeenCalledWith(startNode);
                }
            )
        );
    });

    test('should handle empty graph', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 20 }),
                (startNode) => {
                    const graph: { [key: number]: number[] } = {};
                    const visit: jest.Mock<any, any, any> = jest.fn();
                    const options: GraphOptions<number> = { getNeighbors: getNeighbors(graph), startNode, visit };
                    const visitedNodes: number[] = breadthFirstSearch(options);

                    expect(visitedNodes).toEqual([startNode]);
                    expect(visit).toHaveBeenCalledTimes(1);
                    expect(visit).toHaveBeenCalledWith(startNode);
                }
            )
        );
    });
});
