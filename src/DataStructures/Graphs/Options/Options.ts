import WeightedGraphVertex from "../Vertices/WeightedGraphVertex";
import UnweightedGraphVertex from "../Vertices/UnweightedGraphVertex";


// General graph options
export type GraphOptions<T> = {
    isWeighted?: boolean;
    isUndirected?: boolean;
    compare: (a: T, b: T) => number;
};

// Edge options for weighted graphs
export type EdgeOptions<T> = {
    vertex1: WeightedGraphVertex<T> | UnweightedGraphVertex<T>;
    vertex2: WeightedGraphVertex<T> | UnweightedGraphVertex<T>;
    weight?: number;
};

// Search options for graph traversal
export type SearchOptions<T, VertexType> = {
    startVertex: VertexType;
    targetValue?: T | null;
    returnPath?: boolean;
}


// Options for graph traversal
export type TraverseOptions<T> = {
    startVertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>;
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
