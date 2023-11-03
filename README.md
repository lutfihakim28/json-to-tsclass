# json-to-tsclass

This is class generator from plain JSON data, it uses [class-transformer](https://github.com/typestack/class-transformer). You can try the demo [here](https://json-to-tsclass.netlify.app).

## About Current Version

This is verision `1.2.0`. In this version you can convert a plain JSON into a typescript class that uses [class-transformer](https://github.com/typestack/class-transformer) for decorator. All feture in this version includes:

- [FIX] Download all issue in production. In the previous version, `Download All` feature got error inside the library. I found the solution to this problem from [here](https://github.com/Stuk/jszip/issues/890#issuecomment-1554749244).
- [UPDATE] UI Improvement on the result field. I use [vue-codemirror](https://github.com/surmon-china/vue-codemirror) in both `JSON` editor and now the result.
- [ADD] import required classes when the class have nested property that refer to another class.

## Changelog

### V1.1

- [FIX] Error naming class and property. In previous version when you have `snake_case_key` it would be converted to `snakeCase`, it is fixed now and will be converted to `snakeCaseKey`
- [UPDATE] UI Improvement. I just added a container on a result side.
- [ADD] Tupple type when data contains array of multiple element type. Example:

    ```json
    {
        "data": ['string', 1234, false, null]
    }
    ```

    It would be converted to:

    ```typescript
    @Expose({ name: 'data' })
    data: [string, number, boolean, any]
    ```

### V1.0

- Initialize Project
- Convert JSON to `typescript` class
- Copy a class into clipboard
- Download single result as `.ts` file
- Download all generated results contains `.ts` file that compressed into `.zip`. I am using [JSZIP](https://github.com/Stuk/jszip) library for this feature.

## Incoming Feature

- Implement plain `typescript` class alongside with `class-transformer`
- Compatibility with [openapis](https://www.openapis.org/) standard
- Compatibility with `json-schema`

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
