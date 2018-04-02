const DIVIDER = ' | ';

module.exports =
{
	is_string: function( thing )
	{
		return "string" === typeof thing;
	},
	interpolate: function( type, template, content )
	{
		const REGEXP = new RegExp( `<%\\s*${ type }\\s*%>` );
		return template.replace( REGEXP, content );
	},

	page_url: function( config, slug )
	{
		if ( '' === slug )
		{
			return config.dirs[ 'url-root' ];
		}
		else
		{
			return config.dirs[ 'url-root' ] + config.dirs.pages + slug + config[ 'page-ext-url' ];
		}
	},

	page_link: function( config, obj, classes )
	{
		let class_text = '';

		if ( 'object' === classes && classes.length > 0 )
		{
			class_text = `class="${ classes.join( " " ) }"`;
		}

		return `<a ${ class_text }href="${ this.page_url( config, obj.slug ) }">${ obj.title }</a>`;
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

	css_link: function( config, name )
	{
		return config.dirs[ 'url-root' ] + config.dirs[ 'css' ] + name + '.css';
	},

	stylesheets: function( config )
	{
		return `<link href="${ this.css_link( config, "main" ) }" rel="stylesheet">`;
	},

	header: function( config )
	{
		const LINKS =
		[
			{
				'slug': '',
				'title': 'Home'
			},
			{
				'slug': 'history',
				'title': 'History'
			},
			{
				'slug': 'lists',
				'title': 'Lists'
			}
		];

		let text = '';
		text += '<nav class="nav"><ul class="nav-list">';

		for ( const I in LINKS )
		{
			const LINK = LINKS[ I ];
			text += `<li class="nav-list-item">${ this.page_link( config, LINK, [ "nav-list-link" ] ) }</li>`;
		}

		text += '</ul></nav>';
		return text;
	},

	main: function( data, content, title )
	{
		return this.interpolate
		(
			'header',
			this.interpolate
			(
				'stylesheets',
				this.interpolate
				(
					'site-title',
					this.interpolate
					(
						'content',
						data.templates.main,
						content
					),
					this.site_title( data.config, title )
				),
				this.stylesheets( data.config )
			),
			this.header( data.config )
		);
	}
};