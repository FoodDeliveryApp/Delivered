////////////////////////////////////////////////////////////////////////////////////////////////
//                                     Bid for orders tab                                     //
////////////////////////////////////////////////////////////////////////////////////////////////

// no dependencies

function addRow() {

    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML = '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML = myName.value;
    row.insertCell(2).innerHTML = age.value;

}

function deleteRow(obj) {

    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);

}

function addTable() {

    var myTableDiv = document.getElementById("myDynamicTable");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < 4; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            td.appendChild(document.createTextNode("Cell " + i + "," + j));
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
}
function getBid() {
    var myNewBidAmount = document.getElementById("myNewBid").value;
    var myNewBid = new Bid(self.user_id, myNewBidAmount);
    //updateWinningBid(order, myNewBid);
    document.getElementById("myCurrentBid").innerHTML = myNewBidAmount;
    //document.getElementById("currentWinningBid").innerHTML = order.winning_bid;
}
function sortColumn(columnName, dataType) {
    sortDirection = !sortDirection;

    switch (dataType) {
        case Number:
            sortNumberColumn(sortDirection, columnName);
            break;
    }
    loadTableData(orderData);
}

function sortNumberColumn(sort, columnName) {
    orderData = orderData.sort((o1, o2) => {
        return sort ? o1[columnName] - o2[columnName] : o2[columnName] - o1[columnName]
    })
}

function loadTableData(orderData) {
    const tableBody = document.getElementById('tableData');
    let dataHtml = '';

    for (let order of orderData) {
        let winBid = order.winning_bid;
        if (isNaN(winBid)) { winBid = '-'; }
        dataHtml += `<tr>
            <td>${order.rating}</td>
            <td>${order.location}</td>
            <td id = "currentWinningBid">${winBid}</td>
            <td>${order.time_of_placement}</td>
            <td id = "myCurrentBid"></td>
            <td><input type="text" id="myNewBid" style="width:70px">
                <input type="button" onclick="getBid()" value=&#10003 style="width:40px">
            </td>
        </tr>`;
    }
    tableBody.innerHTML = dataHtml;
}


function countDown() {
    var counter = 60;
    var bidCountDown = setInterval(function () {
        //console.log(counter);
        counter--
        if (counter === 0) {
            //console.log("HAPPY NEW YEAR!!");
            clearInterval(bidCountDown);
        }
    }, 1000);
}

//create array of bids: order_id, delivery_person, amount
function updateWinningBid(order, new_bid) {
    if (order.winning_bid.amount < new_bid.amount) {
        order.winning_bid = new_bid;
    }
}

//update winners
function updateBiddingWinners(bidding_winners, order, winning_bid) {
    bidding_winners.set(order, winnin_bid);
}

function winningWindow() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}