# lmdb-extend
A small utility to support extending the functionality of LMDB databases

# Installation

```bash
npm install lmdb-extend
```
# API

`functioon extend(db:lmdbDatabase, extensions:object) - returns db`

Extends an LMDB root database and any child databases it opens to have the `extensions`.

# Testing

Testing is conducted using `jest`.

File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
index.js |     100 |      100 |     100 |     100 |


# Release History (reverse chronological order)

2023-04-20 1.0.0 Initial release
