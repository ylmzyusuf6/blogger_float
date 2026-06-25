const history = [
{
    image:"https://community.fastly.steamstatic.com/economy/image/class/730/188530139/96fx96f",
    item:"AK-47 Redline FT",
    action:"BUY",
    date:"25.06.2026",
    buy:"12.50",
    sell:""
}
];

const inventory = [
{
    image:"https://community.fastly.steamstatic.com/economy/image/class/730/188530139/96fx96f",
    item:"AK-47 Redline FT"
}
];

render();

function render(){

    const historyTable =
        document.getElementById("historyTable");

    historyTable.innerHTML="";

    history.forEach(row=>{

        historyTable.innerHTML += `
        <tr>
            <td>
                <img class="item-image"
                     src="${row.image}">
            </td>

            <td>${row.item}</td>

            <td>${row.action}</td>

            <td>${row.date}</td>

            <td>$${row.buy}</td>

            <td>${row.sell ? "$"+row.sell : "-"}</td>
        </tr>
        `;
    });

    const inventoryList =
        document.getElementById("inventoryList");

    inventoryList.innerHTML="";

    inventory.forEach(item=>{

        inventoryList.innerHTML += `
        <div class="inventory-item">

            <img class="item-image"
                 src="${item.image}">

            <div>${item.item}</div>

        </div>
        `;
    });
}
