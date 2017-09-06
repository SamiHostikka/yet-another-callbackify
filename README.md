# Yet another callbackify

*It's probably good idea to check Node util.callbackify or Bluebird.asCallback instead of using this*

Are you tired of using old fashioned callbacks? Callbackify saves your code as it converts your promises to callbacks

## Usage

```javascript
exports.handler = callbackify(event => {
    return Promise.resolve('Hello world');
});

// This is more or less same using callbacks
exports.handler = (event, context, callback) => {
    callback(null, 'Hello world');
};
```

## API

```typescript
callbackify(fn: Function): Function
callbackify(args: any[], fn: Function): Function
```