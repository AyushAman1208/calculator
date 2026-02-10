# Calculator

A simple browser-based calculator (HTML/CSS/JS).

## Clone

Replace `<repo-url>` with your repository URL and run:

```bash
git clone <repo-url>
cd calculator
```

If you already have the folder locally, `cd` into it:

```bash
cd /home/ayush-aman/Documents/projects/personal/calculator
```

## Start server (Node)

Option A — Run using `npx http-server` (no global install):

```bash
npx http-server -p 8001
```

Open: http://localhost:8001

Option B — Install `http-server` as a dev dependency and add an npm script:

```bash
npm init -y
npm install --save-dev http-server
# package.json "scripts" section example:
# "scripts": { "start": "http-server -p 8001" }
npm run start
```

Option C — Install a global static server (one-time):

```bash
npm install -g http-server
http-server -p 8001
```

(You can use any static server you prefer; the app is plain HTML/JS/CSS.)

## How to use the calculator (UI)

- Click digits `0-9` to build a number.
- Click `.` to add a decimal point (only one per number).
- Click `+`, `-`, `x`, `/` to perform operations.
- Click `=` to compute the current result.
- Click `C` to clear all state.
- Click `⌫` (backspace) to remove the last digit.

Behavior details:
- Operations are evaluated sequentially (left-to-right). For example `2 + 3 x 4` will compute `(2 + 3)` then multiply by `4` (no operator precedence).
- Dividing by zero returns `Infinity` (consistent with JavaScript number semantics).
- After pressing `=`, the displayed value becomes the current input so you can continue calculations.

## Files of interest

- `index.html` — UI markup.
- `style.css` — Visual styles.
- `script.js` — Calculation logic and DOM wiring.
## Files of interest

- `index.html` — UI markup.
- `style.css` — Visual styles.
- `script.js` — Calculation logic and DOM wiring.

## Methodology & Code Logic

The code separates pure calculation logic from DOM handling:

- `compute(a, op, b)` is a pure function that:
  - Converts inputs to numbers and returns the arithmetic result for `+`, `-`, `x`, `/`.
  - Returns `Infinity` for division by zero and `NaN` for invalid inputs.

- Browser state and wiring (in `script.js`):
  - `currNum` stores the currently-entered number as a string.
  - `result` stores the accumulated numeric result (or `null` if none yet).
  - `lastOp` stores the pending operator to apply when the next number is entered.
  - `updateDisplay()` updates `#input` and `.results` with current values.
  - `handleOperator(op)` converts `currNum` to a number, applies `lastOp` (if any) using `compute()`, updates `result` and `lastOp`, and resets `currNum` appropriately. If `op` is `=` the result is displayed and internal state is reset so the user can continue.

- Input handling:
  - Digit buttons append to `currNum` (with a guard so leading zeros are handled sensibly).
  - `.` appends a decimal only if one is not already present.
  - `del` removes the last character of `currNum` (falling back to `0`).
  - `C` clears `currNum`, `result`, and `lastOp`.

- Testing:
  - `compute()` is exported for Node so it can be unit-tested in `tests/test.js`.

## Notes

- This calculator evaluates operations sequentially without standard arithmetic precedence; to add operator precedence you'd replace the simple left-to-right evaluation with an expression parser or use `shunting-yard`/AST evaluation.
- If you want I can add an `npm` script to run the HTTP server, or add keyboard support and more tests.
