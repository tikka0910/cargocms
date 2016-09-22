$(document).ready(function () {
	$('.chosen-select').chosen({
			allow_single_deselect: false,
			no_results_text: '按 Enter 新增感覺',
			placeholder_text_multiple: '   ',
		});

	$('.chosen-choices .search-field input').keydown(function(event) {
    event.stopPropagation();
		var feeling = $('.chosen-choices .search-field input').val().trim();
		var IsNoResult = $('.chosen-results').has('.no-results').length > 0;
		if(event.keyCode === 13 && feeling && IsNoResult){  //press ENTER

			$('.chosen-select').append('<option value="' + feeling + '" selected >' + feeling + '</option>');

		  setTimeout(function () {
				$('.chosen-select').trigger("chosen:updated");
		  }, 200);
		}
	});
});
