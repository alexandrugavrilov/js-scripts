# Helper JS Objects
a collection of JS scripts

- [Bowling score calculator](#bowling-score-calculator)
- [Poker highest hand](#poker-highest-hand)
- [Calculator](#calculator)
- [Tree longest zig zag](#tree-longest-zig-zag)

## Bowling score calculator

A class that calculates the score of a bowling game.

``` JavaScript
var bowling = new Bowling();
bowling.calcScore( 'X' );
bowling.calcScore( '0' );
bowling.calcScore( '7' );
bowling.calcScore( '1' );
bowling.calcScore( '/' );
```

tests
``` JavaScript
bowlingScore('02 10 12 01 53 90 09 X 9/ XXX'); //103
bowlingScore('11 11 11 11 11 11 11 11 11 11');
bowlingScore('X X X X X X X X X XXX');
bowlingScore('90 X 7/ 72 X 5/ 41 4/ 18 XXX');
```

## Poker highest hand

A class that calculates the highest poker hand

``` JavaScript
function assert(expected, player, opponent){
	var p = new PokerHand(player);
	var o = new PokerHand(opponent);
	p.compareWith(o) == expected;
}

assert(Result.loss, "4S 5H 6H TS AC", "3S 5H 6H TS AC")
```

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
