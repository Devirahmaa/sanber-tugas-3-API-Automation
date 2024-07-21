import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Units - Update Unit', function() {
  let accessToken = ''; // Define accessToken variable
  let unitId = '811f547e-a24e-4f94-bfe1-b7ed7d11c03f'; // Replace with a valid unitId

  // Increase timeout for the entire suite to 10000ms
  this.timeout(10000);

  before(async function() {
    try {
      // Increase timeout for before hook to 10000ms
      this.timeout(10000);

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

  it('should update the unit details', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make PUT request to update unit details
      const response = await supertest(BASE_URL)
        .put(`/units/${unitId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'update-meter',
          description: 'no-meter'
        });

      // Log the response body
      console.log('Update Unit Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(200);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      // Optional assertion for the message if it's expected
      // expect(response.body).to.have.property('message', 'User berhasil diupdate');
      expect(response.body).to.have.nested.property('data.name', 'update-meter');
    } catch (error) {
      console.error('Error during updating unit:', error);
      throw error;
    }
  });
});
