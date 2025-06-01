module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'dist', 'public', 'node_modules',
    'package-lock.json', 'package.json',
    'README.md', '.gitignore',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json', // opcional
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
      rules: {}
    },
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'off',  
    'eqeqeq': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-useless-constructor': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {}
}
