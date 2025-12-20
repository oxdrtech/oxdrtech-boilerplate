# oxdrtech-boilerplate

# Sobre

Esse projeto se trata de um padrao de codigo, servindo como base estrutural pra apartir dela desenvolver qualquer API que tenha integração com database. nessa base minima temos uma tabela de user, services de autenticação de usuario, integração com minio s3 para armazenamento de arquivos e jaegger para analize de desempenho de requisiçoes

---

API desenvolvida em **Node.js + Express + TypeScript** com suporte a **Docker** e variáveis de ambiente.

---

## 🚀 Desenvolvimento

### 1. Inicializar o projeto

```sh
npm init -y
```

### 2. Instalar dependências

```sh
# Dependências minimas
npm install express cors dotenv

# Dependências adicionais
npm install typeorm pg minio jsonwebtoken multer zod express-rate-limit argon2

# Dependências minimas
npm install --save-dev ts-node-dev tsconfig-paths typescript @types/node @types/cors @types/express

# Dependências adicionais
npm install --save-dev @types/multer @types/jsonwebtoken
```

### 3. Criar configuração TypeScript

```sh
npx tsc --init
```

---

## ⚙️ Configurações

### package.json

Subistitua o conteudo do script

```json
"scripts": {
  "dev": "ts-node-dev -r tsconfig-paths/register ./src/main.ts --env=development",
  "build": "tsc",
  "start": "node dist/main.js"
}
```

### .gitignore

```
dist
node_modules
.env
.gitkeep
```

### tsconfig.json

Esse exemplo de Json resolve alguns problemas de sintaxe typescript como erro de resposta de rota que podem ser null e problemas de ECMAscript

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "esnext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "libReplacement": true,                           /* Enable lib replacement. */
    "experimentalDecorators": true /* Enable experimental support for legacy experimental decorators. */,
    "emitDecoratorMetadata": true /* Emit design-type metadata for decorated declarations in source files. */,
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs" /* Specify what module code is generated. */,
    "rootDir": "./src" /* Specify the root folder within your source files. */,
    "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    "typeRoots": [
      "src/@types",
      "./node_modules/@types"
    ] /* Specify multiple folders that act like './node_modules/@types'. */,
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    // "removeComments": true,                           /* Disable emitting comments. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### .env.example

```dotenv
# PROJECT INFO
PROJECT_NAME=
PROJECT_DESCRIPTION=
PROJECT_OWNER=
PROJECT_BUILDER=https://github.com/oxdrtech
PROJECT_PORT=8080

# DB
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
DB_SYNCHRONIZE=true
DB_LOGGING=true
DB_MIGRATIONS_RUN=false

# MINIO
MINIO_SERVER_URL=http://localhost:9000
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_BUCKET=space-analyx-backend
MINIO_PORT=9000
MINIO_PORT_CONSOLE=9001
MINIO_USE_SSL=false

#JAEGER
JAEGER_COLLECTOR_OTLP_ENABLED=true
JAEGER_UI_PORT=16686
JAEGER_HTTP_COLLECTOR_PORT=14268
JAEGER_OTLP_GRPC_RECEIVER_PORT=4317
JAEGER_OTLP_HTTP_RECEIVER_PORT=4318
JAEGER_ENDPOINT=http://localhost:4318/api/traces
JAEGER_SERVICE_NAME=space-analyx-backend
JAEGER_SERVICE_VERSION=1.0.0

# JWT
JWT_SECRET=secretKeyDevelopment123
JWT_EXPIRES_IN=1d
JWT_RESET_EXPIRES_IN=15m
JWT_ISSUER=
JWT_AUDIENCE=users

# OTHERS

```

---

## 🐳 Docker

### Dockerfile

```Dockerfile
FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]

```

```yml
services:
  postgres:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: "${DB_USERNAME}"
      POSTGRES_PASSWORD: "${DB_PASSWORD}"
      POSTGRES_DB: "${DB_DATABASE}"
    ports:
      - "${DB_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  minio:
    image: minio/minio:latest
    restart: always
    environment:
      MINIO_ROOT_USER: "${MINIO_ROOT_USER:-minioadmin}"
      MINIO_ROOT_PASSWORD: "${MINIO_ROOT_PASSWORD:-minioadmin}"
    ports:
      - "${MINIO_PORT:-9000}:9000"
      - "${MINIO_PORT_CONSOLE:-9001}:9001"
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data

  jaeger:
    image: jaegertracing/all-in-one:latest
    restart: always
    environment:
      - COLLECTOR_OTLP_ENABLED=true
    ports:
      - "${JAEGER_UI_PORT:-16686}:16686" # Jaeger UI
      - "${JAEGER_HTTP_COLLECTOR_PORT:-14268}:14268" # Jaeger HTTP collector
      - "${JAEGER_OTLP_GRPC_RECEIVER_PORT:-4317}:4317" # OTLP gRPC receiver
      - "${JAEGER_OTLP_HTTP_RECEIVER_PORT:-4318}:4318" # OTLP HTTP receiver
    volumes:
      - jaeger_data:/badger

volumes:
  postgres_data:
  minio_data:
  jaeger_data:

```

### Comandos

```sh
# Build da imagem
docker build -t oxdrtech-boilerplate .

# Obs: é preciso rodar um syncronize no banco antes de rodar o script abaixo
# Rodar container
docker run -p 8080:8080 --env-file .env oxdrtech-boilerplate

# Outra alternativa é rodar todos os serviços dentro do docker-compose.yml e em seguida rodar o npm run dev (nesse cenario o primeiro npm run dev rodará o sync no banco caso DB_SYNCHRONIZE=true em .env )
```

---

## 📂 Estrutura inicial

Adicione todo os arquivos existentes no segundo commit, ou clone o repositorio completo.
o objetivo dele repositorio é servir de base estrutural pra qualquer tipo de api que tenha integração com banco de dados (auth e usuarios)

---

## ▶️ Executando

### Desenvolvimento

```sh
npm run dev
```

### Produção

```sh
npm run build
npm start
```
