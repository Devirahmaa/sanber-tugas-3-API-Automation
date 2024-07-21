import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Users - Get User Detail', function() {
  let accessToken = ''; // Define accessToken variable
  const userId = '52e74869-f443-4dd5-a496-5ffe12120af5'; // Sample userId

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
      console.error('Error during login:', error);
      throw error;
    }
  });

  it('should get the details of a user', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make GET request to get user detail endpoint
      const response = await supertest(BASE_URL)
        .get(`/users/${userId}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Get User Detail Response:', response.body);

      // Assertions
      expect(response.status).to.equal(200); // Assuming 200 is the success status code
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.nested.property('data.user.id', userId);
      expect(response.body).to.have.nested.property('data.user.name').that.is.a('string');
      expect(response.body).to.have.nested.property('data.user.email').that.is.a('string');
      expect(response.body).to.have.nested.property('data.user.role').that.is.a('string');
    } catch (error) {
      console.error('Error during getting user detail:', error);
      throw error;
    }
  });
});
