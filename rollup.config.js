import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default [
  // Main SDK bundle
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      'react/jsx-runtime'
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        clean: true,
      }),
    ],
  },
  // React Components bundle
  {
    input: 'src/react/index.ts',
    output: [
      {
        file: 'dist/react/index.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        inlineDynamicImports: true,
      },
      {
        file: 'dist/react/index.esm.js',
        format: 'esm',
        exports: 'named',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    external: [
      'react',
      'react/jsx-runtime',
      'react-dom'
    ],
    plugins: [
      nodeResolve({
        browser: true,
        preferBuiltins: false,
        // Resolve non-React dependencies only
        exclude: ['react', 'react-dom', 'react/jsx-runtime']
      }),
      commonjs({
        // Transform non-React dependencies only
        ignore: ['react', 'react-dom', 'react/jsx-runtime']
      }),
      postcss({
        extract: false,
        inject: true,
        minimize: true,
      }),
      typescript({
        typescript: require('typescript'),
        useTsconfigDeclarationDir: true,
      }),
    ],
  }
];
