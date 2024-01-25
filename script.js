$(document).ready(function() {
    $('#myTable').DataTable({
      "ajax": {
        "url": "data.json", 
        "type": "GET", 
        "dataSrc":  ""
      },
      columns: [
        { data: 'id' , class: 'editable text' },
        { data: 'name', class: 'editable text' },
        { data: 'language', class: 'editable text' },
        { data: 'version',class: 'editable text' },
        {
          "data": null,
          "render": function(data, type, row) {
                    return'<button id="edit-btn" onclick="editRecord(' + row.id + ')">Edit</button>'+
                    '<button id="delete-btn" onclick="deleteRecord(' + row.id + ')">Delete</button>';
          }
        }
      ]
    });
     var table = $('#myTable').DataTable();
 
    $('#myTable tbody').on( 'click', '#delete-btn', function () {
    table
      .row( $(this).parents('tr') )
      .remove()
      .draw();
    });
     
    

  });