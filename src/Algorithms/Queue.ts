export class Queue<T> {
    private items: T[] = [];

    public enqueue(...element: T[]): void {
        this.items.push(...element);
    }

    public dequeue(): T | undefined {
        return this.items.shift();
    }

    public front(): T | undefined {
        return this.items[0];
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    public size(): number {
        return this.items.length;
    }

    public clear(): void {
        this.items = [];
    }
}