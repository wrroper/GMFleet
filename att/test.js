/**
 * Created with IntelliJ IDEA.
 * User: Lacutis
 * Date: 1/6/13
 * Time: 12:40 PM
 * To change this template use File | Settings | File Templates.
 */


    var callJson = new Object();
    callJson.SEND_TYPE = "SST";
    callJson.numberToDial = "7027699388";
    callJson.msg = "the sky is falling... again!";
    callJson.customerName = "Vin Diesel";
    $.ajax({
        type: "POST",
        headers: {"Authorization": "Bearer 64a0f4049d81a96aa5716cbad3e2fb9a"},
        url: "https://api.att.com/rest/1/Sessions",
        crossDomain: true,
        data: callJson,
        success: function(responseData) {
            alert(responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            alert("Error" + JSON.stringify(responseData));
        }
    });
