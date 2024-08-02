import WeightedGraphVertex from "../../../DataStructures/Graphs/Vertices/WeightedGraphVertex";

// General graph options
export type GraphOptions<T> = {
    isUndirected?: boolean;
    compare: (a: T, b: T) => number;
};

// Edge options for weighted graphs
export type EdgeOptions<T> = {
    vertex1: WeightedGraphVertex<T>;
    vertex2: WeightedGraphVertex<T>;
    weight?: number;
};

// Search options for graph traversal
export type SearchOptions<T> = {
    startVertex: WeightedGraphVertex<T>;
    targetValue?: T | null;
    returnPath?: boolean;
}

// Options for graph traversal
export type TraverseOptions<T> = {
    startVertex: WeightedGraphVertex<T>;
    traversalType: "DFS" | "BFS";
};

// Options for creating a random graph
export type CreateRandomGraphOptions = GraphOptions<number> & {
    vertexCount: number;
    minEdges?: number;
    maxEdges?: number;
    minWeight?: number;
    maxWeight?: number;
};


// Options for adding edges to weighted graphs
export type WeightedAddEdgeOptions<T> = {
    vertex: WeightedGraphVertex<T>;
    weight: number;
    undirected?: boolean;
};

// Options for removing edges from weighted graphs
export type WeightedRemoveEdgeOptions<T> = {
    vertex: WeightedGraphVertex<T>;
    weight: number;
    undirected?: boolean;
};

// Options for setting edges in weighted graphs
export type WeightedSetEdgesOptions<T> = {
    edges: Array<{ vertex: WeightedGraphVertex<T>, weights: number[] }>;
    undirected?: boolean;
};

// Options for setting a single edge in weighted graphs
export type WeightedSetEdgeOptions<T> = {
    oldVertex: WeightedGraphVertex<T>;
    newVertex: WeightedGraphVertex<T>;
    weight: number;
    undirected?: boolean;
};
