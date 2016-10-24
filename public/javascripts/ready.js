$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: '/api/stock/',
    dataType: 'json'
  }).done(function(result){
    console.log(result)
    result.forEach(function(item){
      insert_to_tabel(item)
    })
  })
})
