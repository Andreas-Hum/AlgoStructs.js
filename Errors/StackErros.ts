export { InvalidStackSizeError, StackOverflowError, StackUnderflowError,InvalidAmountToPopError }


class InvalidStackSizeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidStackSizeError";
    }
}


class StackOverflowError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StackOverflowError";
    }
}


class StackUnderflowError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StackUnderflowError";
    }
}

class InvalidAmountToPopError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidAmountToPopError";
    }
}
