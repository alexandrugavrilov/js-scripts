var Result = { "win": 1, "loss": 2, "tie": 3 }

// Search in array for a key.
function search(nameKey, myArray){
	for (var i=0; i < myArray.length; i++) {
		if (myArray[i].key === nameKey) {
			return myArray[i];
		}
	}
}

// A poker hand object.
var PokerHand = function(hand) {
	this.rules = this.getRules();
	this.cards_colors = [];
	this.cards_numbers = [];

	var cards = hand.split(' ');
	for(var i=0; i< cards.length; i++){
		var t = cards[i].split('');
		this.cards_numbers.push( this.getCardIndex( t[0] ) );
		this.cards_colors.push( t[1] );
	}



}

// Define ruls, eg. full house, four of a kind...
PokerHand.prototype.getRules = function() {

	var pokerHand = this;
	var rules = [
		{
			key: 'four-of-a-kind',
			cb: function () {

				var pairs = pokerHand.getCardsPairs();
				var keys = Object.keys(pairs);
				if (keys.length == 2) {
					if (pairs[keys[0]] == 4 || pairs[keys[1]] == 4) return true;
				}
				return false;
			},
			index: 2
		},
		{
			key: 'full-house',
			cb: function () {

				var pairs = pokerHand.getCardsPairs();
				var keys = Object.keys(pairs);
				if (keys.length == 2) {
					return true;
				}
				return false;
			},
			index: 3
		},
		{
			key: 'flush',
			cb: function () {

				for (var i = 1; i < pokerHand.cards_colors.length; i++) {

					// Check if same colors.
					if (pokerHand.cards_colors[i] != pokerHand.cards_colors[i - 1]) {
						return false;
					}
				}
				return true;
			},
			index: 4
		},
		{
			key: 'straight',
			cb: function () {

				var sorted_numbers = pokerHand.cards_numbers.sort();
				for (var i = 1; i < sorted_numbers.length; i++) {

					// Check if seq order.
					// For J we check +2
					if (sorted_numbers[i] == 12) {
						if (sorted_numbers[i] != (sorted_numbers[i - 1] + 2)) {
							return false;
						}
					}
					else if (sorted_numbers[i] != (sorted_numbers[i - 1] + 1)) {
						return false;
					}
				}

				return true;
			},
			index: 5
		},
		{
			key: 'three-of-a-kind',
			cb: function () {

				var pairs = pokerHand.getCardsPairs();
				var keys = Object.keys(pairs);
				for (key in keys) {
					if (pairs[keys[key]] == 3) return true;
				}
				return false;

			},
			index: 6
		},
		{
			key: 'two-pair',
			cb: function () {

				var pairs = pokerHand.getCardsPairs();
				var keys = Object.keys(pairs);
				var count = 0;
				for (key in keys) {
					if (pairs[keys[key]] == 2) count++;
				}
				if (count == 2) return true;
				return false;

			},
			index: 7
		},
		{
			key: 'one-pair',
			cb: function () {

				var pairs = pokerHand.getCardsPairs();
				var keys = Object.keys(pairs);
				for (key in keys) {
					if (pairs[keys[key]] == 2) return true;
				}
				return false;

			},
			index: 8
		},
		{
			key: 'high-card',
			cb: function () {

				return true;

			},
			index: 8
		}
	];
	var flush = search('flush', rules);
	var straight = search('straight', rules);

    // Add the straight flush rule, which is a combination of flush and straig ruls.
	rules.unshift({
		key : 'straight-flush',
		cb: function(){
			// Check if same colors.
			if( flush.cb() && straight.cb() ){
				return true;
			}
			return false;

		},
		index: 1
	});

	return rules;
}
// Get a poker hand pairs.
PokerHand.prototype.getCardsPairs = function(){
	var pairs = {};
	for(var i=0; i< this.cards_numbers.length; i++) {
		var count = pairs[ this.cards_numbers[i] ];
		if( typeof count == 'undefined'){
			pairs[ this.cards_numbers[i] ] = 1;
		}
		else{
			pairs[ this.cards_numbers[i] ]++;
		}
	}

	return pairs;
}
// Will return [card rule index, highest card val]
PokerHand.prototype.getValue = function(){
	var index = 0;
	for( rule in this.rules ){
		if( this.rules[rule].cb()){
			index = this.rules[rule].index;
			break;
		}
	}

	var highest = this.getHighestCard();

	return [index, highest];
}
// todo: the highest card between 2 hands is calculated differently.
PokerHand.prototype.getHighestCard = function(){
	var sorted_numbers = this.cards_numbers.sort(function(a,b){
		return a > b;
	});
	return sorted_numbers.slice(-1)[0];
}

// Transform letter card in to numeric index.
PokerHand.prototype.getCardIndex = function(card){
	switch(card){
		case 'T': return 10;
		case 'J': return 12;
		case 'Q': return 13;
		case 'K': return 14;
		case 'A': return 15;
		default: return parseInt(card);
	}
}

// Compares 2 card hands.
// @returns Result
PokerHand.prototype.compareWith = function(hand){

	var p = this.getValue();
	var o = hand.getValue();

	if( p[0] < o[0] ){
		return Result.win;
	}
	else if( p[0] > o[0] ){
		return Result.loss;
	}
    // If we have tie, check the highest card.
	else if( p[0] == o[0] ){
		if( p[1] > o[1]){
			return Result.win;
		}
		else if( p[1] < o[1]){
			return Result.loss;
		}
		else{
			return Result.tie;
		}
	}
	return Result.tie;
}
