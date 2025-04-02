let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const change = document.getElementById("change-due");
const sale = document.getElementById("purchase-btn");

let currencyUnits = [
  ['PENNY', .01],
  ['NICKEL', .05],
  ['DIME', .1],
  ['QUARTER', .25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

sale.addEventListener("click", (e) => {
  e.preventDefault();
  const cashValue = parseFloat(cash.value); 
  const changeDue = cashValue - price;
  
  if (cashValue < price) {
  alert("Customer does not have enough money to purchase the item");
  return;
  };
  
  if (cashValue === price) {
    change.innerText = "No change due - customer paid with exact cash"
    return;
  };

  const changeResult = getChange(changeDue, cid);

  if(changeResult.status === "INSUFFICIENT_FUNDS") {
    change.innerText = `Status: ${changeResult.status} ${changeResult.change}`
  } else {
    
    let changeText = `Status: ${changeResult.status} ${formatChange(changeResult.change)}`;
    change.innerText = changeText;
  }

});

const getChange = (changeDue, cid) => {
    let totalCid = parseFloat(cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2));

    if (totalCid < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    
    if (totalCid === changeDue) {
        return { 
            status: "CLOSED", 
            change: cid.filter(([_, amount]) => amount > 0).reverse()
        };
    }

    let changeArray = [];
    let remainingChange = Math.round(changeDue * 100); // Convert to cents

    let updatedCid = cid.map(([unit, amount]) => [unit, Math.round(amount * 100)]); // Convert drawer to cents

    for (let i = currencyUnits.length - 1; i >= 0; i--) {
        let unit = currencyUnits[i][0];
        let unitValue = Math.round(currencyUnits[i][1] * 100); // Convert to cents
        let unitInDrawer = updatedCid[i][1];

        if (unitValue <= remainingChange && unitInDrawer > 0) {
            let amountFromUnit = 0;

            while (remainingChange >= unitValue && unitInDrawer > 0) {
              
              remainingChange = parseFloat((remainingChange - unitValue).toFixed(2));
              unitInDrawer -= unitValue;
              amountFromUnit += unitValue;
            }
            remainingChange = parseFloat(remainingChange); // Ensure it stays a number

            if (amountFromUnit > 0) {
                changeArray.push([unit, amountFromUnit / 100]); // Convert back to dollars
            }
        }
    }

    if (remainingChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (changeDue === totalCid / 100) {
        return { status: "CLOSED", change: cid.reverse() };
    }

    return { status: "OPEN", change: changeArray };
}; // end of getChange

const formatChange = changeArray =>
    changeArray
        
        .filter(([_, amount]) => amount > 0)
        .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
        .join(" ");

