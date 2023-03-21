
import app from '../src/app.js';
import request from 'supertest';

describe("Index Routes", () => {

  test("should respond welcome", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "welcome to my api" });
  });

  test("should respond pong", async () => {
    const res = await request(app).get("/ping");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: "pong" });
  });
});
