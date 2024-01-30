$(document).ready(function() {

  //Reading Data from json file
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
          "render": function(row) {
                    return'<button id="delete-btn" onclick="deleteRecord(' + row.id + ')">Delete</button>';
          }
        }
      ]
    });
   

    
    //Delete operation on table
    var table = $('#myTable').DataTable();
    $('#myTable tbody').on( 'click', '#delete-btn', function () {
     
        let text = "Are you sure you want to delete this row?";
        if (confirm(text) == true) {
          table
          .row( $(this).parents('tr') )
          .remove()
          .draw();
        } else {
          alert("You canceled!");
        }
       
    });

           // Open the dialog on button click
           $("#addRowBtn").on("click", function () {
            $("#dialog-form").dialog("open");
        });

        // Define the dialog
        $("#dialog-form").dialog({
            autoOpen: false,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Add Row": function () {
                    // Validate and add the new row
                    addRow();
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            },
            close: function () {
                // Reset the form on close
                $("#addRowForm")[0].reset();
            }
        });

        // Event listener for form submission to add a new row
        $("#addRowForm").submit(function (event) {
            event.preventDefault();
            addRow();
            $("#dialog-form").dialog("close");
        });

        function addRow() {
            // Generate a unique ID (you may use a function to generate IDs)
            var newId = Date.now().toString();

            // Get form values
            var newName = $("#name").val();
            var newLanguage = $("#language").val();
            var newVersion = $("#version").val();

            // Add a new row to the DataTable
            var newRowData = {
                id: newId,
                name: newName,
                language: newLanguage,
                version: newVersion
            };

            table.row.add(newRowData).draw();

        }

        //Edit the rows inline
        // $('#myTable tbody').on('dblclick', 'td', function () {
        //   var cell = table.cell(this);
        //   var columnIndex = cell.index().column;
        //   var rowIndex = cell.index().row;
    
        //   if (columnIndex !== 0) { //Allow editing all columns except the first one (ID)
        //       var currentData = cell.data();
        //       var inputType = columnIndex === 3 ? 'number' : 'text'; // Assuming the last column is numeric
    
        //       cell.data('<input type="' + inputType + '" class="inline-edit" value="' + currentData + '">').draw();
    
        //       // Focus on the input field and bind blur event
        //       $('.inline-edit').focus().blur(function () {
        //         var newValue = $(this).val();
        //         let text = "Are you sure you want to edit this row?";
        //           if (confirm(text) == true) {
        //             cell.data(newValue).draw();
        //        } else {
        //        alert("You canceled!");
        //        }
                 
        //       });
        //     }
        //     });


        // Inline editing
          $('#myTable tbody').on('dblclick', 'td:not(:first-child)', function() {
            var cell = table.cell(this);
            var columnIndex = cell.index().column;
            var rowIndex = cell.index().row;

            var currentData = cell.data();
            var inputType = columnIndex === 3 ? 'number' : 'text';

            var cellIdentifier = 'cell-' + rowIndex + '-' + columnIndex;

            cell.data('<input type="' + inputType + '" class="inline-edit" data-cell-id="' + cellIdentifier + '" value="' + currentData + '">').draw();

            var $inputField = $('.inline-edit[data-cell-id="' + cellIdentifier + '"]');

            // Focus on the input field and bind blur event
            $inputField.focus().blur(function() {
                handleInlineEdit(cell, currentData, cellIdentifier);
            });

            // Bind keypress event to detect Enter key
            $inputField.keypress(function(event) {
                if (event.which === 13) { // Enter key
                    handleInlineEdit(cell, currentData, cellIdentifier);
                }
            });
          });

          function handleInlineEdit(cell, currentData, cellIdentifier) {
            var newValue = $('.inline-edit[data-cell-id="' + cellIdentifier + '"]').val();
            let text = "Are you sure you want to edit this row?";
            if (confirm(text) == true) {
                cell.data(newValue).draw();
                // Update local storage with the modified data
                updateLocalStorage();
            } else {
                cell.data(currentData).draw();
            }
          }

              
        

          });