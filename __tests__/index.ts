import wrapper from '../src';

describe('yet another Lambda wrapper', () => {
    it('should fail gracefully and call callback', () => {
        const err = new Error('An error occured');
        const fn = () => { throw err };
        const callback = jest.fn();

        wrapper(fn)({}, {}, callback);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toBeCalledWith(err, undefined);
    });

    it('should call callback on failure', done => {
        const err = new Error('It doesnt work');
        const fn = () => Promise.reject(err);

        const callback = (error, result) => {
            expect(error).toBe(err);
            expect(result).toBe(undefined);

            done();
        }

        wrapper(fn)({}, {}, callback);
    });

    it('should call callback on succes', done => {
        const fn = () => Promise.resolve('It works!');
        const callback = (error, result) => {
            expect(error).toBe(undefined);
            expect(result).toBe('It works!');

            done();
        }

        wrapper(fn)({}, {}, callback);
    });
});