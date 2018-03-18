const Read = require( 'fs' ).readFileSync;
const FILENAME = `${process.cwd()}/dev/config.json`;
const FILE_DATA = Read( FILENAME, 'utf8' );

try
{
	module.exports = JSON.parse( FILE_DATA );
}
catch( err )
{
	console.log( `Config file, ${ FILENAME }, is malformed:` );
	throw err;
}