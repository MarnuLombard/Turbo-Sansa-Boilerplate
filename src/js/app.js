$(document).ready(function() {
// Swap out svg if not supported
	if (!Modernizr.inlinesvg) {
		$('img').each(function() {
			var src = $(this).attr("src").replace(".svg", ".png");
				$(this).attr("src", src);
		});
	}
//--> svg swap
//
}); //docReady