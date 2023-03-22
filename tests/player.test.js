import app from '../src/app.js';
import request from 'supertest';
import { pool } from "../src/db";

describe('Players', () => {

  test('puedo crear un jugador', async () => {
    const res = await request(app).post('/api/players').send({
      first_name: 'Antonio',
      last_name: 'Valencia'
    });
    expect(res.status).toEqual(201);
  })

  afterAll(async () => {
    await pool.end();
  });

})