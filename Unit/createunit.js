import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Units - Add Unit', function() {
  let accessToken = ''; // Define accessToken variable

  // Increase timeout for before hook to 5000ms
  this.timeout(5000);

  before(async function() {
    try {
      // Perform login to obtain accessToken
      const response = await supertest(BASE_URL)
        .post('/authentications')
        .send({
          email: 'sample@example.com',
          password: '123adsfadf@'
        });

      // Store the access token from the response
      accessToken = response.body.data.accessToken;
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  it('should add a new unit', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make POST request to add unit endpoint
      const response = await supertest(BASE_URL)
        .post('/units')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'gram',
          description: 'weight measurement'
        });

      // Log the response body
      console.log('Add Unit Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(201);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('message', 'Unit berhasil ditambahkan');
      expect(response.body).to.have.nested.property('data.unitId').that.is.a('string');
      expect(response.body).to.have.nested.property('data.name', 'gram');
    } catch (error) {
      console.error('Error during adding unit:', error);
      throw error;
    }
  });
});
