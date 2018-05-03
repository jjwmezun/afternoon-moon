const MakeIndex = require( './make-index.js' );
const MakePoems = require( './make-poems.js' );
const MakeLists = require( './make-lists.js' );
const MakeHistory = require( './make-history.js' );

module.exports = function( data )
{
	return {
		'pages': {
			'index': MakeIndex( data ),
			'die-geschichte': MakeHistory( data )
		},
		'poems': MakePoems( data ),
		'lists': MakeLists( data )
	}
};