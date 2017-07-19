var Bowling = function(){};
Bowling.prototype.score = 0;
Bowling.prototype.beforeRoll = 0;
Bowling.prototype.anteBeforeRoll = 0;
Bowling.prototype.frame = [];
Bowling.prototype.indexFrame = 0;
Bowling.prototype.indexRoll = 0;

Bowling.prototype.calcScore = function(roll){

	// Check if second roll and not 10 pins down
	// and add to total.
	if( this.indexRoll == 1 && roll != '/' ) {
		var val = this.beforeRoll == 'X' ? 10 : parseInt(this.beforeRoll);
		this.score += val + parseInt(roll);
	}

	// Check if we had a strike, and now we hit all
	// and add to score.
	if( this.beforeRoll == 'X' && roll == '/'){
		this.score += 10 + 10;
	}

	// Check if we had a strike and we dont hit all.
	if( this.beforeRoll != 'X' && this.anteBeforeRoll == 'X'  ){
		var val = roll == '/' ? 10 : (parseInt(this.beforeRoll) + parseInt(roll));
		this.score += 10 + val;
	}
	// Check if we had 2 strikes
	if( this.beforeRoll == 'X' && this.anteBeforeRoll == 'X'  ){
		// Check if we have 3 strikes.
		if( roll == 'X'  ){
			this.score += 10 + 10 + 10;
		}
		// We had 2 strikes and another roll.
		else{
			this.score += 10 + 10 + parseInt(roll);
		}

	}
	// Check if we hit all in previous frame.
	if( this.beforeRoll == '/'  ) {
		var val = roll == 'X' ? 10 : parseInt(roll);
		this.score += 10 + parseInt(val);
	}


	// Set before rolls.
	this.anteBeforeRoll = this.beforeRoll;
	this.beforeRoll = roll;
	// Calc current roll and frame.
	if( roll == 'X' || this.indexRoll == 1){
		this.indexRoll = 0;
		this.indexFrame++;
	}
	else {
		this.indexRoll++;
	}
	//console.log(' frame: ' + this.indexFrame + ' score: ' + this.score);
}

function bowlingScore(frames) {
	var bowling = new Bowling();
	// Get frames.
	var arr = frames.split(' ');

	for( var i = 0; i < arr.length; i++){

		// Get rolls.
		var rols = arr[i].split('');

		for( var j = 0; j < rols.length; j++) {
			// Send each roll to calculate totals.
			bowling.calcScore(rols[j]);
		}
	}

	return bowling.score;
}
