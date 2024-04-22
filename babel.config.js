module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    'babel-preset-expo',
    'module:metro-react-native-babel-preset',
  ],
  plugins: [['module:react-native-dotenv']],
}
