const DateSorter = function( a, b )
{
	const A = a.date;
	const B = b.date;

	if      ( A.year > B.year ) { return -1; }
	else if ( A.year < B.year ) { return  1; }
	else
	{
		if      ( A.month > B.month ) { return -1; }
		else if ( A.month < B.month ) { return  1; }
		else
		{
			if      ( A.day > B.day ) { return -1; }
			else if ( A.day < B.day ) { return  1; }
			else
			{
				if      ( A.hour > B.hour ) { return -1; }
				else if ( A.hour < B.hour ) { return  1; }
				else
				{
					if      ( A.minute > B.minute ) { return -1; }
					else if ( A.minute < B.minute ) { return  1; }
					else
					{
						if      ( A.second > B.second ) { return -1; }
						else if ( A.second < B.second ) { return  1; }
						else
						{
							return 0;
						}
					}
				}
			}
		}
	}
};

const DIR = `${ process.cwd() }/dev/poems/`;
const FS = require( 'fs' );

module.exports = [];

const FILES = FS.readdirSync( DIR );

FILES.forEach
(
	function( filename )
	{
		const FULL_PATH = `${ DIR }${ filename }`;
		const DATA = JSON.parse( FS.readFileSync( FULL_PATH, 'utf8' ) );
		module.exports.push( DATA );
	}
);

module.exports.sort( DateSorter );