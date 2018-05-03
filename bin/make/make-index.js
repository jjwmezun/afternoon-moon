module.exports = function( data )
{
	const TempFunctions = require( './template-functions.js' );

	const RecentPoems = function( data )
	{
		const MakePoem = require( './make-poem.js' );
		const LIMIT = data.config.poems_in_home;
		let content = '';

		for ( let i = 0; i < LIMIT; i++ )
		{
			let poem = data.poems[ i ];
			content += MakePoem( data, poem, false );
		}
		return content;
	};

	const CONTENT = RecentPoems( data );
	return TempFunctions.main( data, CONTENT, null );
};