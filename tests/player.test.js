import app from '../src/app.js';
import request from 'supertest';
import { pool } from "../src/db";

describe('Players', () => {

  beforeEach(async ()=> {
    await pool.query("DELETE FROM Player");
  })

  afterAll(async () => {
    await pool.end();
  });

  test('puedo crear un jugador', async () => {
    const res = await request(app).post('/api/players').send({
      first_name: 'Antonio',
      last_name: 'Valencia'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        first_name: 'Antonio',
        last_name: 'Valencia'
      })
    );
  })

  it("puedo obtener un jugador", async () => {
    await request(app).post('/api/players').send({
      first_name: 'Antonio',
      last_name: 'Valencia'
    });
    const res = await request(app).get("/api/players");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{
      id_player: expect.any(Number),
      first_name: expect.any(String),
      last_name: expect.any(String)
    }]);
  });

  it("puedo obtener un jugador por id", async () => {
    const res = await request(app).get("/api/players/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_player: 1,
        name: expect.any(String),
        salary: expect.any(Number),
      })
    );
  });

})