import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Categories - Get Category List', function() {
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

  it('should get a list of categories', async function() {
    // Skip the test if accessToken is not defined
    if (!accessToken) {
      this.skip();
    }

    try {
      // Make GET request to fetch category list
      const response = await supertest(BASE_URL)
        .get('/categories')
        .query({ q: 'makanan', page: 1 }) // Optional query parameters for filtering
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Get Category List Response:', response.body);

      // Check the response status
      expect(response.status).to.equal(200);

      // Assertions for successful response
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('data').that.is.an('object');
      expect(response.body.data).to.have.property('categories').that.is.an('array').not.empty;

      // Example assertion for the first category in the list
      const firstCategory = response.body.data.categories[0];
      expect(firstCategory).to.have.property('id').that.is.a('string');
      expect(firstCategory).to.have.property('name', 'makanan ringan');
      expect(firstCategory).to.have.property('description', 'makanan ringan dari indofood');
    } catch (error) {
      console.error('Error during getting category list:', error);
      throw error;
    }
  });
});
