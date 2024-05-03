import { defaults as tsjPreset } from 'ts-jest/presets'
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  ...tsjPreset,
  preset: 'react-native',
  // setupFiles: ['<rootDir>/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/setup.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|@react-native(-community)?|react-clone-referenced-element|@rneui|expo-modules-core/*|@expo/*|expo(.*)/*|expo-location)',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@_components/(.*)$': '<rootDir>/src/components/$1',
    '^@_types/(.*)$': '<rootDir>/src/types/$1',
    '^@_services/(.*)$': '<rootDir>/src/services/$1',
    '^@_3Rpages/(.*)$': [
      '<rootDir>/src/components/RandomRestaurantRecommendation/pages/$1',
    ],
  },
}

export default jestConfig
