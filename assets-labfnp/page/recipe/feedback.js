$(document).ready(function () {
	$('.chosen-select').chosen({
			allow_single_deselect: false,
			no_results_text: '按 Enter 新增感覺',
		});

	$('.chosen-choices .search-field input').keydown(function(event) {
    event.stopPropagation();
		var feeling = $('.chosen-choices .search-field input').val().trim();
		if(event.keyCode === 13 && feeling){  //press ENTER
			var option;
			var noselect = true;
      $('.chosen-select option').each(function(i, e){
				if(i === 0) return;
				if(!e.selected && noselect) {
					option = e;
					noselect = false;
				}
			});

			$('.chosen-select').append('<option value="' + feeling + '" selected >' + feeling + '</option>')
			$('.chosen-select').trigger("chosen:updated");

		  // setTimeout(function () {
			// 	console.log(option);
		  // 	option.selected = false;
			// 	$('.chosen-select').trigger("chosen:updated");
		  // }, 0);
		}
	});
});
