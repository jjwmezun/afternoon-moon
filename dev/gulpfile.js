const SASS_DIR = 'scss';
const CSS_DIR = 'css';
const SASS_SRC = `./${ SASS_DIR }/*.scss`;
const SASS_WATCH = `./${ SASS_DIR }/**/*.scss`;
const DEST = '../public_html';
const CSS_DEST = `${ DEST }/${ CSS_DIR }`;

const Gulp    = require( 'gulp' );
const Compass = require( 'gulp-compass' );
const Watch   = require( 'gulp-watch' );
const Plumber = require( 'gulp-plumber' );

const Main = function( done )
{
	done();
};

const CompassTask = function()
{
	Gulp.src( SASS_SRC )
	.pipe( Plumber() )
	.pipe
	(
		Compass
		({
			config_file: './config.rb',
			css: CSS_DEST,
			sass: SASS_DIR
		})
	);
};

Gulp.task
(
	'compass',
	function( done )
	{
		CompassTask();
		done();
	}
);

Gulp.task( 'default', Main );
 
Gulp.task
(
	'watch',
	function ()
	{
    	return Watch( SASS_WATCH, CompassTask );
	}
);