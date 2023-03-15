/* eslint-disable */
export default {
  displayName: 'react-hooks',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/react/hooks',

  /**
   * Add jest matchers from @testing-library/jest-dom.
   *
   * @see {@link https://jestjs.io/docs/configuration#setupfilesafterenv-array}
   * @see tsconfig.spec.json
   */
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
