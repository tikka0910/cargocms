$(function() {
  var user_listData = {
    items: []
  }
  console.log(document.getElementById("user_tableBody"));
  var userList = new Vue({
    el: '#user_tableBody',
    data: user_listData
  })

  fetch('/user', {credentials: 'include'})
  .then(response => response.json())
  .then(result => {
    console.log("=== ready result ===", result);
    user_listData.items = result.data.items
  });
});
