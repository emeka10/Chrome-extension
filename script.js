let names = []
let dates = []
let amounts = []
let links = []
let cTab = []
let itemsToBuy = {}
const nameEl = document.getElementById("name-el")
const dateEl = document.getElementById("date-el")
const amountEl = document.getElementById("amount-el")
const linkEl = document.getElementById("link-el")
const saveBtn = document.getElementById("save-btn")
const dltBtn = document.getElementById("dlt-btn")
const cpyBtn = document.getElementById("cpy-btn")
const tableEl = document.getElementById("table-el")
const namesFromLocalStorage = JSON.parse( localStorage.getItem("names") )
const datesFromLocalStorage = JSON.parse( localStorage.getItem("dates") )
const amountsFromLocalStorage = JSON.parse( localStorage.getItem("amounts") )
const linksFromLocalStorage = JSON.parse( localStorage.getItem("links") )

if (namesFromLocalStorage && datesFromLocalStorage && amountsFromLocalStorage && linksFromLocalStorage) {
    names = namesFromLocalStorage
    dates = datesFromLocalStorage
    amounts = amountsFromLocalStorage
    links = linksFromLocalStorage
    render()
}

function render() {
    itemsToBuy = {
        name : names,
        date : dates,
        amount : amounts,
        link : links
    }
    let listeditems = ""
    let nam = ""
    let dat = ""
    let amt = ""
    let lin = "" 
    let datLen = itemsToBuy.date.length
    let namLen = itemsToBuy.name.length
    let amtLen = itemsToBuy.amount.length
    let linLen = itemsToBuy.link.length
    for (let i = 0; i < namLen && datLen && amtLen && linLen; i++) {
        nam = itemsToBuy.name[i]
        dat = itemsToBuy.date[i]
        amt = itemsToBuy.amount[i]
        lin = itemsToBuy.link[i]
        listeditems +=`
                <tr>
                    <td id='row1'>${nam}</td>
                    <td>${dat}</td>
                    <td id='row3'>${amt}</td>
                    <td><a href='${lin}'>${lin}</a></td>
                </tr>
        `
    }
    tableEl.innerHTML = listeditems
    
            
}

cpyBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        cTab.push(tabs[0].url)
        linkEl.value = cTab
    })
})

dltBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    names = []
    dates = []
    amounts = []
    links = []
    render()
})

saveBtn.addEventListener("click", function() {
    names.push(nameEl.value)
    dates.push(dateEl.value)
    amounts.push(amountEl.value)
    links.push(linkEl.value)
    nameEl.value = ""
    dateEl.value = ""
    amountEl.value = ""
    linkEl.value = ""
    localStorage.setItem("names", JSON.stringify(names))
    localStorage.setItem("dates", JSON.stringify(dates))
    localStorage.setItem("amounts", JSON.stringify(amounts))
    localStorage.setItem("links", JSON.stringify(links))
    render()
})
