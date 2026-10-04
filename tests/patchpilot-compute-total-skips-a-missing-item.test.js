import { test } from "node:test";
import assert from "node:assert/strict";
import { computeTotal } from "../src/lib/total.js";

test("computeTotal skips a missing item", () => {
  assert.equal(
    computeTotal([{ price: 10, quantity: 2 }, undefined, { price: 5, quantity: 1 }]),
    25
  );
});
