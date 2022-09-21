const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

test("Deve rodar na porta 8080", () => {
  return request
    .get("/")
    .then((res) => {
        expect(res.statusCode).toEqual(200);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
