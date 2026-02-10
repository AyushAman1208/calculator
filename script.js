// Pure calculation helper
function compute(a, op, b) {
  a = Number(a);
  b = Number(b);
  if (isNaN(a) || isNaN(b)) return NaN;
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "/":
      return b === 0 ? Infinity : a / b;
    default:
      return NaN;
  }
}

// DOM wiring — only run in browser
if (typeof document !== "undefined") {
  let result = null;
  let currNum = "0";
  let lastOp = null;

  const inputEl = document.getElementById("input");
  const resultsEl = document.getElementsByClassName("results")[0];

  function updateDisplay() {
    inputEl.innerHTML = currNum || "0";
    resultsEl.innerHTML = result === null ? "" : result;
  }

  function handleOperator(op) {
    const num = parseFloat(currNum || "0");
    if (result === null) {
      result = num;
    } else if (lastOp) {
      result = compute(result, lastOp, num);
    }

    if (op === "=") {
      // show result and reset state so user can continue
      currNum = String(result);
      lastOp = null;
      result = null;
    } else {
      lastOp = op;
      currNum = "0";
    }
    updateDisplay();
  }

  Array.from(document.getElementsByTagName("button")).forEach((element) => {
    element.addEventListener("click", (e) => {
      const val = e.target.id;

      if (/^\d$/.test(val)) {
        // digit
        if (currNum === "0") currNum = val;
        else currNum += val;
      } else if (val === ".") {
        if (!currNum.includes('.')) currNum += ".";
      } else if (val === "del") {
        currNum = currNum.length > 1 ? currNum.slice(0, -1) : "0";
      } else if (val === "C") {
        currNum = "0";
        result = null;
        lastOp = null;
      } else if (["+", "-", "x", "/", "="].includes(val)) {
        handleOperator(val);
      }

      updateDisplay();
    });
  });

  updateDisplay();
}

// export for Node tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = { compute };
}
