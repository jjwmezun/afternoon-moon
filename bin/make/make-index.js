module.exports = function( data )
{
	const TempFunctions = require( './template-functions.js' );

	const PoemList = function( data )
	{
		let text = '<ul>';

		for ( const KEY in data.poems )
		{
			const POEM = data.poems[ KEY ];
			text += `\n\t\t\t<li>${ TempFunctions.poem_link( data.config, POEM ) }</li>`;
		}

		text += '</ul>';
		return text;
	};

	const CONTENT = PoemList( data );
	const TEMPLATE = data[ 'templates' ][ 'main' ];
	return TempFunctions.interpolate( 'content', TEMPLATE, CONTENT );
};