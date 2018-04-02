module.exports = function( data )
{
	const Temp = require( './template-functions.js' );
	const MakePoem = require( './make-poem.js' );
	let documents = {};

	for ( const KEY in data[ 'poems' ] )
	{
		const POEM = data.poems[ KEY ];
		const CONTENT = MakePoem( data, POEM, true );
		documents[ POEM.slug ] = Temp.main( data, CONTENT, POEM.title );
	}

	return documents;
};