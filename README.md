# Helper JS Objects

## Calculator

A simple calculator for a given string. Parses string based on priority: first the parentheses, then * and /, then + and -.
Only accepts the following math operators: *, /, -, +

``` JavaScript
var calculator = new Calculator();
calculator.calc("( 1 * 2 + 3 + 4 / ( 1 + 3 ) ) * 2 / 1 + 2 * ( 1 + 1 )")
```
