import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Categories - Update Category', function() {
  let accessToken = '';
  let categoryId = '';

  // Increase timeout for the entire suite to 10000ms
  this.timeout(10000);

  before(async function() {
    try {
      // Perform login to obtain accessToken
      const response = await supertest(BASE_URL)
        .post('/authentications')
        .send({
          email: 'sample@example.com',
          password: '123adsfadf@'
        });

      accessToken = response.body.data.accessToken;

      // Create a category to update
      const createResponse = await supertest(BASE_URL)
        .post('/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'makanan ringan',
          description: 'makanan ringan dari indofood'
        });

      categoryId = createResponse.body.data.id; // Adjusted to use 'id' instead of 'categoryId'

    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  it('should update the category details', async function() {
    // Skip the test if accessToken or categoryId is not defined
    if (!accessToken || !categoryId) {
      this.skip();
    }

    try {
      // Make PUT request to update category
      const updateResponse = await supertest(BASE_URL)
        .put(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'update-minuman',
          description: 'no-minuman'
        });

      // Log the response body
      console.log('Update Category Response:', updateResponse.body);

      // Check the response status and data
      expect(updateResponse.status).to.equal(200);
      expect(updateResponse.body).to.have.property('status', 'success');
      expect(updateResponse.body).to.have.property('data');
      expect(updateResponse.body.data).to.have.property('name', 'update-minuman');
      expect(updateResponse.body.data).to.have.property('description', 'no-minuman');

    } catch (error) {
      console.error('Error during updating category:', error);
      throw error;
    }
  });

  // Cleanup after tests
  after(async function() {
    try {
      // Cleanup: Delete the category created during testing
      if (accessToken && categoryId) {
        await supertest(BASE_URL)
          .delete(`/categories/${categoryId}`)
          .set('Authorization', `Bearer ${accessToken}`);
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
      throw error;
    }
  });
});
