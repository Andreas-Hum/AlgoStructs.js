import { add } from '../src/index';
import * as fc from 'fast-check';

describe('add', () => {
    it('should add two numbers correctly', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (a, b) => {
                expect(add(a, b)).toBe(a + b);
            })
        );
    });
});