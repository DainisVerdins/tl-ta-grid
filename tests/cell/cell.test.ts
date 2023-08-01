
function sum(a, b) {
  return a + b;
}

it("add 2 numbers", () => {
  expect(sum(2,3)).toEqual(5);
});