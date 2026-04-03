import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  ...compat.config({
    env: {
      node: true,
      es2021: true,
    },
    extends: [
      'standard',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    ignorePatterns: [
      'dist',
      'public',
      'node_modules',
      'package-lock.json',
      'package.json',
      'README.md',
      '.gitignore',
    ],
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          project: './tsconfig.eslint.json',
          tsconfigRootDir: __dirname,
        },
        plugins: ['@typescript-eslint'],
        rules: {},
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      eqeqeq: 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-useless-constructor': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {},
  }),
]