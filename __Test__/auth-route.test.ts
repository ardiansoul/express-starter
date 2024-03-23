import * as supertest from "supertest";

const request = supertest("localhost:5000");

describe("Auth Route", () => {
  it("Login", async () => {
    const body = {
      email: "5lLZd@example.com",
      password: "123456",
    };

    const response = await request.post("/auth/login").send(body);
    expect(response.status).toEqual(200);
    console.log(response.body);
  });
});
