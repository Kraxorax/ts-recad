import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
  },
  // setupFilesAfterEnv: ['<rootDir>/tests/setupDom.ts'],
  testMatch: ['**/?(*.)+(spec|test).ts']
};

export default config;
