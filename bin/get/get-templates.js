const TEMPLATES =
[
	'main',
	'poem'
];

const GetTemplateFile = function( slug )
{
	const Read = require( 'fs' ).readFileSync;
	const DIR = `${ process.cwd() }/dev/templates/`;
	const FULL_PATH = `${ DIR }${ slug }.html`;
	let data;

	try
	{
		data = Read( FULL_PATH, 'utf8' );
	}
	catch ( err )
	{
		console.log( `Mandatory template file, ${ FULL_PATH }, is missing.` );
		throw err;
	}

	return data.toString();
};

module.exports = {};
for ( const N in TEMPLATES )
{
	const SLUG = TEMPLATES[ N ];
	module.exports[ SLUG ] = GetTemplateFile( SLUG );
}