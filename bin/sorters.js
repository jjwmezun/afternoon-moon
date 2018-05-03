const DATE_CRITERIA = [
	'year',
	'month',
	'day',
	'hour',
	'minute',
	'second'
];

module.exports = {
	Date: function( a, b )
	{
		const A = a.date;
		const B = b.date;

		for ( const DATE_TYPE of DATE_CRITERIA )
		{
			if ( undefined !== typeof A[ DATE_TYPE ] && undefined !== typeof B[ DATE_TYPE ] )
			{		
				if      ( A[ DATE_TYPE ] > B[ DATE_TYPE ] ) { return -1; }
				else if ( A[ DATE_TYPE ] < B[ DATE_TYPE ] ) { return  1; }
			}
			else
			{
				return 0;
			}
		}
		return 0;
	},
	Alphabetical: function( a, b )
	{
		if ( a.title < b.title ) { return -1; }
		else if ( a.title > b.title ) { return 1; }
		else { return 0; }
	}
};