import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('User - Create User', function() {
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

  it('should create a new user', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    // Define the request body for creating a new user
    const newUser = {
      name: 'kasir-serbaguna',
      email: 'user@example.com',
      password: 'jiasda2321@'
    };

    try {
      // Make POST request to create user endpoint
      const response = await supertest(BASE_URL)
        .post('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newUser);

      // Log the response body
      console.log('Create User Response:', response.body);

      // Assertions
      expect(response.status).to.equal(201); // Assuming 201 is the success status code
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('message', 'User berhasil ditambahkan');
      expect(response.body).to.have.nested.property('data.userId').that.is.a('string');
      expect(response.body).to.have.nested.property('data.name', newUser.name);
    } catch (error) {
      console.error('Error during user creation:', error);
      throw error;
    }
  });
});
