# MapGenerator

## Installation
Run
```
npm install
```

## Start develop server
Run
```
npm run start
```
## Run tests
Run
```
npm run test
```
## Show coverage
Run
```
npm run coverage
```
Example:
```
λ npm run coverage

> mapgenerator@1.0.0 coverage C:\Users\user\src\MapGenerator
> nyc npm run test


> mapgenerator@1.0.0 test C:\Users\user\src\MapGenerator
> jasmine --config=jasmine.json

Randomized with seed 08855
Started
..


2 specs, 0 failures
Finished in 0.313 seconds
Randomized with seed 08855 (jasmine --random=true --seed=08855)
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   37.04 |        0 |   33.33 |   34.78 |
 noise.js |     100 |      100 |     100 |     100 |
 utils.js |   10.53 |        0 |      20 |   11.76 | 10-53
----------|---------|----------|---------|---------|-------------------
```