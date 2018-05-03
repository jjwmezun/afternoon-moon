module.exports = function( data )
{
	const Sorters = require( '../sorters.js' );
	const LISTS = [
		{
			"slug": "index",
			"title": "Latest to Oldest",
			"prepare": function( list ) { return list; }
		},
		{
			"slug": "oldest-to-latest",
			"title": "Oldest to Latest",
			"prepare": function( list ) { return list.reverse(); }
		},
		{
			"slug": "a-z",
			"title": "A-Z",
			"prepare": function( list ) { return list.sort( Sorters.Alphabetical ); }
		},
		{
			"slug": "z-a",
			"title": "Z-A",
			"prepare": function( list ) { return list.sort( Sorters.Alphabetical ).reverse(); }
		}
	];

	const TempFunctions = require( './template-functions.js' );

	const ListOfLists = ( function()
	{
		let text = `<ul>`;

		for ( const LIST of LISTS )
		{
			text += `<li>${ TempFunctions.ListLink( data.config, LIST ) }</li>`;
		}

		text += `</ul>`;
		return text;
	})();

	const PoemList = function( data, prepare = function( a ) { return a; } )
	{
		text = ListOfLists;
		text += '<ul>';

		const POEMS = prepare( data.poems );
		for ( const KEY in POEMS )
		{
			const POEM = POEMS[ KEY ];
			text += `\n\t\t\t<li>${ TempFunctions.poem_link( data.config, POEM ) }</li>`;
		}

		text += '</ul>';
		return text;
	};

	let list_content = {};

	for ( const LIST of LISTS )
	{
		list_content[ LIST.slug ] = TempFunctions.main( data, PoemList( data, LIST.prepare ), null )
	}

	return list_content;
};