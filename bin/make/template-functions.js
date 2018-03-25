const DIVIDER = ' | ';

module.exports =
{
	interpolate: function( type, template, content )
	{
		const REGEXP = new RegExp( `<%\\s*${ type }\\s*%>` );
		return template.replace( REGEXP, content );
	},

	poem_url: function( config, slug )
	{
		return config.dirs[ 'url-root' ] + config.dirs.poems + slug + config[ 'page-ext-url' ];
	},

	poem_link: function( config, poem, classes )
	{
		const CLASS_TEXT = ( undefined !== classes ) ? ` class="${ classes }"` : '';
		return `<a${ CLASS_TEXT } href="${ this.poem_url( config, poem.slug ) }">${ poem.title }</a>`;
	},

	site_title: function( config, title )
	{
		const PAGE_TITLE = ( null !== title && undefined !== title ) ? `${ title }${ DIVIDER }` : '';
		return `${ PAGE_TITLE }${ config[ 'website-title' ] } &ndash; ${ config[ 'website-desc' ] }`;
	},

	main: function( data, content, title )
	{
		const CONTENT = this.interpolate
		(
			'content',
			data.templates.main,
			content
		);

		return this.interpolate
		(
			'site-title',
			CONTENT,
			this.site_title( data.config, title )
		);
	}
};