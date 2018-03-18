module.exports = function( config )
{
	const FS = require( 'fs' );
	const GLOB = require( 'glob' );
	const EXT = config[ 'page-ext' ];

	const CheckDir = function( dir )
	{
		if ( !FS.existsSync( dir ) )
		{
			FS.mkdirSync( dir );
		}
	};

	const CheckAllDirs = function( config )
	{
		CheckDir( `${ process.cwd() }/${ config.dirs.public }` );
		CheckDir( `${ process.cwd() }/${ config.dirs.public }${ config.dirs.poems }` );
	};

	const ClearPages = function()
	{
		const PATTERN = `./public_html/*${ EXT }`;
		const PAGES = GLOB.sync( PATTERN );

		for ( const N in PAGES )
		{
			const FILENAME = PAGES[ N ];
			FS.unlinkSync( FILENAME );
		}
	};

	CheckAllDirs( config );
	ClearPages();
};