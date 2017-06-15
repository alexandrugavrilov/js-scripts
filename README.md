# Helper JS Objects

## Calculator

A simple calculator for a given string. Parses string based on priority: first the parentheses, then * and /, then + and -.
Only accepts the following math operators: *, /, -, +

``` JavaScript
var calculator = new Calculator();
calculator.calc("( 1 * 2 + 3 + 4 / ( 1 + 3 ) ) * 2 / 1 + 2 * ( 1 + 1 )")
```

### Tree longest zig zag

It assumes we receive a tree object of the following form

``` JavaScript
var tree_object = {
  x: 15,
  l: {
    x: 44,
    l: null,
    r: { x: 55, l: null, r: null} 
  },
  r: { x: 66, l: null, r: null}
}
```

``` JavaScript
var tree = new Tree();
var longest_zigzag = tree.calc_longest_zigzag( tree_object );
```

[![Book session on Codementor](https://cdn.codementor.io/badges/book_session_github.svg)](https://www.codementor.io/alexandrugavrilov?utm_source=github&utm_medium=button&utm_term=alexandrugavrilov&utm_campaign=github)
