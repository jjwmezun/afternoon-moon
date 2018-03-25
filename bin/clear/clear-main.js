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

	const ClearDocs = function( pattern )
	{
		const DOCS = GLOB.sync( pattern );
		for ( const N in DOCS )
		{
			const FILENAME = DOCS[ N ];
			FS.unlinkSync( FILENAME );
		}
	};

	const ClearPages = function()
	{
		ClearDocs( `./${ config.dirs.public }*${ EXT }` );
	};

	const ClearPoems = function()
	{
		ClearDocs( `./${ config.dirs.public }${ config.dirs.poems }*${ EXT }` );
	};

	CheckAllDirs( config );
	ClearPages();
	ClearPoems();
};