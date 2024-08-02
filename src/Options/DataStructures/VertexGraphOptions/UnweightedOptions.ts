import UnweightedGraphVertex from "../../../DataStructures/Graphs/Vertices/UnweightedGraphVertex";

// General graph options
export type GraphOptions<T> = {
    isUndirected?: boolean;
    compare: (a: T, b: T) => number;
};

// Edge options for unweighted graphs
export type EdgeOptions<T> = {
    vertex1: UnweightedGraphVertex<T>;
    vertex2: UnweightedGraphVertex<T>;
};

// Search options for graph traversal
export type SearchOptions<T> = {
    startVertex: UnweightedGraphVertex<T>;
    targetValue?: T | null;
    returnPath?: boolean;
}

// Options for graph traversal
export type TraverseOptions<T> = {
    startVertex: UnweightedGraphVertex<T>;
    traversalType: "DFS" | "BFS";
};

// Options for creating a random graph
export type CreateRandomGraphOptions = GraphOptions<number> & {
    vertexCount: number;
    minEdges?: number;
    maxEdges?: number;
};

// Options for adding edges to unweighted graphs
export type UnweightedAddEdgeOptions<T> = {
    vertex: UnweightedGraphVertex<T>;
    undirected?: boolean;
};

// Options for removing edges from unweighted graphs
export type UnweightedRemoveEdgeOptions<T> = {
    vertex: UnweightedGraphVertex<T>;
    undirected?: boolean;
};

// Options for setting edges in unweighted graphs
export type UnweightedSetEdgesOptions<T> = {
    edges: Array<UnweightedGraphVertex<T>>;
    undirected?: boolean;
};

// Options for setting a single edge in unweighted graphs
export type UnweightedSetEdgeOptions<T> = {
    oldVertex: UnweightedGraphVertex<T>;
    newVertex: UnweightedGraphVertex<T>;
    undirected?: boolean;
};

