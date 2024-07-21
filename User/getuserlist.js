import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Users - Get User List', function() {
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
      console.error('Error during login:', error);
      throw error;
    }
  });

  it('should get a list of users', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make GET request to get user list endpoint
      const response = await supertest(BASE_URL)
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ q: 'kasir-serbaguna', p: 1 });

      // Log the response body
      console.log('Get User List Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(200);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.nested.property('data.users').that.is.an('array');
      if (response.body.data.users.length > 0) {
        response.body.data.users.forEach(user => {
          expect(user).to.have.property('id').that.is.a('string');
          expect(user).to.have.property('name').that.is.a('string');
          expect(user).to.have.property('email').that.is.a('string');
          expect(user).to.have.property('role').that.is.a('string');
        });
      }
      expect(response.body.data).to.have.property('meta').that.is.an('object');
      expect(response.body.data.meta).to.have.property('totalPages').that.is.a('number');
      expect(response.body.data.meta).to.have.property('total').that.is.a('number');
      expect(response.body.data.meta).to.have.property('page').that.is.a('number');
    } catch (error) {
      console.error('Error during getting user list:', error);
      throw error;
    }
  });
});
