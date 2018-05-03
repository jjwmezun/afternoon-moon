const DIR = `${ process.cwd() }/dev/pages/`;
const FS = require( 'fs' );

module.exports = {};

const FILES = FS.readdirSync( DIR );

FILES.forEach
(
	function( filename )
	{
		const FULL_PATH = `${ DIR }${ filename }`;
		const DATA = JSON.parse( FS.readFileSync( FULL_PATH, 'utf8' ) );
		const SLUG = ( "undefined" !== typeof DATA.slug ) ? DATA.slug : filename.replace( /.json/, '' );
		module.exports[ SLUG ] = DATA;
	}
);