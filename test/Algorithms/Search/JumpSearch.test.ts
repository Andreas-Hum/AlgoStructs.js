// JumpSearch.test.ts
import { jumpSearch } from "../../../src/Algorithms/Search";
import SearchOptions from "../../../src/Options/AlgorithmOptions/SearchOptions/SearchOptions";
import * as fc from "fast-check";

describe("jumpSearch", () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    it("should return the correct index for a target element in a sorted number array", () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer(), { minLength: 1, maxLength: 100 }).map(arr => arr.sort((a, b) => a - b)),
                fc.integer(),
                (numbers, targetNumber) => {
                    const options: SearchOptions<number> = {
                        array: numbers,
                        target: targetNumber,
                        compare: (a, b) => a - b
                    };
                    const index: number = jumpSearch(options);
                    if (index !== -1) {
                        return numbers[index] === targetNumber;
                    } else {
                        return !numbers.includes(targetNumber);
                    }
                }
            ),
        );
    });

    it("should return -1 if the target element is not found in a sorted number array", () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer(), { minLength: 1, maxLength: 100 }).map(arr => arr.sort((a, b) => a - b)),
                fc.integer(),
                (numbers, targetNumber) => {
                    // Ensure target is not in the array
                    numbers = numbers.filter(num => num !== targetNumber);
                    const options: SearchOptions<number> = {
                        array: numbers,
                        target: targetNumber,
                        compare: (a, b) => a - b
                    };
                    const index: number = jumpSearch(options);
                    return index === -1;
                }
            ),
        );
    });

    it("should return the correct index for a target element in a sorted string array", () => {
        fc.assert(
            fc.property(
                fc.array(fc.string(), { minLength: 1, maxLength: 100 })
                    .map(arr => arr.filter(str => str !== "").sort((a, b) => a.localeCompare(b))),
                fc.string(),
                (strings, targetString) => {
                    if (strings.length === 0 || targetString === "") {
                        return true; // Skip empty cases
                    }
                    const options: SearchOptions<string> = {
                        array: strings,
                        target: targetString,
                        compare: (a, b) => a.localeCompare(b)
                    };
                    const index: number = jumpSearch(options);
                    if (index !== -1) {
                        return strings[index] === targetString;
                    } else {
                        return !strings.includes(targetString);
                    }
                }
            ),
        );
    });

    it("should return -1 if the target element is not found in a sorted string array", () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 1, maxLength: 100 })
                    .map(arr => arr.filter(str => str !== "").sort((a, b) => a.localeCompare(b))),
                fc.string({ minLength: 11 }),
                (strings, targetString) => {
                    // Ensure target is not in the array
                    strings = strings.filter(str => str !== targetString);
                    const options: SearchOptions<string> = {
                        array: strings,
                        target: targetString,
                        compare: (a, b) => a.localeCompare(b)
                    };
                    const index: number = jumpSearch(options);
                    return index === -1;
                }
            ),
        );
    });

    it("should return the correct index for a target element in a sorted array of custom objects", () => {
        interface Person {
            name: string;
            age: number;
        }

        fc.assert(
            fc.property(
                fc.array(
                    fc.record({
                        name: fc.string(),
                        age: fc.integer()
                    }),
                    { minLength: 1, maxLength: 100 }
                ).map(arr => arr.sort((a, b) => a.age - b.age)),
                fc.record({
                    name: fc.string(),
                    age: fc.integer()
                }),
                (people, targetPerson) => {
                    const options: SearchOptions<Person> = {
                        array: people,
                        target: targetPerson,
                        compare: (a, b) => a.age - b.age
                    };
                    const index: number = jumpSearch(options);
                    if (index !== -1) {
                        return people[index].age === targetPerson.age;
                    } else {
                        return !people.some(person => person.age === targetPerson.age);
                    }
                }
            ),
        );
    });

    it("should return -1 if the target element is not found in a sorted array of custom objects", () => {
        interface Person {
            name: string;
            age: number;
        }

        fc.assert(
            fc.property(
                fc.array(
                    fc.record({
                        name: fc.string(),
                        age: fc.integer()
                    }),
                    { minLength: 1, maxLength: 100 }
                ).map(arr => arr.sort((a, b) => a.age - b.age)),
                fc.record({
                    name: fc.string(),
                    age: fc.integer().filter(age => age < -1000 || age > 1000) // Ensure target is outside typical range
                }),
                (people, targetPerson) => {
                    // Ensure target is not in the array
                    people = people.filter(person => person.age !== targetPerson.age);
                    const options: SearchOptions<Person> = {
                        array: people,
                        target: targetPerson,
                        compare: (a, b) => a.age - b.age
                    };
                    const index: number = jumpSearch(options);
                    return index === -1;
                }
            ),
        );
    });
});