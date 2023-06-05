console.log("Hey there");

let result = 0;
let currNum = "0";

let lastOp = "+";

let currChar = "";
operations = ["+", "-", "/", "x","="];

function calculations() {
  if (operations.includes(currChar)) {
    if (lastOp == "+") result += parseFloat(currNum);
    else if (lastOp == "-") result -= parseFloat(currNum);
    else if (lastOp == "x") result *= parseFloat(currNum);
    else if (lastOp == "/") result /= parseFloat(currNum);
    
    
    else if (currChar == "=") {
      console.log(result);
      if (lastOp == "+") result += parseFloat(currNum);
      else if (lastOp == "-") result -= parseFloat(currNum);
      else if (lastOp == "x") result *= parseFloat(currNum);
      else if (lastOp == "/") result /= parseFloat(currNum);

      let x = document.getElementsByClassName("results");
      x[0].innerHTML = result;
      result = 0;
      currNum = "0";
    }

    lastOp = currChar;
    currNum = "";
  } 
  else if (currChar == "x>") {
    currNum = currNum.substring(0, currNum.length - 1);
  }
  else {
    currNum += currChar;
    console.log(currChar, currNum);
  }
  document.getElementById("input").innerHTML = currNum;
  if (currChar == "=" || currNum==0) document.getElementById("input").innerHTML = 0;
}

Array.from(document.getElementsByTagName("button")).forEach((element) => {
  element.addEventListener("click", (e) => {
    let val = e.target.id;
    // console.log(val);
    // console.log("reached here");
    currChar = val;
    calculations();
  });
});
