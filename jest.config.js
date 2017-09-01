module.exports = {
    "moduleFileExtensions": [
        "ts",
        "js",
        "json"
    ],
    "testMatch": [
        "**/__tests__/**/*.(ts|js)",
        "**/?(*.)(spec|test).(ts|js)"
    ],
    "testPathIgnorePatterns": [
        "<rootDir>/(node_modules|dist)/"
    ],
    "transform": {
        ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "verbose": true
};