$("#likeButton").on("click", function (event) {
	event.preventDefault()
	var id = $(this).data('id');
	var that = $(this);
	var isLike = that.data('like');
	var successCatch = function (result) {
		console.log(result.responseJSON);
		var like = that.data('like');
		that.data('like', !like);
		that.find("i").toggleClass("fa-heart");
		that.find("i").toggleClass("fa-heart-o");
	}
	var failCatch = function (error) {
		if (error.responseJSON.message === 'permission denied') {
      swal({
        title: '請先登入',
        text: '如果要使用收藏功能，請先進行登入。',
      	type: 'warning',
      });
		}
	}
	if (isLike) {
		$.get('/api/labfnp/recipe/unlike/' + id).done(successCatch).fail(failCatch);
	} else {
		$.get('/api/labfnp/recipe/like/' + id).done(successCatch).fail(failCatch);
	}
})
