const DIR = `${ process.cwd() }/dev/poems/`;
const FS = require( 'fs' );

module.exports = {};

const FILES = FS.readdirSync( DIR );

FILES.forEach
(
	function( filename )
	{
		const FULL_PATH = `${ DIR }${ filename }`;
		const DATA = JSON.parse( FS.readFileSync( FULL_PATH, 'utf8' ) );
		module.exports[ DATA.slug ] = DATA;
	}
)