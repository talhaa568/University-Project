import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Disable unused React import for React 17+
      'react/react-in-jsx-scope': 'off',
      // Ignore unknown properties for Three.js-specific props in @react-three/fiber
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['attach', 'vertexShader', 'fragmentShader', 'uniforms', 'args'],
        },
      ],
      // You can also disable the unused variable rule globally if you prefer
      'no-unused-vars': 'warn', // Set to "off" if you prefer to ignore unused vars globally
    },
  },
]
