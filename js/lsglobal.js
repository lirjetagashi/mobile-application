/**
 * File Name: lsglobal.js
 *
 * Revision History:
 *       Lirjeta Gashi, Sara Asefi, 2020-04-16 : Created
 */

function lsBtnSave_click() {
    lsAddCustomer();
}

function lsViewCustomersPage_show() {
    lsGetCustomers();
}
function lsBtnUpdate_click() {
    lsUpdateCustomer();
}

function lsCheckAdd_check() {
    if($("#lsCheckA").is(":checked")){
        $("#lsRatingDivA").show();
    }
    else{
        $("#lsRatingDivA").hide();
    }
}

function lsCheckEdit_check() {
    if($("#lsCheckE").is(":checked")){
        $("#lsRatingDivE").show();
    }
    else{
        $("#lsRatingDivE").hide();
    }
}
function lsEditCustomerPage_show() {
    lsShowCurrentCustomer();
}
function lsBtnDelete_click() {
    lsDeleteCustomer();
}
function lsBtnCancel_click() {
    lsCancelCustomer();
}

function lsPriceAdd_click() {
    lsCalculatePrice();
}
function lsPriceEdit_click() {
    lsCalculatePriceEdit();
}
function lsBtnClearDatabase_click() {
    lsClearDatabase();
}

function lsAddCustomerPage_show() {
    lsUpdateDestinationDropdown();
}

function lsBtnShow_click() {
    getPosition();
}

function init() {
    console.info("DOM is ready");

    $("#lsRatingDivE").hide();

    $("#lsCheckA").on("click", lsCheckAdd_check);
    $("#lsCheckE").on("click", lsCheckEdit_check);
    $("#lsGuestsA").on("change", lsPriceAdd_click );
    $("#lsGuestsE").on("change", lsPriceEdit_click );


    $("#lsBtnSave").on("click", lsBtnSave_click);
    $("#lsBtnUpdate").on("click", lsBtnUpdate_click);
    $("#lsBtnDelete").on("click", lsBtnDelete_click);
    $("#lsBtnCancel").on("click", lsBtnCancel_click);
    $("#btnShow").on("click", lsBtnShow_click);

    $("#lsAddCustomerPage").on("pageshow", lsAddCustomerPage_show);
    $("#lsBtnClearDatabase").on("click", lsBtnClearDatabase_click);
    $("#lsViewCustomerPage").on("pageshow", lsViewCustomersPage_show);
    $("#lsEditCustomerPage").on("pageshow", lsEditCustomerPage_show);


}

function initDB(){
    console.info("Creating Database... ");
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.createTables();
        }
        else{
            console.error("Error: cannot create tables: Database is not available");
        }
    } catch (e) {
        console.error("Error:  (Fatal) Error in initDB(). Cannot proceed");
    }
}

$(document).ready(function () {
    init();
    initDB();
});

