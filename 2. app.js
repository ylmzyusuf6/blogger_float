console.log("CSFLOAT CLONE LOADED");

let activeAccount = "ANA HESAP";

let db = JSON.parse(localStorage.getItem("csfloat_db")) || {};

// INIT DEFAULT ACCOUNT
if (!db["ANA HESAP"]) {
    db["ANA HESAP"] = { history: [], inventory: [] };
}

// -------------------
function save(){
    localStorage.setItem("csfloat_db", JSON.stringify(db));
}

function getData(){
    if(!db[activeAccount]){
        db[activeAccount] = { history: [], inventory: [] };
    }
    return db[activeAccount];
}

// -------------------
function render(){

    const data = getData();

    const historyTable = document.getElementById("historyTable");
    const inventoryList = document.getElementById("inventoryList");

    historyTable.innerHTML = "";
    inventoryList.innerHTML = "";

    data.history.forEach(h => {
        historyTable.innerHTML += `
        <tr>
            <td>${h.item}</td>
            <td>${h.type}</td>
            <td>${h.date}</td>
            <td>${h.buy || "-"}</td>
            <td>${h.sell || "-"}</td>
        </tr>
        `;
    });

    data.inventory.forEach(i => {
        inventoryList.innerHTML += `<div>${i.item}</div>`;
    });
}

// -------------------
let mode = null;

function openModal(type){
    mode = type;
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modalTitle").innerText = type;
}

function closeModal(){
    document.getElementById("modal").classList.add("hidden");
}

// -------------------
document.getElementById("buyBtn").onclick = () => openModal("BUY");
document.getElementById("sellBtn").onclick = () => openModal("SELL");

// CONFIRM
document.getElementById("confirmBtn").onclick = () => {

    const item = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;
    const image = document.getElementById("itemImage").value;

    const data = getData();

    if(mode === "BUY"){

        data.history.push({
            item,
            type:"BUY",
            date:new Date().toLocaleDateString(),
            buy:price,
            sell:""
        });

        data.inventory.push({ item, image });

    }

    if(mode === "SELL"){

        const index = data.inventory.findIndex(x => x.item === item);

        if(index === -1) return alert("Item yok");

        data.history.push({
            item,
            type:"SELL",
            date:new Date().toLocaleDateString(),
            buy:"",
            sell:price
        });

        data.inventory.splice(index,1);
    }

    save();
    render();
    closeModal();
};

// -------------------
// ACCOUNT SWITCH
document.querySelectorAll(".account").forEach(acc => {
    acc.onclick = () => {

        document.querySelectorAll(".account").forEach(a => a.classList.remove("active"));
        acc.classList.add("active");

        activeAccount = acc.innerText;

        render();
    };
});

// INIT
render();
