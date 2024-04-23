module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    // 'babel-preset-expo',
    'module:metro-react-native-babel-preset',
    // '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
  ],
}
