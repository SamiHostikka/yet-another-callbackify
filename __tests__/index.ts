import callbackify from '../src';

describe('Yet another callbackify', () => {
    it('should fail without callback', async () => {
        try {
            await callbackify()();
        } catch (error) {
            expect(error.message).toBe('Callback is not a function');
        }
    });

    it('should fail gracefully and call callback', () => {
        const err = new Error('An error occured');
        const fn = () => { throw err };
        const callback = jest.fn();

        callbackify(fn)(callback);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toBeCalledWith(err, null);
    });

    it('should call function with right arguments', done => {
        const mock = jest.fn(() => Promise.resolve());
        const callback = () => {
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith('event', 'context');

            done();
        };

        callbackify(mock)('event', 'context', callback);
    });

    it('should call callback on failure', done => {
        const err = new Error('It doesnt work');
        const fn = () => Promise.reject(err);

        const callback = (error, result) => {
            expect(error).toBe(err);
            expect(result).toBe(null);

            done();
        };

        callbackify(fn)('event', callback);
    });

    it('should call callback on succes', done => {
        const fn = () => Promise.resolve('It works!');
        const callback = (error, result) => {
            expect(error).toBe(null);
            expect(result).toBe('It works!');

            done();
        };

        callbackify(fn)('event', 'context', callback);
    });
});