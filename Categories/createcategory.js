import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Categories - Add Category', function() {
  let accessToken = ''; // Define accessToken variable

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

  it('should add a new category', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Define the request body
      const categoryData = {
        name: 'makanan ringan',
        description: 'makanan ringan dari indofood'
      };

      // Make POST request to add a new category
      const response = await supertest(BASE_URL)
        .post('/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(categoryData);

      // Log the response body
      console.log('Add Category Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(201);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('data').that.is.an('object');
      expect(response.body.data).to.have.property('categoryId').that.is.a('string');
      expect(response.body.data).to.have.property('name', categoryData.name);
    } catch (error) {
      console.error('Error during adding category:', error);
      throw error;
    }
  });
});
