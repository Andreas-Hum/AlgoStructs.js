export { InvalidQueueSizeError, QueueOverflowError,QueueUnderflowError,InvalidAmountToDeQueueError }


class InvalidQueueSizeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidQueueSizeError";
    }
}

class QueueOverflowError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "QueueOverflowError";
    }
}


class QueueUnderflowError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "QueueUnderflowError";
    }
}

class InvalidAmountToDeQueueError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidAmountToDeQueueError";
    }
}
