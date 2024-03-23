import * as supertest from "supertest";

const request = supertest("localhost:5000");

describe("API Test for roles route", () => {
  const expectResponse = {
    message: expect.any(String),
    data: expect.any(Object || Array),
    errors: null,
    status: "Success",
  };

  const body = {
    name: "admin",
    description: "admin role",
  };

  let roleId = "";

  it("should return a response and 201 status code for create a role", async () => {
    const response = await request.post("/api/v1/roles/").send(body);
    console.log(response.error, response.body, "eror response");
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectResponse);

    response.body.data.id && (roleId = response.body.data.id);
  });

  it("should return a response and 200 status code for get all roles", async () => {
    const response = await request.get("/api/v1/roles/");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectResponse);
  });

  it("should return a response and 200 status code for get a role", async () => {
    const response = await request.get(`/api/v1/roles/${roleId}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectResponse);
  });

  it("should return a response and 200 status code for update a role", async () => {
    const response = await request.put(`/api/v1/roles/${roleId}`).send(body);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectResponse);
  });

  it("should return a response and 200 status code for delete a role", async () => {
    const response = await request.delete(`/api/v1/roles/${roleId}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectResponse);
  });
});
