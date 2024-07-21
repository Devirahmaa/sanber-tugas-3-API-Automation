import { expect } from 'chai';
import supertest from 'supertest';

const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Authorization - Login', function() {
  let accessToken = ''; // Declare accessToken variable outside of the before hook

  // Increase timeout for before hook to 10000ms
  this.timeout(10000);

  before(async function() {
    try {
      const response = await supertest(BASE_URL)
        .post('/authentications')
        .send({
          email: 'sample@example.com',
          password: '123adsfadf@'
        });

      // Log the full response body for debugging purposes
      console.log('Login Response:', response.body);

      // Ensure the response contains the expected structure
      if (response.body && response.body.data && response.body.data.accessToken) {
        accessToken = response.body.data.accessToken;

        // Log the access token for debugging purposes
        console.log('Access Token:', accessToken);
      } else {
        throw new Error('Login response does not contain access token');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Rethrow the error to fail the test immediately
    }
  });

  it('should obtain an access token upon successful login', function() {
    // Assert that accessToken is a non-empty string
    expect(accessToken).to.be.a('string').that.is.not.empty;
  });

  // Example test case for using the access token in authenticated requests
  it('should use the access token in authenticated requests', async function() {
    // Skip this test if accessToken is not defined or empty
    if (!accessToken) {
      this.skip();
    }

    // Example: Make a request to an authenticated endpoint using the access token
    const response = await supertest(BASE_URL)
      .get('/protected-resource')
      .set('Authorization', `Bearer ${accessToken}`);

    // Log the response for debugging purposes
    console.log('Protected Resource Response:', response.body);

    // Assert the response status or content as needed
    expect(response.status).to.equal(404); // Adjust this to match your expected status code
    // Add more assertions based on the response body or structure as needed
  });
});
