const Temp = require( './template-functions.js' );
const Interpolate = Temp.interpolate;

const PoemHasTime = function( date )
{
	return undefined !== date.hour && undefined !== date.minute && undefined !== date.second;
};

const PoemDate = function( date )
{
	const YearFormat = new Intl.DateTimeFormat( 'en-US', { year: 'numeric' } ).format;
	const MonthFormat = new Intl.DateTimeFormat( 'en-US', { month: 'long' } ).format;
	const DayFormat = new Intl.DateTimeFormat( 'en-US', { day: 'numeric' } ).format;
	const TimeFormat = new Intl.DateTimeFormat( 'en-US', { hour: '2-digit', minute: '2-digit' } ).format;
	let date_script = `${ date.year }-${ date.month }-${ date.day }`;

	if ( PoemHasTime( date ) )
	{
		 date_script += ` ${ date.hour }:${ date.minute }:${ date.second }`;
	}

	const DATE = new Date( date_script );
	let date_string = `<span class="poem-date-date">${ YearFormat( DATE ) } ${ MonthFormat( DATE ) } ${ DayFormat( DATE ) }</span>`;
	
	if ( PoemHasTime( date ) )
	{
		date_string += `<span class="poem-date-time">${ TimeFormat( DATE ) }</span>`;
	}

	return date_string;
};

const CategoriesList = function( categories )
{
	let text = '';

	if ( 0 === categories.length )
	{
		return '<p>No categories</p>';
	}
	else
	{
		text = '<ul class="poem-categories-list">';

		for ( const N in categories )
		{
			const CATEGORY = categories[ N ];
			text += `<li class="poem-categories-list-item">${ CATEGORY }</li>`;
		}

		text += '</ul>';
	}

	return text;
};

const PoemClass = function( name )
{
	return `poem-${ name }`;
};

const PoemContent = function( content )
{
	if ( "string" === typeof content )
	{
		return content;
	}
	else
	{
		let text = "";
		for ( const I in content )
		{
			const BLOCK = content[ I ];

			if ( BLOCK.hasOwnProperty( "lines" ) )
			{
				let classes = [ 'poem-block' ];
				if ( BLOCK.hasOwnProperty( "classes" ) )
				{
					for ( const CLASS_I in BLOCK.classes )
					{
						const CLASS = BLOCK.classes[ CLASS_I ];
						classes.push( PoemClass( CLASS ) );
					}
				}

				text += `<div class="${ classes.join( " " ) }">`;

				for ( const LINE_I in BLOCK.lines )
				{
					const LINE = BLOCK.lines[ LINE_I ];

					let line_classes = [ 'poem-line' ];
					if ( LINE.hasOwnProperty( "classes" ) )
					{
						for ( const LINE_CLASS_I in LINE.classes )
						{
							const LINE_CLASS = LINE.classes[ LINE_CLASS_I ];
							line_classes.push( PoemClass( LINE_CLASS ) );
						}
					}

					if ( LINE.hasOwnProperty( "indent" ) && "number" === typeof LINE.indent )
					{
						line_classes.push( `poem-indent-${ LINE.indent.toString() }` );
					}

					text += `<p class="${ line_classes.join( " " ) }">${ LINE.content }</p>`
				}

				text += "</div>";
			}
		}
		return text;
	}
};

const PoemTitle = function( poem, config, single )
{
	return ( single ) ? poem.title : Temp.poem_link( config, poem );
}

module.exports = function( data, poem, single )
{
	return Interpolate
	(
		'title',
		Interpolate
		(
			'date',
			Interpolate
			(
				'slug',
				Interpolate
				(
					'categories',
					Interpolate
					(
						'content',
						data.templates.poem,
						PoemContent( poem.content )
					),
					CategoriesList( poem.categories )
				),
				poem.slug
			),
			PoemDate( poem.date )
		),
		PoemTitle( poem, data.config, single )
	);
};