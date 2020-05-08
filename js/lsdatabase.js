/**
 * File Name: lsdatabase.js
 *
 * Revision History:
 *       Lirjeta Gashi, Sara Asefi, 2020-04-16 : Created
 */

var db;

function errorHandler(tx, error){
    console.error("SQL Error: " + tx + " ( " + error.code + ") -- " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "LSAirlineDatabase";
        var version = "1.0";
        var displayName = "DB for LSAirline app";
        var dbSize = 2 * 1024 *1024;

        function dbCreateSuccess() {
            console.info("Success: Database creation successful");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        function txFunction(tx) {
            var options = [];

            function successCallbackDropType() {
                console.info("Success: Table dropped successful");
            }
            var sqlDropDestination = "DROP TABLE IF EXISTS destination; ";
            tx.executeSql(sqlDropDestination, options, successCallbackDropType, errorHandler);

            function successCallbackCreateDestination() {
                console.info("Success: Table destination created successful");
            }
            var sqlCreateDestination = "CREATE TABLE IF NOT EXISTS destination( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL); ";
            tx.executeSql(sqlCreateDestination, options, successCallbackCreateDestination, errorHandler);

            function successCallbackInsertType() {
                console.info("Success: insert into destination table successful");
            }
            var sqlInsertBora = "INSERT INTO destination (name) VALUES ('Bora Bora'); ";
            tx.executeSql(sqlInsertBora, options, successCallbackInsertType, errorHandler);

            var sqlInsertCaribbean = "INSERT INTO destination (name) VALUES ('Caribbean'); ";
            tx.executeSql(sqlInsertCaribbean, options, successCallbackInsertType, errorHandler);

            var sqlInsertSantorini = "INSERT INTO destination (name) VALUES ('Santorini'); ";
            tx.executeSql(sqlInsertSantorini, options, successCallbackInsertType, errorHandler);

            var sqlInsertCuba = "INSERT INTO destination (name) VALUES ('Cuba'); ";
            tx.executeSql(sqlInsertCuba, options, successCallbackInsertType, errorHandler);

            var sqlInsertMiami = "INSERT INTO destination (name) VALUES ('Miami'); ";
            tx.executeSql(sqlInsertMiami, options, successCallbackInsertType, errorHandler);

            function successCallbackCreateCustomer() {
                console.info("Success: Table customer created successful");
            }
            var sqlCreateCustomer = "CREATE TABLE IF NOT EXISTS customer( " +
                "id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT," +
                "firstName VARCHAR(30) NOT NULL," +
                "lastName VARCHAR(30) NOT NULL," +
                "email VARCHAR(30)," +
                "phone VARCHAR(15)," +
                "destinationId INTEGER NOT NULL," +
                "departDate DATE," +
                "returnDate DATE," +
                "guests INTEGER," +
                "hasInstruction VARCHAR(1)," +
                "instruction TEXT," +
                "FOREIGN KEY(destinationId) REFERENCES destination(id)); ";

            tx.executeSql(sqlCreateCustomer, options, successCallbackCreateCustomer, errorHandler);
        }

        function saSuccessTransaction() {
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, saSuccessTransaction);

    },
    dropTables: function(){
        function txFunction(tx) {
            var sqlDropType = "DROP TABLE IF EXISTS destination; ";
            var optionsType = [];
            function successTypeCallback() {
                console.info("Success: table destination dropped successfully");
            }
            tx.executeSql(sqlDropType, optionsType, successTypeCallback, errorHandler);

            var sqlDropReview = "DROP TABLE IF EXISTS customer; ";
            var optionsReview = [];
            function successReviewCallback() {
                console.info("Success: table customer dropped successfully");
            }
            tx.executeSql(sqlDropReview, optionsReview, successReviewCallback, errorHandler);
        }
        function saSuccessTransaction() {
            console.info("Success: transaction successful");

        }

        db.transaction(txFunction, errorHandler, saSuccessTransaction);
    }
};
