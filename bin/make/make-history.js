module.exports = function( data )
{
	const TempFunctions = require( './template-functions.js' );

	const CONTENT = ( function()
	{
		let text = TempFunctions.BodyPageTitle( data.pages[ 'die-geschichte' ].title );
		return text;
	})();

	return TempFunctions.main( data, CONTENT, null );
};