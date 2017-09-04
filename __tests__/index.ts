import wrapper from '../src';

describe('yet another Lambda wrapper', () => {
    it('should throw exception without valid function', () => {
        expect(wrapper()).toThrow('Invalid argument');
    });

    it('should fail gracefully and call callback', () => {
        const err = new Error('An error occured');
        const fn = () => { throw err };
        const mock = jest.fn();

        wrapper(fn)({}, {}, mock);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toBeCalledWith(err, null);
    });

    it('should call callback on failure', () => {
        const err = new Error('It doesnt work');
        const fn = () => Promise.reject(err);
        const mock = jest.fn();

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(err, null);
    });

    it('should call callback on succes', () => {
        const fn = () => Promise.resolve('It works!');
        const mock = jest.fn();

        wrapper(fn)({}, {}, mock);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(null, 'It works!');
    });
});