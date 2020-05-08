/**
 * File Name: lsutil.js
 *
 * Revision History:
 *       Lirjeta Gashi, Sara Asefi, 2020-04-16 : Created
 */

function lsDoValidation_LSAddForm() {
    var form = $("#LSAddForm");
    form.validate({
        rules:{
            lsFirstA:{
                required: true,
                rangelength : [2, 20]
            },
            lsLastA:{
                required: true,
                rangelength : [2, 20]
            },
            lsEmailA:{
                required: true,
                email: true
            },
            lsPhoneA:{
                required: true,
                phonecheck: true
            },
            lsDepartDateA:{
                required: true,
                dateCheck: true

            },
            lsReturnDateA:{
                required: true,
                returnDateCheck: true
            },
            lsGuestsA:{
                required: true,
                min: 1
            }
        },
        messages:{
            lsFirstA:{
                required: "First name should be provided",
                rangelength : "First name has to be between 2-20 characters"
            },
            lsLastA:{
                required: "Last name should be provided",
                rangelength : "Last name has to be between 2-20 characters"
            },
            lsEmailA:{
                required: "Email should be provided",
                email: "Email should be valid"
            },
            lsPhoneA:{
                required: "Phone number should be provided",
                phonecheck: "Phone number must be valid, ex: 123-123-1234"
            },
            lsDepartDateA:{
                required: "Departure date should be provided",
                dateCheck: "Departure date has to be in the future"
            },
            lsReturnDateA:{
                required: "Return date should be provided",
                returnDateCheck: "Return date cannot be before departure date"
            },
            lsGuestsA:{
                required: "Number of guests should be provided",
                min: "Number of guests has to be at least 1"
            }
        }
    });
    return form.valid();
}


function lsDoValidation_LSEditForm() {
    var form = $("#lsEditForm");
    form.validate({
        rules:{
            lsFirstE:{
                required: true,
                rangelength : [2, 20]
            },
            lsLastE:{
                required: true,
                rangelength : [2, 20]
            },
            lsEmailE:{
                required: true,
                email: true
            },
            lsPhoneE:{
                required: true,
                phonecheck: true
            },
            lsDepartDateE:{
                required: true,
                dateCheck: true

            },
            lsReturnDateE:{
                required: true,
                returnDateEditCheck: true
            },
            lsGuestsE:{
                required: true,
                min: 1
            }
        },
        messages:{
            lsFirstE:{
                required: "First name should be provided",
                rangelength : "First name has to be between 2-20 characters"
            },
            lsLastE:{
                required: "Last name should be provided",
                rangelength : "Last name has to be between 2-20 characters"
            },
            lsEmailE:{
                required: "Email should be provided",
                email: "Email should be valid"
            },
            lsPhoneE:{
                required: "Phone number should be provided",
                phonecheck: "Phone number must be valid, ex: 123-123-1234"
            },
            lsDepartDateE:{
                required: "Departure date should be provided",
                dateCheck: "Departure date has to be in the future"
            },
            lsReturnDateE:{
                required: "Return date should be provided",
                returnDateEditCheck: "Return date cannot be before departure date"
            },
            lsGuestsE:{
                required: "Number of guests should be provided",
                min: "Number of guests has to be at least 1"
            }
        }
    });
    return form.valid();
}



jQuery.validator.addMethod("dateCheck", function (value, element) {

        var year = Number(value.substr(0,4));
        var month = Number(value.substr(5, 2)) - 1;
        var day = Number(value.substr(8,2));

        var myDate = new Date(year, month, day);
        var todayDate = new Date();

        if(myDate >= todayDate){
            return true
        }
        return  false;
    },
    "Date has to be in the future");

jQuery.validator.addMethod("returnDateCheck", function (value, element) {
        var departureDate = $("#lsDepartDateA").val();
        if(new Date(value).getTime() >= new Date(departureDate).getTime()){
            return true
        }
        return  false;
    },
    "Return date has to be after departure date");

jQuery.validator.addMethod("returnDateEditCheck", function (value, element) {
        var departureDate = $("#lsDepartDateE").val();
        if(new Date(value).getTime() >= new Date(departureDate).getTime()){
            return true
        }
        return  false;
    },
    "Return date has to be after departure date");

jQuery.validator.addMethod("phonecheck",
    function(value, element){
        var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return this.optional(element) || regex.test(value);
    },
    "custom password checker"
);
