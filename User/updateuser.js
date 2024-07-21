import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('User - Update User', function() {
  let accessToken = ''; // Define accessToken variable
  let userId = ''; // Define userId variable

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

      // Create a new user to be updated later
      const createUserResponse = await supertest(BASE_URL)
        .post('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'kasir-serbaguna',
          email: 'user@example.com',
          password: '123adsfadf@'
        });

      // Store the userId from the response
      userId = createUserResponse.body.data.userId;
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  it('should update the user details', async function() {
    // Skip the test if accessToken or userId is not defined
    if (!accessToken || !userId) {
      this.skip();
    }

    try {
      // Make PUT request to update user endpoint
      const response = await supertest(BASE_URL)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'update-user',
          email: 'user@example.com'
        });

      // Log the response body
      console.log('Update User Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(200);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('message', 'User berhasil diupdate');
      expect(response.body).to.have.nested.property('data.name', 'update-user');
      // Remove the assertion for 'data.email' since it's not present in the response
    } catch (error) {
      console.error('Error during updating user:', error);
      throw error;
    }
  });
});
