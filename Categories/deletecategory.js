import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Categories - Delete Category', function() {
  let accessToken = '';
  let categoryId = '';

  // Increase timeout for the entire suite to 20000ms
  this.timeout(20000);

  before(async function() {
    try {
      console.log('Starting setup: logging in to obtain accessToken...');
      // Perform login to obtain accessToken
      const response = await supertest(BASE_URL)
        .post('/authentications')
        .send({
          email: 'sample@example.com',
          password: '123adsfadf@'
        });

      accessToken = response.body.data.accessToken;
      console.log('AccessToken obtained:', accessToken);

      console.log('Creating a category to delete...');
      // Create a category to delete
      const createResponse = await supertest(BASE_URL)
        .post('/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'makanan ringan',
          description: 'makanan ringan dari indofood'
        });

      categoryId = createResponse.body.data.categoryId;
      console.log('Category created with ID:', categoryId);
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  it('should delete the category', async function() {
    // Skip the test if accessToken or categoryId is not defined
    if (!accessToken || !categoryId) {
      this.skip();
    }

    try {
      console.log('Deleting the category with ID:', categoryId);
      // Make DELETE request to delete category
      const deleteResponse = await supertest(BASE_URL)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Delete Category Response:', deleteResponse.body);

      // Check the response status
      expect(deleteResponse.status).to.equal(200);
      expect(deleteResponse.body).to.have.property('status', 'success');
      expect(deleteResponse.body).to.have.property('data').that.is.an('object');

    } catch (error) {
      console.error('Error during deleting category:', error);
      throw error;
    }
  });
});
