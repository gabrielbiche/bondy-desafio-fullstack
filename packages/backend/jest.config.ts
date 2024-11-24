export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@graphql/(.*)': '<rootDir>/src/graphql/$1',
    '@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@migrations/(.*)': '<rootDir>/src/migrations/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
  },
}
