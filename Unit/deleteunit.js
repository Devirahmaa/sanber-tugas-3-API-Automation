import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Units - Delete Unit', function() {
  let accessToken = ''; // Define accessToken variable
  const unitId = '811f547e-a24e-4f94-bfe1-b7ed7d11c03f'; // Replace with a valid unitId

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

  it('should delete the unit', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make DELETE request to delete the unit
      const response = await supertest(BASE_URL)
        .delete(`/units/${unitId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Delete Unit Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(200);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('data').that.is.an('object').that.is.empty;
    } catch (error) {
      console.error('Error during deleting unit:', error);
      throw error;
    }
  });
});
