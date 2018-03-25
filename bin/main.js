const Get = function()
{
	return require( './get/get-main.js' );
};

const Make = function( data )
{
	const MakeDocs = require( './make/make-docs.js' );
	return MakeDocs( data );
};

const Clear = function( config )
{
	const ClearMain = require( './clear/clear-main.js' );
	ClearMain( config );
};

const Print = function( docs, config )
{
	const PrintDocs = require( './print/print-docs.js' );
	PrintDocs( docs, config );
};

const Main = function()
{
	const DATA = Get();
	const DOCUMENTS = Make( DATA );
	Clear( DATA[ 'config' ] );
	Print( DOCUMENTS, DATA[ 'config' ] );
};
Main();