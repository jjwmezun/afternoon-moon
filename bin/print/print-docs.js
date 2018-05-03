const PrintFunction = function( docs, config, type )
{
	const DOC_GROUP = docs[ type ];
	const DIR = `${ process.cwd()}/${ config.dirs.public }${ config.dirs[ type ] }`;
	const FS = require( 'fs' );
	const EXT = config[ 'page-ext' ];

	for ( const KEY in DOC_GROUP )
	{
		const FILENAME = `${ DIR }${ KEY }${ EXT }`;
		const TEXT = DOC_GROUP[ KEY ];

		try
		{
			FS.writeFile
			(
				FILENAME,
				TEXT,
				function( err )
				{
					if ( null !== err )
					{
						console.log( err );
					}
				}
			);
		}
		catch ( err )
		{
			console.log( `Missing directory, ${ DIR }` );
			throw err;
		}
	}
};

module.exports = function( docs, config )
{
	PrintFunction( docs, config, 'pages' );
	PrintFunction( docs, config, 'poems' );
	PrintFunction( docs, config, 'lists' );
};