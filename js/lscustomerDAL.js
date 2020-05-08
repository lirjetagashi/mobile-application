/**
 * File Name: lsCustomerDAL.js
 *
 * Revision History:
 *       Lirjeta Gashi, Sara Asefi, 2020-04-16 : Created
 */

var Customer = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO customer(firstName, lastName, email, phone, destinationId, departDate, returnDate, guests, hasInstruction, instruction) values(?,?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    selectAll: function (options, callback){
        function txFunction(tx){
            var sql="SELECT * FROM customer;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    select: function (options,callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM customer WHERE id=?; ";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    update: function (options, callback){
        function txFunction(tx){

            var sql = "UPDATE customer SET firstName=?, lastName=?, email=?, phone=?,destinationId=?, departDate=?, returnDate=?, guests=?, hasInstruction=?, instruction=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);

        }
        function successTransaction() {
            console.info("Success: Transaction")
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },

    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM customer WHERE id=?; ";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


var Destination = {
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM destination;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Transaction successful");


        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
