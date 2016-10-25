$(document).ready(function() {
    getAllDatas()
    getAllDataDates()
    $('#add-data').hide()
    $('#add-data-date').hide()
    $(function() {
        $("#datepicker").datepicker();
        $("#datepicker2").datepicker();
    })
    searchDatas()
    searchDataDates()
})

function searchDatas() {
    $('input[name=search-data-letter], input[name=search-data-frequency]').on('keyup', function() {
        getAllDatas()
    })
}

function searchDataDates() {
    $('input[name=search-data-date-letter], input[name=search-data-date-frequency]').on('keyup', function() {
        getAllDataDates()
    })
}

function getAllDatas() {
    $.ajax({
        url: "/api/data",
        type: 'GET',
        data: {
            letter: $("input[name=search-data-letter]").val().toUpperCase(),
            frequency: $("input[name=search-data-frequency]").val()
        },
        dataType: 'json',
        success: function(results) {
            listData(results)
        }
    })
}

function getAllDataDates() {
    $.ajax({
        url: "/api/datadate",
        type: 'GET',
        data: {
            letter: $("input[name=search-data-date-letter]").val(),
            frequency: $("input[name=search-data-date-frequency]").val()
        },
        dataType: 'json',
        success: function(results) {
            listDataDate(results)
        }
    })
}

function listData(results) {
    $('.table-data tbody').empty()

    for (var i = 0; i < results.length; i++) {
        $('.table-data tbody').append('<tr><td>' + (i + 1) + '</td><td class="data-letter">' + results[i].letter + '</td><td class="data-frequency">' + results[i].frequency + '</td><td><button onclick="editData(this)" data-id="' + results[i]._id + '" class="btn btn-sm btn-default"><span class="fa fa-pencil"></span></button><button onclick="deleteData(this)" class="btn btn-sm btn-default" data-id="' + results[i]._id + '"><span class="fa fa-trash"></span></button></td></tr>')
    }
}

function listDataDate(results) {
    $('.table-data-date tbody').empty()

    for (var i = 0; i < results.length; i++) {
        $('.table-data-date tbody').append('<tr><td>' + (i + 1) + '</td><td class="data-date-letter">' + results[i].letter + '</td><td class="data-date-frequency">' + results[i].frequency + '</td><td><button onclick="editDataDate(this)" data-id="' + results[i]._id + '" class="btn btn-sm btn-default"><span class="fa fa-pencil"></span></button><button onclick="deleteDataDate(this)" class="btn btn-sm btn-default" data-id="' + results[i]._id + '"><span class="fa fa-trash"></span></button></td></tr>')
    }
}

function addData() {
    var id = $('#add-data-button').attr('data-id')

    if ($('#add-data-button').attr('data-id')) {
        $.ajax({
            url: "/api/data/" + id,
            type: 'PUT',
            data: { letter: $("input[name=data-letter]").val().toUpperCase(), frequency: $("input[name=data-frequency]").val() },
            success: function() {
                $('#data-message').empty()
                $('#data-message').append('<div class="alert alert-info">Data is edited!</div>')
            }
        })
    } else {
        $.ajax({
            url: "/api/data",
            type: 'POST',
            data: { letter: $("input[name=data-letter]").val().toUpperCase(), frequency: $("input[name=data-frequency]").val() },
            success: function() {
                $('#data-message').empty()
                $('#data-message').append('<div class="alert alert-info">Data is added!</div>')
            }
        })
    }
}

function addDataDate() {
    var id = $('#add-data-date-button').attr('data-id')

    if ($('#add-data-date-button').attr('data-id')) {
        $.ajax({
            url: "/api/datadate/" + id,
            type: 'PUT',
            data: { letter: $("input[name=data-date-letter]").val(), frequency: $("input[name=data-date-frequency]").val() },
            success: function(){
            	$('#data-date-message').empty()
                $('#data-date-message').append('<div class="alert alert-warning">Data date is edited!</div>')
            }
        })
    } else {
        $.ajax({
            url: "/api/datadate",
            type: 'POST',
            data: { letter: $("input[name=data-date-letter]").val(), frequency: $("input[name=data-date-frequency]").val() },
            success: function(){
            	$('#data-date-message').empty()
                $('#data-date-message').append('<div class="alert alert-warning">Data date is edited!</div>')
            }
        })
    }
}

function editData(pointer) {
    var id = $(pointer).attr('data-id')
    var letter = $(pointer).closest('tr').find('.data-letter').text()
    var frequency = $(pointer).closest('tr').find('.data-frequency').text()

    $("input[name=data-letter]").attr('value', letter);
    $("input[name=data-frequency]").attr('value', frequency);

    if ($('#add-data-button').attr('data-id')) {
        $('#add-data-button').removeAttr('data-id');
    }
    $('#add-data-button').attr('data-id', id)

    $('#add-data').show()
}

function editDataDate(pointer) {
    var id = $(pointer).attr('data-id')
    var letter = $(pointer).closest('tr').find('.data-date-letter').text()
    var frequency = $(pointer).closest('tr').find('.data-date-frequency').text()

    $("input[name=data-date-letter]").attr('value', letter);
    $("input[name=data-date-frequency]").attr('value', frequency);

    if ($('#add-data-date-button').attr('data-id')) {
        $('#add-data-date-button').removeAttr('data-id');
    }
    $('#add-data-date-button').attr('data-id', id)

    $('#add-data-date').show()
}

function deleteData(pointer) {
    var id = $(pointer).attr('data-id')
    $.ajax({
        url: "/api/data/" + id,
        type: 'DELETE',
        success: function() {
            $(pointer).closest('tr').remove()
            $('#data-message').empty()
            $('#data-message').append('<div class="alert alert-info">Data is deleted</div>')
        }
    })
}

function deleteDataDate(pointer) {
    var id = $(pointer).attr('data-id')
    $.ajax({
        url: "/api/datadate/" + id,
        type: 'DELETE',
        success: function() {
            $(pointer).closest('tr').remove()
            $('#data-date-message').empty()
            $('#data-date-message').append('<div class="alert alert-warning">Data is deleted</div>')
        }
    })
}

function showAddData() {
    $('#add-data').toggle()
    $("input[name=data-letter]").removeAttr('value');
    $("input[name=data-frequency]").removeAttr('value');
    if ($('#add-data-button').attr('data-id')) {
        $('#add-data-button').removeAttr('data-id');
    }
}

function showAddDataDate() {
    $('#add-data-date').toggle()
    $("input[name=data-date-letter]").removeAttr('value');
    $("input[name=data-date-frequency]").removeAttr('value');
    if ($('#add-data-date-button').attr('data-id')) {
        $('#add-data-date-button').removeAttr('data-id');
    }
}
