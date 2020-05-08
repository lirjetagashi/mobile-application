/**
 * File Name: LSglobal.js
 *
 * Revision History:
 *       Lirjeta Gashi, Sara Asefi, 2020-04-16 : Created
 */

function lsCalculatePrice() {
    var guests = $("#lsGuestsA").val();

    var price = guests * 500;
    price = String(price).concat(" $");
    $("#lsPriceA").val(price);
}
function lsCalculatePriceEdit() {
    var guests = $("#lsGuestsE").val();

    var price = guests * 500;
    price = String(price).concat(" $");
    $("#lsPriceE").val(price);
}

function lsAddCustomer() {
    // 1. check the validation of the form
    if(lsDoValidation_LSAddForm()){
        console.info("Form is valid");

        // 2.fetch data from the form if it is valid
        var instruction = "";
        var firstName = $("#lsFirstA").val();
        var lastName = $("#lsLastA").val();
        var email = $("#lsEmailA").val();
        var phone = $("#lsPhoneA").val();
        var destination = $("#lsDestinationA").val();
        var departDate = $("#lsDepartDateA").val();
        var returnDate = $("#lsReturnDateA").val();
        var guests = $("#lsGuestsA").val();
        var hasInstruction = $("#lsCheckA").prop("checked");
        if (hasInstruction === true){
            instruction = $("#lsInstructionA").val();
        }

        // 3.save data to the table
        var options = [firstName, lastName, email, phone, destination, departDate, returnDate, guests, hasInstruction, instruction];
        function callback(){
            alert ("New Customer Added successfully");
        }
        Customer.insert(options, callback);
    }
    else{
        console.error("Form is invalid");
    }
}

function lsUpdateDestinationDropdown() {
    var options = [];

    function callback(tx, results) {
        var cboType = $("#lsDestinationA");
        var htmlCode;

        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);
            console.info("id: " + row['id'] + " name: " + row['name']);
            htmlCode += '<option value="' + row.id + '">' + row.name + '</option>';

        }
        cboType.append(htmlCode);
        cboType.html(htmlCode).val(3).change();
    }
    Destination.selectAll(options, callback);
}
function lsGetCustomers() {

    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            var price = row['guests'] * 500;

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>" + row['firstName'] + " " + row['lastName'] + "</h1>" +
                "<p>Email: " + row['email'] + "</p>" +
                "<p>Price: " + "$" + price + "</p>" +
                "<p>Number of guests: " + row['guests'] + "</p>" +
                "</a></li>";
        }
        var customersList = $("#lsCustomersList");
        customersList = customersList.html(htmlCode);
        customersList.listview("refresh");

        $("#lsCustomersList a").on("click", lsClickHandler);

        function lsClickHandler() {
            var id = $(this).attr("data-row-id");
            localStorage.setItem("id", id);
            $(location).prop("href", "#lsEditCustomerPage")
        }

    }

    Customer.selectAll(options, callback);

}

function lsShowCurrentCustomer() {

    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx,results){
        var row = results.rows.item(0);
        var option = [];

        function callback2(tx, results) {
            var htmlCode = "";

            for(let i=0;i< results.rows.length; i++){
                const id = results.rows.item(i).id;
                const name = results.rows.item(i).name;
                htmlCode += `<option value='${id}'>${name}</option>`;
            }

            $("#lsDestinationE").html(htmlCode).val(row['destinationId']).change();
        }

        Destination.selectAll(option, callback2);

        var price = row['guests'] * 500;

        $("#lsFirstE").val(row['firstName']);
        $("#lsLastE").val(row['lastName']);
        $("#lsEmailE").val(row['email']);
        $("#lsPhoneE").val(row['phone']);
        $("#lsDepartDateE").val(row['departDate']);
        $("#lsReturnDateE").val(row['returnDate']);
        $("#lsGuestsE").val(row['guests']);
        $("#lsPriceE").val(price);

        if(row['hasInstruction'] === 'true'){
            $("#lsCheckE").prop("checked", true);
            $("#lsRatingDivE").show();
            $("#lsInstructionE").val(row['instruction']);

        }
        else if(row['hasInstruction'] === 'false'){
            $("#lsCheckE").prop("checked", false);
            $("#lsRatingDivE").hide();
            $("#lsInstructionE").val("");
        }
        $("#lsEditForm :checkbox").checkboxradio("refresh");

    }
    Customer.select(options,callback);
}
function lsUpdateCustomer() {
    if(lsDoValidation_LSEditForm()){
        console.info("Form is valid");

        var id = localStorage.getItem("id");
        var instruction = "";
        var firstName = $("#lsFirstE").val();
        var lastName = $("#lsLastE").val();
        var email = $("#lsEmailE").val();
        var phone = $("#lsPhoneE").val();
        var destination = $("#lsDestinationE").val();
        var departDate = $("#lsDepartDateE").val();
        var returnDate = $("#lsReturnDateE").val();
        var guests = $("#lsGuestsE").val();
        var hasInstruction = $("#lsCheckE").prop("checked");
        if (hasInstruction === true){
            instruction = $("#lsInstructionE").val();
        }

        // 3.save data to the table
        var options = [firstName, lastName, email, phone, destination, departDate, returnDate, guests, hasInstruction, instruction, id];
        function callback(){
            alert ("Record updated successfully");
            $(location).prop("href", "#lsViewCustomerPage");
        }
        Customer.update(options, callback);

    }
    else{
        console.info("Form is not valid");
    }
}
function lsDeleteCustomer() {
    var id = localStorage.getItem("id");

    var options = [id];

    function callback() {
        alert("Record deleted successfully");
        $(location).prop("href", "#lsViewCustomerPage");
    }

    Customer.delete(options, callback);

}
function lsCancelCustomer() {
    $(location).prop("href", "#lsViewCustomerPage");
}

function lsClearDatabase() {
    var result = confirm("Really want to clear database?");
    try {
        if (result) {
            DB.dropTables();
            alert("Database cleared");
        }
    } catch (e) {
        alert(e);
    }
}
