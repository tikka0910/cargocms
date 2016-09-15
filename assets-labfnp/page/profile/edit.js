var submitData = function (form) {
	var api = $(form).attr('action');
	var method = $(form).attr('method');

	var formIsValid = true
	var values = {};
	$.each($(form).serializeArray(), function (i, field) {
		values[field.name] = field.value;

		var checkFirstName = field.name === 'firstName' && field.value === '';
		var checkLastName = field.name === 'lastName' && field.value === '';
		var checkEmail = field.name === 'email' && field.value === '';
		if ((checkFirstName && checkLastName) && checkEmail) {
			formIsValid = false;
    }
	});

  var checkPwdEqual = values['password'] !== values['passwordConfirm'];
  if (checkPwdEqual) {
    swal('錯誤', '請輸入兩次一致的密碼！', 'warning');
    clearTimeout(time);
    return false;
  };

	if (!formIsValid) {
    swal('錯誤', '姓名與信箱不可留空！', 'warning');
    clearTimeout(time);
    return false;
  }
	var ajaxConfig = {
		url: api,
		method: method,
		dataType: 'json',
		//contentType: 'application/json',
		cache: false,
		data: {
			username: values['username'],
			email: values['email'],
			password: values['password'],
			passwordConfirm: values['passwordConfirm'],
			firstName: values['firstName'],
			lastName: values['lastName'],
		}
	};
	var catchDone = function (result) {
		swal({
			title: '訊息',
			text: '更新個人資料成功，請重新登入。',
			type: 'success',
			confirmButtonColor: "#2ecc71",
			confirmButtonText: "ＯＫ",
		}, function (isConform) {
			open('/edit/me', '_self');
		});
	};
  var catchFail = function (result) {
    swal('錯誤', '更新使用者資料發生錯誤，請稍候再試。', 'error');
  };
	$.ajax(ajaxConfig).done(catchDone).fail(catchFail);
};

$('#userProfileForm').on('submit', function (event) {

	event.preventDefault();

	var form = this;
  var time = null;
	swal({
		title: "確認",
		text: "確定要更新你的個人資料嗎？",
		type: "warning",
		confirmButtonClass: "btn-info",
		confirmButtonText: "是的",
		cancelButtonText: "先不要",
		showCancelButton: true,
		closeOnConfirm: false,
		showLoaderOnConfirm: true
	}, function () {
		time = setTimeout(submitData(form), 2000);
	});
});
