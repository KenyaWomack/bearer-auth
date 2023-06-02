const request = require('supertest');
const app = require('../src/server');

describe('Test the server routes', () => {
  it('should respond with 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });

  it('should respond with 404 for an unknown method', async () => {
    const response = await request(app).patch('/food');
    expect(response.status).toBe(404);
  });

  it('should create a new record using POST', async () => {
    const response = await request(app)
      .post('/food')
      .send({ name: 'Apple', type: 'fruit' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual({ id: expect.any(Number), name: 'Apple', type: 'fruit' });
  });

  it('should get all records using GET', async () => {
    const response = await request(app).get('/food');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should get a record by ID using GET', async () => {
    const response = await request(app).get('/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('should update a record using PUT', async () => {
    const response = await request(app)
      .put('/food/1')
      .send({ name: 'Orange' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toEqual({ id: 1, name: 'Orange', type: 'fruit' });
  });

  it('should delete a record using DELETE', async () => {
    const response = await request(app).delete('/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
  });
});