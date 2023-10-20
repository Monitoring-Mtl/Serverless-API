import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        // Add any necessary module aliases here
    },
    testPathIgnorePatterns: ['/node_modules/', '/.build/', '/dist/'], // Ignore .build and dist folders
    // Add any other Jest configuration options you need
    testMatch: ['<rootDir>/tests/**/*.ts'], // Use 'tests' folder for test files
    // Add any other Jest configuration options you need
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: 'docs/coverage',
};

export default config;
