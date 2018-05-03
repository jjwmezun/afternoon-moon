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

	GenericPageLink: function( config, obj, link_function, classes )
	{
		let class_text = '';

		if ( 'object' === typeof classes && classes.length > 0 )
		{
			class_text = ` class="${ classes.join( " " ) }"`;
		}
		else if ( 'string' === typeof classes )
		{
			class_text = ` class="${ classes }"`;
		}

		return `<a${ class_text } href="${ link_function( obj.slug ) }">${ obj.title }</a>`;
	},

	page_link: function( config, obj, classes )
	{
		linkFunction = config.link.page;
		if ( obj.slug === 'lists' )
		{
			linkFunction = config.link.list;
			obj.slug = '';
		}

		return this.GenericPageLink( config, obj, linkFunction, classes );
	},

	poem_link: function( config, poem, classes )
	{
		return this.GenericPageLink( config, poem, config.link.poem, classes );
	},

	ListLink: function( config, list, classes )
	{
		return this.GenericPageLink( config, list, config.link.list, classes );
	},

	site_title: function( config, title )
	{
		const PAGE_TITLE = ( null !== title && undefined !== title ) ? `${ title }${ DIVIDER }` : '';
		return `${ PAGE_TITLE }${ config[ 'website-title' ] } &ndash; ${ config[ 'website-desc' ] }`;
	},

	BodyPageTitle: function( title, htype = 'h1' )
	{
		return `<${ htype } class="page-title">${ title }</h1>`;
	},

	stylesheets: function( config )
	{
		return `<link href="${ config.link.css( 'main' ) }" rel="stylesheet">`;
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
				'slug': 'die-geschichte',
				'title': 'Die Geschichte'
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