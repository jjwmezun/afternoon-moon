module.exports = function( config )
{
	const DoPermissions = function( config, dir = null )
	{
		if ( null === dir )
		{
			dir = config.uri.public.root;
		}

		const FS = require( 'fs' );
		FS.readdir
		(
			dir,
			function( err, files )
			{
				if ( err ) { throw err; }

				for ( const FILE of files )
				{
					const FULL_FILENAME = `${ dir }${ FILE }`;
					FS.lstat
					(
						FULL_FILENAME,
						function( err, stats )
						{
							if ( err ) { throw err; }

							if ( true === stats.isDirectory() )
							{
								FS.chmod
								(
									FULL_FILENAME,
									'755',
									function( err ) { if ( err ) { throw err; } }
								);
								DoPermissions( config, `${ FULL_FILENAME }/` );
							}
							else
							{
								FS.chmod
								(
									FULL_FILENAME,
									'644',
									function( err ) { if ( err ) { throw err; } }
								);
							}
						}
					);
				}
			}
		);
	}

	DoPermissions( config );
};