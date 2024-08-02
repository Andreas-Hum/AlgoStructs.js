# AlgoStructs.ts: Data Structures and Algorithms

This repository contains implementations of various data structures and algorithms in TypeScript. It is intended to be used as a library for beginners to see how data structures and common algorithms are implemented. The project is organized into different categories for ease of navigation.

## Table of Contents

- [Data Structures](#data-structures)
  - [Binary Trees](#binary-trees)
    - [BinaryTree](#binarytree)
    - [BinarySearchTree](#binarysearchtree)
  - [Graphs](#graphs)
    - [Adjacency List](#adjacency-list)
    - [Adjacency Matrix](#adjacency-matrix)
    - [Vertex Graph](#vertex-graph)
  - [Lists](#lists)
    - [Doubly Linked Lists](#doubly-linked-lists)
    - [Singly Linked Lists](#singly-linked-lists)
  - [Queues](#queues)
    - [Queue](#queue)
  - [Stacks](#stacks)
    - [Stack](#stack)
  - [Tables](#tables)
    - [Hash Tables](#hash-tables)
- [Algorithms](#algorithms)
  - [Divisor](#divisor)
    - [Greatest Common Divisor](#greatest-common-divisor)
    - [Least Common Multiple](#least-common-multiple)
  - [Fibonacci](#fibonacci)
    - [FastFibonacci](#fastfibonacci)
    - [Fibonacci](#fibonacci-1)
  - [Primes](#primes)
    - [Miller-Rabin Primality Test](#miller-rabin-primality-test)
    - [Sieve of Atkin](#sieve-of-atkin)
    - [Sieve of Eratosthenes](#sieve-of-eratosthenes)
  - [Search](#search)
    - [Binary Search](#binary-search)
    - [Exponential Search](#exponential-search)
    - [Interpolation Search](#interpolation-search)
    - [Jump Search](#jump-search)
    - [Linear Search](#linear-search)
    - [Meta Binary Search](#meta-binary-search)
    - [Ternary Search](#ternary-search)
- [Getting Started](#getting-started)
- [Contact](#contact)
- [License](#license)

## Data Structures

### [Binary Trees](https://en.wikipedia.org/wiki/Binary_search_tree)

- **[BinaryTree](src/DataStructures/BinaryTree.ts)**: A binary tree implementation. Binary trees are hierarchical data structures in which each node has at most two children, referred to as the left child and the right child.
- **[BinarySearchTree](src/DataStructures/BinarySearchTree.ts)**: A binary search tree implementation. Binary search trees are used to maintain a sorted order of elements, allowing for efficient insertion, deletion, and lookup operations.
### [Graphs](https://en.wikipedia.org/wiki/Graph_(abstract_data_type))
- [**Adjacency List**](https://en.wikipedia.org/wiki/Adjacency_list)
  - **[UnweightedGraph](src/DataStructures/Graphs/AdjacencyListGraph/UnweightedGraph.ts)**: A graph data structure with support for unweighted edges. Uses an adjacency list to represent the graph.
  - **[WeightedGraph](src/DataStructures/Graphs/AdjacencyListGraph/WeightedGraph.ts)**: A graph data structure with support for weighted edges. Uses an adjacency list to represent the graph.
- [**Adjacency Matrix**](https://en.wikipedia.org/wiki/Adjacency_matrix)
  - **[UnweightedGraph](src/DataStructures/Graphs/AdjacencyMatrixGraph/UnweightedGraph.ts)**: A graph data structure with support for unweighted edges. Uses an adjacency matrix to represent the graph.
  - **[WeightedGraph](src/DataStructures/Graphs/AdjacencyMatrixGraph/WeightedGraph.ts)**: A graph data structure with support for weighted edges. Uses an adjacency matrix to represent the graph.
- [**Vertex Graph**](https://en.wikipedia.org/wiki/Vertex_(graph_theory))
  - **[UnweightedGraph](src/DataStructures/Graphs/VertexClassGraph/UnweightedGraph.ts)**: A graph data structure with support for unweighted edges. Uses a vertex class to represent the graph.
  - **[WeightedGraph](src/DataStructures/Graphs/VertexClassGraph/WeightedGraph.ts)**: A graph data structure with support for weighted edges. Uses a vertex class to represent the graph.
### [Lists](https://en.wikipedia.org/wiki/List_(abstract_data_type))
- #### [Doubly Linked Lists](https://en.wikipedia.org/wiki/Doubly_linked_list)
  - **[DoublyLinkedList](src/DataStructures/Lists/DoublyLinkedList.ts)**: A doubly linked list implementation. Doubly linked lists are used to store a collection of elements where each element points to both its previous and next element, allowing for efficient bidirectional traversal.
- #### [Singly Linked Lists](https://en.wikipedia.org/wiki/Linked_list)
  - **[SinglyLinkedList](src/DataStructures/Lists/SinglyLinkedList.ts)**: A singly linked list implementation. Singly linked lists are used to store a collection of elements where each element points to the next element, allowing for efficient unidirectional traversal.
###  [Queues](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))
- **[Queue](src/DataStructures/Queues/Queue.ts)**: A generic queue class implemented using an array. Queues follow the First-In-First-Out (FIFO) principle, where elements are added to the back and removed from the front.
### [Stacks](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
- **[Stack](src/DataStructures/Stacks/Stack.ts)**: A generic stack class implemented using an array. Stacks follow the Last-In-First-Out (LIFO) principle, where elements are added and removed from the top.
### [Tables](https://en.wikipedia.org/wiki/Table_(information))
- #### [Hash Tables](https://en.wikipedia.org/wiki/Hash_table)
  - **[HashTable](src/DataStructures/HashTable.ts)**: A generic hash table implementation. Hash tables are used to store key-value pairs and provide efficient data retrieval. This implementation uses open addressing and linked lists to handle collisions.

## Algorithms

### Divisor
- [Greatest Common Divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor)
  - **[GreatestCommonDivisor](src/Algorithms/Divisor/GreatestCommonDivisor.ts)**: Implementation of the greatest common divisor algorithm. This algorithm finds the largest positive integer that divides two numbers without leaving a remainder.
- [Least Common Multiple](https://en.wikipedia.org/wiki/Least_common_multiple)
  - **[LeastCommonDivisor](src/Algorithms/Divisor/LeastCommonDivisor.ts)**: Implementation of the least common divisor algorithm. This algorithm finds the smallest positive integer that is a multiple of two numbers.

### Fibonacci [Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_number)

- **[FastFibonacci](src/Algorithms/Fibonacci/FastFibonacci.ts)**: An optimized implementation of the Fibonacci sequence. This implementation uses memoization to improve performance.
- **[Fibonacci](src/Algorithms/Fibonacci/Fibonacci.ts)**: A basic implementation of the Fibonacci sequence. This implementation uses a simple recursive approach.

### Primes
- [Miller-Rabin Primality Test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test)
  - **[MillerRabin](src/Algorithms/Primes/MillerRabin.ts)**: Implementation of the Miller-Rabin primality test. This algorithm is used to determine if a number is a probable prime.
- [Sieve of Atkin](https://en.wikipedia.org/wiki/Sieve_of_Atkin)
  - **[SieveOfAtkin](src/Algorithms/Primes/SieveOfAtkin.ts)**: Implementation of the Sieve of Atkin algorithm. This algorithm is used to find all prime numbers up to a specified integer.
- [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
  - **[SieveOfEratosthenes](src/Algorithms/Primes/SieveOfEratosthenes.ts)**: Implementation of the Sieve of Eratosthenes algorithm. This algorithm is used to find all prime numbers up to a specified integer.

### Search
- [Binary Search](https://en.wikipedia.org/wiki/Binary_search_algorithm)
  - **[BinarySearch](src/Algorithms/Search/BinarySearch.ts)**: Implementation of the binary search algorithm. This algorithm finds the position of a target value within a sorted array.
- [Exponential Search](https://en.wikipedia.org/wiki/Exponential_search)
  - **[ExponentialSearch](src/Algorithms/Search/ExponentialSearch.ts)**: Implementation of the exponential search algorithm. This algorithm finds the range where the target value may exist and then performs a binary search within that range.
- [Interpolation Search](https://en.wikipedia.org/wiki/Interpolation_search)
  - **[InterpolationSearch](src/Algorithms/Search/InterpolationSearch.ts)**: Implementation of the interpolation search algorithm. This algorithm is an improved variant of binary search for uniformly distributed data.
- [Jump Search](https://en.wikipedia.org/wiki/Jump_search)
  - **[JumpSearch](src/Algorithms/Search/JumpSearch.ts)**: Implementation of the jump search algorithm. This algorithm divides the array into blocks and performs a linear search within the block where the target value may exist.
- [Linear Search](https://en.wikipedia.org/wiki/Linear_search)
  - **[LinearSearch](src/Algorithms/Search/LinearSearch.ts)**: Implementation of the linear search algorithm. This algorithm sequentially checks each element of the array until the target value is found.
- [Meta Binary Search](https://en.wikipedia.org/wiki/Binary_search_algorithm#Meta_binary_search)
  - **[MetaBinarySearch](src/Algorithms/Search/MetaBinarySearch.ts)**: Implementation of the meta binary search algorithm. This algorithm is a variant of binary search that uses a different approach to divide the search space.
- [Ternary Search](https://en.wikipedia.org/wiki/Ternary_search)
  - **[TernarySearch](src/Algorithms/Search/TernarySearch.ts)**: Implementation of the ternary search algorithm. This algorithm divides the array into three parts and recursively searches in the relevant part.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```sh
git clone https://github.com/Andreas-Hum/AlgoStructs.ts
cd datastructures
npm install
```

## Contact

I am a computer science student from Aalborg University. You can contact me at [Andreas@hummelmose.dk](mailto:Andreas@hummelmose.dk).

## Feel Free to Contribute

If you have any suggestions, ideas, or improvements, please feel free to reach out or submit a pull request.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software.