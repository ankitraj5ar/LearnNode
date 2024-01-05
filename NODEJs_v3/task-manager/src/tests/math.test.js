test("hello world", () => {
  console.log("working");
});
test("async", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});
