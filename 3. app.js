console.log("APP JS LOADED");

let activeAccount = "ANA HESAP";

// local database
let db = JSON.parse(localStorage.getItem("csfloat_db")) || {};

// DEMO INITIAL DATA (ilk açılış için)
if (!db["ANA HESAP"]) {
    db["ANA HESAP"] = {
        history: [
            {
                image: "https://community.fastly.steamstatic.com/economy/image/class/730/188530139/96fx96f",
                item: "AK-47 Redline FT",
                action: "BUY",
                date: "25.06.2026",
                buy: "12.50",
                sell: ""
            }
        ],
        inventory: [
            {
                image: "https://community.fastly.steamstatic.com/economy/image/class/730/188530139/96fx96f",
                item: "AK-47 Redline FT"
            }
        ]
    };
}

// --------------------
// ACCOUNT DATA
// --------------------
function getAccountData() {
    if (!db[activeAccount]) {
        db[activeAccount] = {
            history: [],
            inventory: []
        };
    }
    return db[activeAccount];
}

// --------------------
// SAVE
// --------------------
function save() {
    localStorage.setItem("csfloat_db", JSON.stringify(db));
}

// --------------------
// RENDER
// --------------------
function render() {

    const data = getAccountData();

    const historyTable = document.getElementById("historyTable");
    const inventoryList = document.getElementById("inventoryList");

    if (!historyTable || !inventoryList) {
        console.log("DOM bulunamadı");
        return;
    }

    // HISTORY
    historyTable.innerHTML = "";

    data.history.forEach(row => {
        historyTable.innerHTML += `
        <tr>
            <td><img class="item-image" src="${row.image}"></td>
            <td>${row.item}</td>
            <td>${row.action}</td>
            <td>${row.date}</td>
            <td>$${row.buy || "-"}</td>
            <td>${row.sell ? "$" + row.sell : "-"}</td>
        </tr>
        `;
    });

    // INVENTORY
    inventoryList.innerHTML = "";

    data.inventory.forEach(item => {
        inventoryList.innerHTML += `
        <div class="inventory-item">
            <img class="item-image" src="${item.image}">
            <div>${item.item}</div>
        </div>
        `;
    });
}

// --------------------
// BUY
// --------------------
function openBuy() {

    const item = prompt("Item adı?");
    const price = prompt("Alış fiyatı?");
    const image = prompt("Görsel URL?");

    const data = getAccountData();

    data.history.push({
        image,
        item,
        action: "BUY",
        date: new Date().toLocaleDateString(),
        buy: price,
        sell: ""
    });

    data.inventory.push({
        image,
        item
    });

    save();
    render();
}

// --------------------
// SELL
// --------------------
function openSell() {

    const data = getAccountData();

    const itemName = prompt("Satılacak item adı?");

    const index = data.inventory.findIndex(i => i.item === itemName);

    if (index === -1) {
        alert("Item bulunamadı");
        return;
    }

    const sellPrice = prompt("Satış fiyatı?");

    const item = data.inventory[index];

    data.history.push({
        image: item.image,
        item: itemName,
        action: "SELL",
        date: new Date().toLocaleDateString(),
        buy: "",
        sell: sellPrice
    });

    data.inventory.splice(index, 1);

    save();
    render();
}

// --------------------
// BUTTON EVENTS
// --------------------
document.getElementById("buyBtn")?.addEventListener("click", openBuy);
document.getElementById("sellBtn")?.addEventListener("click", openSell);

// --------------------
// ACCOUNT SYSTEM (sidebar)
// --------------------
document.querySelectorAll(".account").forEach(acc => {
    acc.addEventListener("click", () => {

        document.querySelectorAll(".account")
            .forEach(a => a.classList.remove("active"));

        acc.classList.add("active");

        activeAccount = acc.innerText;

        render();
    });
});

// --------------------
// INIT
// --------------------
render();
