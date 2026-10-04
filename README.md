# demo-shop

A small Express shop with **ten planted bugs**. It is the target app for
[PatchPilot](../cline-submission): when a route crashes, the capture middleware in
`sdk/patchpilot-express.js` reports it, and PatchPilot opens a tested draft pull request here.

## Run

```powershell
npm install
npm start            # http://localhost:5050
npm test             # node --test: 14 happy-path tests, which pass even with the bugs present
```

| Variable | Default | Meaning |
|---|---|---|
| `DEMO_PORT` | `5050` | Port the shop listens on |
| `PATCHPILOT_ENDPOINT` | `http://localhost:4747/api/incidents` | Where crashes are reported |
| `PATCHPILOT_REPO` | `demo-shop` | Repo name sent with each crash (matches PatchPilot's config) |

## The bugs

| # | File | Kind | How it shows |
|---|---|---|---|
| 01 | `src/lib/total.js` | null access | `POST /api/orders/total` with a `null` item → 500 |
| 02 | `src/lib/profile.js` | null access | user without an address → 500 |
| 03 | `src/lib/discount.js` | type conversion | `"12.5"` % is applied as 12 % |
| 04 | `src/lib/refund.js` | type conversion | `"$19.99"` → 500 |
| 05 | `src/lib/pagination.js` | off-by-one | every page is one item short |
| 06 | `src/lib/chunk.js` | off-by-one | items are skipped between chunks |
| 07 | `src/lib/signup.js` | missing validation | an empty email is accepted |
| 08 | `src/lib/update.js` | missing validation | a missing email is stored as `"undefined"` |
| 09 | `src/lib/eligibility.js` | wrong conditional | free shipping uses OR instead of AND |
| 10 | `src/lib/checkout.js` | wrong conditional | one in-stock item lets the whole cart through |

Each `src/lib/*.js` file starts with a comment naming its bug. The happy-path tests only
cover normal inputs, which is why the bugs survive them.

PatchPilot never merges anything: every fix arrives as a **draft** PR with a reproduction
test committed first, and a human reviews and merges it.
