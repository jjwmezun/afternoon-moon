const Interpolate = require( './template-functions.js' ).interpolate;

const PoemDate = function( date )
{
	const YearFormat = new Intl.DateTimeFormat( 'en-US', { year: 'numeric' } ).format;
	const MonthFormat = new Intl.DateTimeFormat( 'en-US', { month: 'long' } ).format;
	const DayFormat = new Intl.DateTimeFormat( 'en-US', { day: 'numeric' } ).format;
	const TimeFormat = new Intl.DateTimeFormat( 'en-US', { hour: '2-digit', minute: '2-digit' } ).format;
	const DATE_SCRIPT = `${ date.year }-${ date.month }-${ date.day } ${ date.hour }:${ date.minute }:${ date.second }`;
	const DATE = new Date( DATE_SCRIPT );
	const DATE_STRING = `<span class="poem-date-date">${ YearFormat( DATE ) } ${ MonthFormat( DATE ) } ${ DayFormat( DATE ) }</span><span class="poem-date-time">${ TimeFormat( DATE ) }</span>`;
	return DATE_STRING;
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

module.exports = function( data, poem )
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
						poem.content
					),
					CategoriesList( poem.categories )
				),
				poem.slug
			),
			PoemDate( poem.date )
		),
		poem.title
	);
};