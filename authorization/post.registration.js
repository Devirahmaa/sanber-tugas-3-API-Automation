import supertest from 'supertest';
import { expect } from 'chai';

const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Authorization - Registration', function() {
  this.timeout(5000);

  it('should register a new user successfully', async function() {
    const response = await supertest(BASE_URL)
      .post('/registration')
      .send({
        name: 'nama Toko',
        email: 'devitest@gmail.com',
        password: '123test@'
      });

    // Check the response status
    expect(response.status).to.equal(201);

    // Check if the response indicates success
    expect(response.body).to.have.property('status', 'success');

    // Check if the response message confirms successful registration
    expect(response.body).to.have.property('message', 'Toko berhasil didaftarkan');

    // Optionally, check the data returned
    expect(response.body.data).to.deep.include({
      name: 'nama Toko',
      email: 'devitest@gmail.com'
    });
  });
});




