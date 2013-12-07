// @Description: Swap out svg img src.
//
// As seen here: https://gist.github.com/anonymous/3388e44bec5e9d1f7a33
// So no author credit can be found.
// I like it because it doesn't use jquery and doesn't need Modernizr
// I am as of yet to see the possibnility of producing the 'error' event
// for reasons beyond not understanding svg
var imgs = document.querySelectorAll( "img" );
img.addEventListener("error", function( e ) {
	var src = this.getAttribute( "src" ),
	fallbksrc = this.getAttribute( "data-fallbk" );

	if( src == fallbacksrc ) {
		return;
	}
	this.setAttribute( "src", fallbksrc );
});
//--> svg swap


$(document).ready(function() {

}); //docReady