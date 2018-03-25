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

	const RecentPoems = function( data )
	{
		const MakePoem = require( './make-poem.js' );
		const LIMIT = data.config.poems_in_home;
		let content = '';

		for ( let i = 0; i < LIMIT; i++ )
		{
			let poem = data.poems[ i ];
			poem.title = TempFunctions.poem_link( data.config, poem );
			content += MakePoem( data, poem );
		}
		return content;
	};

	const CONTENT = RecentPoems( data );
	return TempFunctions.main( data, CONTENT, null );
};