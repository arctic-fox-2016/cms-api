let convertJSONtoHTML = function(result){
  let data = "<table class='table table-striped'><tr><th>#</th><th>Letter</th><th>Frequency</th><th>Action</th></tr>"
  console.log(result)
  for (let i in result){
    data = data + `<tr><td>${parseInt(i)+1}</td><td>${result[i].letter}</td><td>${result[i].frequency}</td><td><button data_id="${result[i]._id}" class="update-button btn btn-success">Update</button> <button data_id="${result[i]._id}" class= "delete-button btn btn-danger">Delete</button></td></tr>`
  }
  data = data + "</table>"
  $("#data").html(data)

  $(".update-button").click(function(){
    $.ajax({
      url: `/api/data/${$(this).attr("data_id")}`,
      method:'GET',
      success: function(result){
        $("#add-update-data").show()
        console.log(result)
        $("input[name='letter']").val(result.letter)
        $("input[name='frequency']").val(result.frequency)
        $("input[name='object_id']").val(result._id)
      }
    })
  })

  $(".delete-button").click(function(){
    $.ajax({
      url: `/api/data/${$(this).attr("data_id")}`,
      method:'DELETE',
      success: function(result){
        console.log('masukdelete')
        loadData()
      }
    })
  })
}

let loadData = function(){
  $.ajax({
    url:'/api/data',
    method: 'GET',
    success: function(result){
      convertJSONtoHTML(result)
    }
  })
}

$(document).ready(function(){
  console.log('the page is ready')
  loadData()

  $("#add-update-data").hide()

  $("#add-update-data").submit(function(event){
    event.preventDefault($("input[name='object_id']").val())
    console.log()
    if($("input[name='object_id']").val()==""){
      $.ajax({
        url: '/api/data',
        method: 'POST',
        data: {letter: $("input[name='letter']").val(), frequency:$("input[name='frequency']").val()},
        success: function(result){
          $("#message").html("Insert is Successful")
          loadData()
          $("input[name='letter']").val("")
          $("input[name='frequency']").val("")
          $("input[name='object_id']").val("")
        }
      })
    } else {
      $.ajax({
        url: `/api/data/${$("input[name='object_id']").val()}`,
        method: 'PUT',
        data: {letter: $("input[name='letter']").val(), frequency:$("input[name='frequency']").val()},
        success: function(result){
          $("#message").html("Update is Successful")
          $("input[name='letter']").val("")
          $("input[name='frequency']").val("")
          $("input[name='object_id']").val("")
          loadData()
        }
      })
    }
  })

  $("#search-box-letter").keyup(function(){
    if($("#search-box-letter").val() != "" || $("#search-box-frequency").val() !=""){
      $.ajax({
        url:   `/api/search?letter=${$("#search-box-letter").val()}&frequency=${$("#search-box-frequency").val()}`,
        method: `GET`,
        success: function(result){
          convertJSONtoHTML(result)
        }
      })
    } else {
      loadData()
    }
  })

  $("#search-box-frequency").keyup(function(){
    if($("#search-box-letter").val() != "" || $("#search-box-frequency").val() !=""){
      $.ajax({
        url:   `/api/search?letter=${$("#search-box-letter").val()}&frequency=${$("#search-box-frequency").val()}`,
        method: `GET`,
        success: function(result){
          convertJSONtoHTML(result)
        }
      })
    } else {
      loadData()
    }
  })

  $("#show-add-button").click(function(){
    $("input[name='object_id']").val("")
    $("#add-update-data").toggle()
  })
})
