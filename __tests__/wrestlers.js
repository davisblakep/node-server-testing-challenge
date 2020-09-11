const supertest = require('supertest');
const server = require('../server');
const db = require('../data/config');

beforeEach(async () => {
  // run the seeds programatically before each test to start fresh
  await db.seed.run();
});

afterAll(async () => {
  // close the database connection so the test process doesn't hang or give a warning
  await db.destroy();
});

describe('wrestlers integration tests', () => {
  it('GET /wrestlers', async () => {
    const res = await supertest(server).get('/wrestlers');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.length).toBeGreaterThanOrEqual(3);
    expect(res.body[0].name).toBe('Barry Backfist');
  });

  it('GET /wrestlers/:id', async () => {
    const res = await supertest(server).get('/wrestlers/2');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBe('Phil The Destroyer');
  });

  it('GET /wrestlers/:id - not found', async () => {
    const res = await supertest(server).get('/wrestlers/50');
    expect(res.statusCode).toBe(404);
  });

  it('POST /wrestlers', async () => {
    const res = await supertest(server)
      .post('/wrestlers')
      .send({ name: 'Jerry The Jaw Breaker' });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBe('Jerry The Jaw Breaker');
  });
});
