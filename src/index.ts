export default function callbackify(fn: () => Promise<any>) {
    return async (...args: any[]) => {
        const callback = args.pop();

        if ('function' !== typeof callback) {
            throw new TypeError('Callback is not a function');
        }

        try {
            const result = await fn(...args);
            return callback(null, result);
        } catch (error) {
            return callback(error, null);
        }
    };
}
