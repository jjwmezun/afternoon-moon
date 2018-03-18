const PoemURL = function( config, slug )
{
	return config.dirs[ 'url-root' ] + config.dirs.poems + slug + config[ 'page-ext-url' ];
};

module.exports =
{
	interpolate: function( type, template, content )
	{
		const REGEXP = new RegExp( `<%\\s*${ type }\\s*%>` );
		return template.replace( REGEXP, content );
	},

	poem_url: PoemURL,

	poem_link: function( config, poem, classes )
	{
		const CLASS_TEXT = ( undefined !== classes ) ? ` class="${ classes }"` : '';
		return `<a${ CLASS_TEXT } href="${ PoemURL( config, poem.slug ) }">${ poem.title }</a>`;
	}
};