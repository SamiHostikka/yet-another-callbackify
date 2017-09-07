export default function callbackify(fn: (event: any) => Promise<any>) {
    return async (...args: any[]) => {
        const callback = args.pop();

        if ('function' !== typeof callback) {
            throw new TypeError('Callback is not a function');
        }

        try {
            const result = await fn.apply(void 0, args);
            return callback(null, result);
        } catch (error) {
            return callback(error, null);
        }
    };
}
