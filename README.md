# lmdb-extend
A small utility to support extending the functionality of LMDB databases

# Installation

```bash
npm install lmdb-extend
```
# API

`functioon extend(db:lmdbDatabase, extensions:object) - returns db`

Extends an LMDB root database and any child databases it opens to have the `extensions`.

In order to support over-riding built-in behavior, if the extension is a function and the database already has a function with the same name, the extension will be called with the original function as the first argument already bound to the database instance. It is up to the developer to call the original function at the appropriate time if desired.

# Testing

Testing is conducted using `jest`.

File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
index.js |     100 |      100 |     100 |     100 |


# Release History (reverse chronological order)

2023-04-23 1.2.0 Makes environment database available to child databases through the property `envdb`.

2023-04-21 1.1.1 Ensure over-ride contexts are bound to the database.

2023-04-21 1.1.0 Added over-ride support for built-in functions.

2023-04-20 1.0.0 Initial release
