import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Units - Get Unit Detail', function() {
  let accessToken = ''; // Define accessToken variable
  const unitId = 'f5cc4171-5f9a-4844-8fac-5b88e54cf8a5'; // Replace with actual unit ID

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

  it('should get the details of a unit', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make GET request to get unit detail endpoint
      const response = await supertest(BASE_URL)
        .get(`/units/${unitId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Get Unit Detail Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(200);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.nested.property('data.unit').that.is.an('object');
      expect(response.body).to.have.nested.property('data.unit.name', 'gram');
      expect(response.body).to.have.nested.property('data.unit.description', 'weight measurement');
    } catch (error) {
      console.error('Error during getting unit detail:', error);
      throw error;
    }
  });
});
