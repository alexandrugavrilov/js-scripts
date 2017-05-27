
function Calculator() {
}

Calculator.prototype.calcOperation = function(str) {
	let regex = /[-]?\d+/g;
	let numbers = str.match(regex);
	let operator = str.replace(regex, '').trim();
	return this.add(numbers[0], operator, numbers[1]);
}
Calculator.prototype.add = function(a, operator, b) {
	a = parseFloat(a);
	b = parseFloat(b);
	switch(operator){
		case '*':
			return a * b;
			break;
		case '/':
			return a / b;
			break;
		case '-':
			return a - b;
			break;
		case '+':
			return a + b;
			break;
	}
	return 0;
}

Calculator.prototype.getRegexArray = function(regex, str) {
	let res = [];
	let m;
	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		// The result can be accessed through the `m`-variable.
		m.forEach((match, groupIndex) => {
			console.log(`Found match, group ${groupIndex}: ${match}`);
		});

		res.push([ m[0], m[1] ]);
	}
	return res;
}
Calculator.prototype.getParenthesesGroups = function(str) {
	const regex = /\(([^(^)]+)\)+?/g;
	return this.getRegexArray(regex, str);
}
Calculator.prototype.getMultiplyGroups = function(str) {
	const regex = /([-]?\d+[\s*\/]+[-]?\d+)+?/g;
	return this.getRegexArray(regex, str);
}

Calculator.prototype.getAditionGroups = function(str) {
	const regex = /([-]?\d+[\s+-]+[-]?\d+)+?/g;
	return this.getRegexArray(regex, str);
}
Calculator.prototype.calc = function(inputStr) {

	//calc based on priority
	
	//calc inside parentheses
	let parentheses;
	while( (parentheses = this.getParenthesesGroups(inputStr)).length != 0 ){
		for(let i = 0; i < parentheses.length; i++){
			let res = this.calc(parentheses[i][1]);
			//replace initial string parentheses with the calculated value
			inputStr = inputStr.replace(parentheses[i][0], res );
		}
	}

	//calc * and /
	let multiply;
	while( (multiply = this.getMultiplyGroups(inputStr)).length != 0 ){
		for(let i = 0; i < multiply.length; i++){
			let res = this.calcOperation(multiply[i][1]);
			//replace initial string multiply group with the calculated value
			inputStr = inputStr.replace(multiply[i][0], res );
		}
	}

	//calc + and -
	let adition;
	while( (adition = this.getAditionGroups(inputStr)).length != 0 ){
		for(let i = 0; i < adition.length; i++){
			let res = this.calcOperation(adition[i][1]);
			//replace initial string adition group with the calculated value
			inputStr = inputStr.replace(adition[i][0], res );
		}
	}

	return parseFloat(inputStr);
}

Calculator.prototype.calcWithVars = function(inputList) {
	// IMPLEMENT ME
}


function main() {
	var calculator = new Calculator();

	console.log("First Step");
	console.log(calculator.calc("3 + 4 * 5 / 7"));

	console.log("Second Step");
	console.log(calculator.calc("( 1*2 + 3 + 4 / ( 1 + 3 ) ) * 2 / 1 + 2 * ( 1 + 1 ) "));

}

main();
