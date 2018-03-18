function WPConvert()
{
	var fs = require( 'fs' );

	function outputRawJSON( data )
	{
		const TEST_OUTPUT_FILENAME = '/var/www/poetry/dev/wp-convert/output.json';

		fs.writeFile
		(
			TEST_OUTPUT_FILENAME,
			data
		);
	};

	function writePoems( data )
	{
		const WRITE_DIR = '/var/www/poetry/dev/poems/';

		for ( var key in data )
		{
			var obj = JSON.stringify( data[ key ], null, '\t' );

			fs.writeFile( WRITE_DIR + key + '.json', obj );
		}
	};

	function formatDate( date )
	{
		date = date.split( /[-\s:]{1}/ );
		return {
			year: parseInt( date[ 0 ] ),
			month: parseInt( date[ 1 ] ),
			day: parseInt( date[ 2 ] ),
			hour: parseInt( date[ 3 ] ),
			minute: parseInt( date[ 4 ] ),
			second: parseInt( date[ 5 ] )
		};
	};

	function formatCategories( data )
	{
		var categories = [];
		for ( var i = 0; i < data.length; i++ )
		{
			var slug = data[ i ][ '$' ][ 'nicename' ];
			if ( 'poetry' !== slug )
			{
				categories.push( slug );
			}
		}
		return categories;
	};

	function getData( data )
	{
		var poems = {};
		data = data[ 'rss' ][ 'channel' ][ 0 ][ 'item' ];

		for ( var i = 0; i < data.length; i++ )
		{
			var poem = data[ i ];
			var slug = poem[ 'wp:post_name' ][ 0 ];
			var title = poem[ 'title' ][ 0 ];
			var date = formatDate( poem[ 'wp:post_date' ][ 0 ] );
			var categories = formatCategories( poem[ 'category' ] );
			var content = poem[ 'content:encoded' ][ 0 ];
			
			poems[ slug ] =
			{
				title: title,
				slug: slug,
				date: date,
				content: content,
				categories: categories
			};
		}

		return poems;
	};

	function xml( text )
	{
		var parseString = require( 'xml2js' ).parseString;
		parseString
		(
			text,
			function( err, result )
			{
				writePoems( getData( result ) );
			}
		);
	};

	function read()
	{
		var file = process.argv[ 2 ];

		fs.readFile
		(
			file,
			function( err, data )
			{
				var text = data.toString();
				xml( text );
			}
		);
	};
	read();
};
WPConvert();
