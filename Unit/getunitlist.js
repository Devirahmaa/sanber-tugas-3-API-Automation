import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Units - Get Unit List', function() {
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

  it('should get a list of units', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make GET request to get unit list endpoint
      const response = await supertest(BASE_URL)
        .get('/units')
        .query({ q: 'gram', page: 1 })
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Get Unit List Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(200);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.nested.property('data.units').that.is.an('array');
      expect(response.body).to.have.nested.property('data.units[0].id').that.is.a('string');
      expect(response.body).to.have.nested.property('data.units[0].name').that.is.a('string');
      expect(response.body).to.have.nested.property('data.units[0].description').that.is.a('string');
      expect(response.body).to.have.nested.property('data.meta').that.is.an('object');
      expect(response.body).to.have.nested.property('data.meta.totalPages').that.is.a('number');
      expect(response.body).to.have.nested.property('data.meta.total').that.is.a('number');
      expect(response.body).to.have.nested.property('data.meta.page').that.is.a('string');
    } catch (error) {
      console.error('Error during getting unit list:', error);
      throw error;
    }
  });
});
