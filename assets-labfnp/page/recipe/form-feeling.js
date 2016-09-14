$(document).ready(function () {
	var showOption = function (options, prefix) {
		$(options).each(function (i, o) {
			hideOption(o);
			var doShow = function () {
				var feelings = $(o).data('feelings');
				for (var k = 0; k < feelings.length - 1; k++) {
					var checkWrap = $(o).parent('span').length !== 0;
					var checkFeeling = feelings[k].key === prefix;
					checkFeeling && checkWrap && $(o).unwrap().show();
				}
			}
			var checkVal = $(o).val() !== '';
			checkVal && doShow();
		});
	};

	var hideOption = function (options, prefix) {
		$(options).each(function (i, o) {
			var checkDefault = $(o).val() !== '';
			var checkWrap = $(o).parent('span').length === 0;
			var checkAll = checkWrap && checkDefault;
			checkAll && $(o).wrap('<span>').hide();
		});
	};

	var hideAllOption = function () {
		$('.scents-dropdown').each(function (i, e) {
			var selectedVal = $(e).val()
			var options = $(e).find('option');
			$(options).each(function (i, o) {
				var checkWrap = $(o).parent('span').length === 0;
				var checkDefault = $(o).val() !== '';
				var checkVal = $(o).val() !== selectedVal;
				var checksVals = checkDefault && checkVal;
				var checkAll = checksVals && checkWrap;
				checkAll && $(o).wrap('<span>');
			});
		});
	};

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

		var options = $('.scents-dropdown[data-index=' + idx + '] option');
		if (prefix) {
			showOption(options, prefix);
		} else {
			hideOption(options);
		}
		$('.scents-dropdown').change();
	});

	hideAllOption();

});
