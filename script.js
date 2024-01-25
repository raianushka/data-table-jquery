$(document).ready(function() {
    $('#myTable').DataTable({
      "ajax": {
        "url": "data.json", 
        "type": "GET", 
        "dataSrc":  ""
      },
      columns: [
        { data: 'id'},
        { data: 'name' },
        { data: 'language'},
        { data: 'version' },
        {
          "data": null,
          "render": function(data, type, row) {
                    return'<button id="delete-btn" onclick="deleteRecord(' + row.id + ')">Delete</button>';
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
     
    $('#myTable tbody').on('click', 'td', function () {
      var cell = table.cell(this);
      var columnIndex = cell.index().column;
      var rowIndex = cell.index().row;

      // Check if the clicked cell is editable (modify this condition based on your needs)
      if (columnIndex !== 0) { // Example: Allow editing all columns except the first one (ID)
          var currentData = cell.data();
          var inputType = columnIndex === 3 ? 'number' : 'text'; // Assuming the last column is numeric

          cell.data('<input type="' + inputType + '" class="inline-edit" value="' + currentData + '">').draw();

          // Focus on the input field and bind blur event
          $('.inline-edit').focus().blur(function () {
              var newValue = $(this).val();
              cell.data(newValue).draw();
          });
      }
  });
});
