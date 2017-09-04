export default function wrapper(fn: (event: any) => Promise) {
    return async (event: any, ctx: any, cb: AWSLambda.Callback) => {
        try {
            const result = await fn(event);
            return cb(undefined, result);
        } catch (error) {
            return cb(error, undefined);
        }
    };
}
