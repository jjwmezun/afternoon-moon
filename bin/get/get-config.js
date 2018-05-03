const FS = require( 'fs' );
const Read = FS.readFileSync;
const FILENAME = `${ process.cwd() }/dev/config.json`;
const FILE_DATA = Read( FILENAME, 'utf8' );

const GetPublicDirs = function( root )
{
	return {
		root: root,
		pages: `${ root }${ module.exports.dirs.pages }`,
		poems: `${ root }${ module.exports.dirs.poems }`,
		lists: `${ root }${ module.exports.dirs.lists }`,
		img: `${ root }${ module.exports.dirs.img }`,
		js: `${ root }${ module.exports.dirs.js }`,
		css: `${ root }${ module.exports.dirs.css }`,
	};
};

try
{
	module.exports = JSON.parse( FILE_DATA );

	for ( const KEY in module.exports.dirs )
	{
		if ( module.exports.dirs[ KEY ] !== '' )
		{
			module.exports.dirs[ KEY ] += '/';
		}
	}

	module.exports.dirs.full = GetPublicDirs( module.exports.dirs[ 'url-root' ] );
	module.exports.uri =
	{
		public: GetPublicDirs( `${ process.cwd() }/${ module.exports.dirs.public }` ),
		dev:
		{
			root: `${ process.cwd() }/dev`
		}
	};

	const GetFileVersion = function( uri )
	{
		return `?m=${ Math.floor( FS.lstatSync( uri ).mtimeMs ) }`;
	};

	const PageLinkFunction = function( type )
	{
		return function( local )
		{
			if ( local !== '' )
			{
				local += module.exports[ 'page-ext-url' ];
			}
			return `${ module.exports.dirs.full[ type ] }${ local }`;
		};
	};

	const FileLinkFunction = function( type, ext = null )
	{
		if ( ext !== null )
		{
			ext = `.${ ext }`;
		}
		return function( local ) { return `${ module.exports.dirs.full[ type ] }${ local }${ ext }${ GetFileVersion( `${ module.exports.uri.public[ type ] }${ local }${ ext }` ) }` };
	};

	module.exports.link =
	{
		page: PageLinkFunction( 'pages' ),
		poem: PageLinkFunction( 'poems' ),
		list: PageLinkFunction( 'lists' ),
		img: FileLinkFunction( 'img' ),
		js: FileLinkFunction( 'js', 'js' ),
		css: FileLinkFunction( 'css', 'css' )
	};
}
catch( err )
{
	console.log( `Config file, ${ FILENAME }, is malformed:` );
	throw err;
}