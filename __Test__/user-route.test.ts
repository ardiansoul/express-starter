import * as supertest from "supertest";

const request = supertest("localhost:5000");

describe("UserController", () => {
  const expectResponse = {
    message: expect.any(String),
    data: expect.any(Object || Array),
    errors: null,
    status: "Success",
  };

  it("should return 401 Unauthorized when no token is provided", async () => {
    const response = await request.get("/api/v1/users").set("Authorization", "Bearer ");
    expect(response.status).toBe(401);
  });

  it("should return 401 Unauthorized when provided with an invalid token", async () => {
    const response = await request.get("/api/v1/users").set("Authorization", "Bearer tokenmainasdoas");
    expect(response.status).toBe(401);
  });

  it("should get user by ID and return the user data", async () => {
    const response = await request.get("/api/v1/users/someId"); // Replace with the actual endpoint
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User successfully retrieved", ...expectResponse });
  });

  it("should get all users based on a filter and return the user data", async () => {
    const response = await request.get("/api/v1/users?filter=someFilter"); // Replace with the actual endpoint and query parameter
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Users successfully retrieved", ...expectResponse });
  });

  it("should create a new user and return the created user data", async () => {
    const response = await request
      .post("/api/v1/users") // Replace with the actual endpoint
      .send({ name: "John Doe" }); // Replace with the actual user data
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User successfully created", ...expectResponse });
  });
});
