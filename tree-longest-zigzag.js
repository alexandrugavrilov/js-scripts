
function Tree(a) {
}

Tree.prototype.paths = {};

Tree.prototype.calc_longest_zigzag = function(T) {
	this.paths = {};
	this.paths[ '0' ] = 0;
	//parse tree and set zigzag counts for each path
	this.parse_tree(T, '0', '0');

	if( Object.keys( this.paths ).length == 1) return 0;
	var max = 0;
	for( var key in this.paths){
		max = Math.max(this.paths[key], max);
	}

	return max;
}


Tree.prototype.parse_tree = function(t, direction, path){

  // If we can go left.
	if( t.l != null ){
		var next_key = path + 'L';
		var count = 0;

    // If this is not the first node.
		if( typeof(this.paths[path]) !== 'undefined'){
      
      // Get the previous zigzag count. We'll store it in the paths class var.
			count = this.paths[path];
      
      // If we switch directions
      // it means we have a zigzag, so we increment count.
			if ( direction == 'R' ){
				count++;
			}
      // Remove the previous path.
			delete this.paths[path];
		}
    
    // Set the new path key ( eg: LRRL + new_direction ) equal to the zigzag count.
		this.paths[ next_key ] = count;
    // Move to next node recursively.
		this.parse_tree(t.l, 'L', next_key);
	}

  // Same for oposite direction.
	if( t.r != null ){
		var count = 0;
		var next_key = path + 'R';
		if( typeof(this.paths[path]) !== 'undefined'){
			count = this.paths[path];
      
			if ( direction == 'L' ){
				count++;
			}
			delete this.paths[path];
		}
		this.paths[ next_key ] = count;
		this.parse_tree(t.r, 'R', next_key);
	}
}

function main() {
	var tree = new Tree();

	console.log( tree.calc_longest_zigzag(
		{ x: 5,
			l: {
				x: 3,
				r: { x: 20, l: { x: 33, l: null, r: { x: 55, l: null, r: null}}, r: null },
				l: null
			},
			r:
				{
					x: 10,
					l: { x: 1, l: null, r: null },
					r: {
						x: 15,
						l: {
							x: 44,
							l: null,
							r: { x: 55, l: null, r: null}},
						r: { x: 66, l: null, r: null} }
				}
		}
	) );

}

main();
