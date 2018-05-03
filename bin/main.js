const Get = function()
{
	return require( './get/get-main.js' );
};

const Make = function( data )
{
	return require( './make/make-docs.js' )( data );
};

const Clear = function( config )
{
	require( './clear/clear-main.js' )( config );
};

const Print = function( docs, config )
{
	require( './print/print-docs.js' )( docs, config );
};

const SetPermissions = function( config )
{
	require( './set-permissions.js' )( config );
};

const Main = function()
{
	const DATA = Get();
	const DOCUMENTS = Make( DATA );
	Clear( DATA[ 'config' ] );
	Print( DOCUMENTS, DATA[ 'config' ] );
	SetPermissions( DATA[ 'config' ] );
};
Main();