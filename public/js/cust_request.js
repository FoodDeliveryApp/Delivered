var accepted = [];
var denied = [];

function loadTableData(customers) {
    const tableBody = document.getElementById('customersDataTable');
    let dataHtml = '';
    var i = 1;

    dataHtml += `<form>`
    for (let customer of customers) {

        dataHtml +=
            `<div id="customer">
            <input type="checkbox" class="customerrequest100-btn" name="customer1" value="${customer.last_name}"> ${customer.first_name} ${customer.last_name}<br>
           
            </div>
        </div>`;
        i = i + 2;
    }
    dataHtml += `</form>`
    tableBody.innerHTML = dataHtml;
}


function buildAcceptedList() {
    var customers = document.forms[0];
    var i;
    for (i = 0; i < customers.length; i++) {
        if (customers[i].checked) {
            let request = {}
            request.lname = customers[i].value;
            fetch("http://localhost:8080/updateIsConfermedCust", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(request) });
        }
    }
    window.location.href = 'http://localhost:8080/CustomerRequest';
}

function moveToBlacklist() {
    var customers = document.forms[0];
    var i;
    for (i = 0; i < customers.length; i++) {
        if (customers[i].checked) {
            let request = {}
            request.lname = customers[i].value;
            fetch("http://localhost:8080/moveToBlacklist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(request) });
        }
    }
    window.location.href = 'http://localhost:8080/CustomerRequest';
}



