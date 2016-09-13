var config = {
	'.chosen-select': {
		allow_single_deselect: false,
		width: "100%",
	},
}
for (var selector in config) {
	$(selector).chosen(config[selector]);
}
var styles = {
	'background-color': 'white',
	'border-radius': '0px 0px 0px 0px',
	'-moz-border-radius': '0px 0px 0px 0px',
	'-webkit-border-radius': '0px 0px 0px 0px',
	'border': '1px solid #bbb',
	'height': '33px',
	'background': 'white',
	'margin-bottom': '10px',
	'padding-top': '1%',
}
for (var style in styles) {
	$('a.chosen-single').css(style, styles[style]);
}
$('.chosen-select').change(function () {
	for (var style in styles) {
		$('a.chosen-single').css(style, styles[style]);
	}
});

$('.feeling-dropdown').change(function () {
	var idx = $(this).data('index');
	var prefix = $(this).val();
	$('.scent-detail[data-index=' + idx + ']').addClass("hidden");

	if (prefix) {
		var dropdown = $('.scents-dropdown[data-index=' + idx + ']');
		dropdown.val("");

		$('option', dropdown)
			.hide()
			.filter(function (index, element) {
				if (index === 0) {
					return true;
				}
				var feelings = $(element).data('feelings');
				var visible = false;
				feelings.forEach(function (e) {
					if (e.key === prefix) {
						visible = true;
					}
				});
				return visible;
			})
			.show();
	} else {
		$('option', dropdown)
			.hide()
	}
});

$('.scents-dropdown').each(function (i, e) {
	var dropdown = $(this);
	var idx = $(this).data('index');
	var feelingDropdown = $('.feeling-dropdown[data-index=' + idx + ']');
	var feeling = feelingDropdown.val();

	if (feeling) {
		$('option', $('.scents-dropdown[data-index=' + idx + ']'))
			.hide()
			.filter(function (index, element) {
				if (index === 0) {
					return true;
				}
				var feelings = $(element).data('feelings');
				var visible = false;
				feelings.forEach(function (e) {
					var check = e.key === feeling;
					if (check) {
						visible = true;
						//return e.key;
					} //else return visible;
				});
				return visible;
			})
			.show();
	} else {
		$('option', dropdown)
			.hide()
	}
});
