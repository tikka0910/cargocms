// var length = $("label.scent").length;
// var pieChartData = {
//   labelArray: [],
//   dropsArray: [],
//   scentColorArray: []
// };
//
// for (var i = 0; i < length; i++) {
// 	pieChartData.labelArray.push($("label#scent-" + i).html());
// 	pieChartData.dropsArray.push($("label#drops-" + i).html());
// 	pieChartData.scentColorArray.push($("label#color-" + i).html());
// }
//
// var perfumePieConfig = {
// 	type: 'pie',
// 	data: {
// 		datasets: [{
// 			data: pieChartData.dropsArray,
// 			backgroundColor: pieChartData.scentColorArray,
//         }],
// 		labels: pieChartData.labelArray,
// 	},
// 	animation: {
// 		animateScale: true,
// 	},
// 	options: {
// 		title: {
// 			display: true,
// 			text: ''
// 		},
// 		legend: {
// 			display: false,
// 		},
// 		circumference: 1.5 * Math.PI,
// 		responsive: true,
// 		hover: {
// 			mode: 'label',
// 		}
// 	}
// };
// var perfumePie = new Chart(document.getElementById("pieChart"), perfumePieConfig);

$("#likeButton").on("click", function(event){
  event.preventDefault()
  var id = $(this).data('id');
  var that = $(this);
  var isLike = that.data('like');
  var successCatch = function(result) {
    console.log(result.responseJSON);
    var like = that.data('like');
    that.data('like', !like);
    that.find("i").toggleClass("fa-heart");
    that.find("i").toggleClass("fa-heart-o");
  }
  var failCatch = function(error) {
    if (error.responseJSON.message === 'permission denied') {
      alert( "請先進行登入" );
      location.href = '/login';
    }
  }
  if (isLike) {
    $.get('/api/labfnp/recipe/unlike/'+id).done(successCatch).fail(failCatch);
  } else {
    $.get('/api/labfnp/recipe/like/'+id).done(successCatch).fail(failCatch);
  }
})
