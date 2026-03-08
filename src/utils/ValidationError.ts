export class ValidationError extends Error {
    name: string;
    message: string;
    cause: Error | undefined;

    constructor({ message, cause }: {message: string; cause?: Error }) {
        super();
        this.name = 'ValidationError';
        this.message = message;
        this.cause = cause;
    }
}