var id_edit
function insert_to_tabel(item) {
    var row = $('<tr></tr>').attr({ id: item._id}).prependTo($('#stock_table'))
    var tdphoto = $('<td></td>')
    var photo = $('<img>').attr({src:'/images/'+item.photo+'.jpg'}).appendTo(tdphoto)
    tdphoto.appendTo(row)
    var nama_barang = $('<td></td>').text(item.nama_barang).appendTo(row)
    var harga = $('<td></td>').text('Rp. '+item.harga).appendTo(row)
    var jumlah = $("<td><span class='qty'></td>").text(item.jumlah).appendTo(row)
    var tdaction = $('<td></td>')
    var btnedit = $("<button class='btn btn-md btn-primary' type='button'></button>")
    var label = $("<i class='fa fa-pencil'>")
    var btndelete = $("<button class='btn btn-md btn-danger' type='button'></button>")
    var labeldelete = $("<i class='fa fa-trash'>").appendTo(btndelete)
    label.appendTo(btnedit)
    btnedit.appendTo(tdaction)
    btndelete.appendTo(tdaction)
    tdaction.appendTo(row)
    btndelete.on('click',function () {
      delete_stock(item._id)
    })
    btnedit.on('click',function () {
      console.log('try update');
      update_stock(item._id)
    })
}
function insert_stock() {
  $.ajax({
    type: 'POST',
    url: '/api/stock',
    data: {nama_barang: $("#formnama").val(), harga: $("#formharga").val(), jumlah: $("#formjumlah").val(), photo: $("#formphoto").val()},
    success: function(result){

      insert_to_tabel(result.data)
    }
  })
}
function hideupdate() {
  $("#update").attr('style','display:none')
}
function hideinsert() {
  $("#insert").attr('style','display:none')
}
function showinsert() {
  $("#insert").attr('style','display:block')
}
function update_stock(id) {
  $("#update").attr('style','display:block')
  // update_stock_ajax(id)
  id_edit = id

}
function update_stock_ajax() {

  $.ajax({
    type: 'PUT',
    url: '/api/stock/'+ id_edit,
    data: {nama_barang: $("#formnamaupdate").val(), harga: $("#formhargaupdate").val(), jumlah: $("#formjumlahupdate").val(), photo: $("#formphotoupdate").val()},
  }).done(function(result){
      if(result.message === 'update is successful') $('#'+id_edit).remove()
      insert_to_tabel(result.data)
      $("#update").attr('style','display:none')
      // window.location = '/stocks'

  })
}
function delete_stock(id_delete) {
  $.ajax({
    type: 'DELETE',
    url: '/api/stock/'+ id_delete,
    dataType: 'json'
  }).done(function(result){
      if(result.message === 'delete is successful') $('#'+id_delete).remove()
  })
}
