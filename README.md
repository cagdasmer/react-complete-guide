# react-typescript-hooks

<h2> References for project setup. ( TypeScript, ESLint, Prettier ) </h2>

<a href="https://www.typescriptlang.org/#download-links">Installing TypeScript</a><br/>

<a href="https://create-react-app.dev/docs/adding-typescript/">React with TypeScript</a><br/>

<a href="https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project ">ESLint & Prettier support</a><br/>

<p>TypeScript configuration</p>

  ```json - .tsconfig
          {
            "compilerOptions": {
              "target": "es5",
              "lib": [
                "dom",
                "dom.iterable",
                "esnext"
              ],
              "allowJs": true,
              "skipLibCheck": true,
              "esModuleInterop": true,
              "allowSyntheticDefaultImports": true,
              "strict": true,
              "forceConsistentCasingInFileNames": true,
              "module": "esnext",
              "moduleResolution": "node",
              "resolveJsonModule": true,
              "isolatedModules": true,
              "noEmit": true,
              "jsx": "preserve"
            },
            "include": [
              "src"
            ]
          }
  ```