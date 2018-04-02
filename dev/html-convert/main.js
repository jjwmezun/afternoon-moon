const READ_DIR = `${ process.cwd() }/dev/bkup-poems`;
const WRITE_DIR = `${ process.cwd() }/dev/poems`;
const FS = require( 'fs' );
const Cheerio = require( 'cheerio' );

const Change = function( text )
{
	text = text.replace( /mezun-post-img/g, "poem-img" );
	text = text.replace( /mezun-verse/g, "" );
	text = text.replace( /\s{2}/g, " " );
	text = text.replace( /mezun-/g, "poem-" );
	text = text.replace( /class=" /g, 'class="' );
	return text;


	const $ = Cheerio.load( text );
	let content = [];

	$( 'body' ).children().each
	(
		function( i, v )
		{
			let classes = $( v ).attr( "class" );
			if ( undefined !== classes )
			{
				classes = classes.replace( /mezun-verse/g, "" );
				classes = classes.replace( /\s{2}/g, " " );
				$( v ).attr( "class", classes.replace( /mezun-/g, 'poem-' ).trim() );
			}
		}
	);

/*
	$( 'div' ).each
	(
		function( i, v )
		{
			let block = {};
			const LINES = $( v ).children();
			if ( LINES.length > 0 )
			{
				block.lines = [];
				$( LINES ).each
				(
					function( li, lv )
					{
						console.log( $( lv ).html() );
					}
				);
			}
		}
	);
	*/
	return $( 'body' ).html();
};

FS.readdir
(
	READ_DIR,
	function( err, items )
	{
		for ( const I in items )
		{
			const ITEM = items[ I ];
			const FILENAME = `${ READ_DIR }/${ ITEM }`;
			FS.readFile
			(
				FILENAME,
				function( err, data )
				{
					data = JSON.parse( data.toString() );
					if ( data.hasOwnProperty( "content" ) && "string" === typeof data.content )
					{
						data.content = Change( data.content );

						FS.writeFile
						(
							`${ WRITE_DIR }/${ ITEM }`,
							JSON.stringify( data, null, 4 ),
							function( err )
							{
								if ( err ) { throw err };
							}
						);
					}
					else
					{
						console.log( FILENAME );
					}
				}
			);
		}
	}
);