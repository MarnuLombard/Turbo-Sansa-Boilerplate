$(document).ready(function() {

	// Replace png with svg using modernizr
	/*if (!Modernizr.inlinesvg) {
		$('img[src*="svg"]').attr('src', function() {
			return $(this).attr('src').replace('.svg', '.png');
		});
	}*/
	//--> Modernizr

	// a link to replace a link with
	// a phone number using js.
	// for extra security
	$('#showNumber').click(function() {
		$(this).html('076 561 8470');
		$(this).css('cursor', 'text');
		$(this).css('text-decoration', 'none');
	});

	// a class / hook to close the modal when the open call comes from within a first modal

	$('.closeAll').bind('click', function () {
		$(this).parent().hide('fast');
	});
});//doc ready