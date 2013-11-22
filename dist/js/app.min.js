/*
* @Author: marnu
* @Date:   2013-11-09 19:33:06
* @Last Modified by:   marnu
* @Last Modified time: 2013-11-09 19:33:16
*/

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