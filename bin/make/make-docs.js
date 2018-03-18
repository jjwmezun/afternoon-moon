const MakeIndex = require( './make-index.js' );
const MakePoems = require( './make-poems.js' );

module.exports = function( data )
{
	return {
		'pages': {
			'index': MakeIndex( data )
		},
		'poems': MakePoems( data )
	}
};