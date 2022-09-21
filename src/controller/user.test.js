const app = require('../app');
const supertest = require("supertest");
const request = supertest(app);

const mainUser = {
  name: "mainUSer",
  email: "mainuser@gmail.com",
  password: "12345678",
  confirmpassword: "12345678",
};

beforeAll(() => {
  return request
    .post("/api/user/register")
    .send(mainUser)
    .then((res) => {})
    .catch((err) => {
      throw new Error(err);
    });
});

afterAll(() => {
  return request
    .delete(`/api/user/${mainUser.email}`)
    .then({})
    .catch((err) => {
      throw new Error(err);
    });
});

describe("Registro de usuários", () => {
  test("Deve retornar 201 se o cadastro do usuário foi feito com sucesso", () => {
    const user = {
      name: "matheus",
      email: "matheus@gmail.com",
      password: "12345678",
      confirmpassword: "12345678",
    };

    return request
      .post("/api/user/register")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.email).toEqual(user.email);

        return request
          .delete(`/api/user/${user.email}`)
          .then(() => {})
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  test("Deve retornar 422 se o usuário enviar dados nulos", () => {
    const user = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    };

    return request
      .post("/api/user/register")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(422);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  test("Deve retornar 422 se o usuário tentar criar uma conta com um email ja cadastrado", () => {
    const user = {
      name: "matheus",
      email: "matheus@gmail.com",
      password: "12345678",
      confirmpassword: "12345678",
    };

    return request
      .post("/api/user/register")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.email).toEqual(user.email);

        return request
          .post("/api/user/register")
          .send(user)
          .then((res) => {
            expect(res.statusCode).toEqual(422);

            return request
              .delete(`/api/user/${user.email}`)
              .then(() => {})
              .catch((err) => {
                throw new Error(err);
              });
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  describe("Autenticação de usuário", () => {
    test("Deve retornar um token quando o usuário fizer login", () => {
      return request
        .post("/api/user/login")
        .send({ email: mainUser.email, password: mainUser.password })
        .then((res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.token).toBeDefined();
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  });

  test("Deve retornar 403 se o usuário tentar fazer login com email incorreto", () => {
    return request
      .post("/api/user/login")
      .send({ email: "naoexiste@gmail.com", password: mainUser.password })
      .then((res) => {
        expect(res.statusCode).toEqual(403);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  test("Deve retornar 422 se o usuário tentar fazer login com a senha incorreta", () => {
    return request
      .post("/api/user/login")
      .send({ email: mainUser.email, password: "2er2rwr" })
      .then((res) => {
        expect(res.statusCode).toEqual(422);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
});
