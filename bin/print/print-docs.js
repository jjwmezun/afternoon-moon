const PrintFunction = function( docs, config, local_dir )
{
	const DIR = `${ process.cwd()}/${ local_dir }`;
	const FS = require( 'fs' );
	const EXT = config[ 'page-ext' ];

	for ( const KEY in docs )
	{
		const FILENAME = `${ DIR }${ KEY }${ EXT }`;
		const TEXT = docs[ KEY ];

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

const PrintPages = function( docs, config )
{
	PrintFunction( docs[ 'pages'], config, `${ config.dirs.public }${ config.dirs.pages }` );
};

const PrintPoems = function( docs, config )
{
	PrintFunction( docs[ 'poems'], config, `${ config.dirs.public }${ config.dirs.poems }` );
};

module.exports = function( docs, config )
{
	PrintPages( docs, config );
	PrintPoems( docs, config );
};