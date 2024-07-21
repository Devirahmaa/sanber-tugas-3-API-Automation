import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Customers - Delete Customer', function() {
  let accessToken = '';
  const customerId = '811f547e-a24e-4f94-bfe1-b7ed7d11c03f'; // Ganti dengan customerId yang sesuai

  // Increase timeout for the entire suite to 10000ms
  this.timeout(10000);

  before(async function() {
    try {
      console.log('Starting setup: logging in to obtain accessToken...');
      // Perform login to obtain accessToken
      const response = await supertest(BASE_URL)
        .post('/authentications')
        .send({
          email: 'sample@example.com', // Gunakan kredensial yang valid
          password: '123adsfadf@'
        });

      accessToken = response.body.data.accessToken;
      console.log('AccessToken obtained:', accessToken);
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  it('should delete the customer', async function() {
    try {
      console.log('Deleting customer...');
      // Make DELETE request to delete customer
      const deleteResponse = await supertest(BASE_URL)
        .delete(`/customers/${customerId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Delete Customer Response:', deleteResponse.body);

      // Check the response status
      expect(deleteResponse.status).to.equal(200);
      expect(deleteResponse.body).to.have.property('status', 'success');
      expect(deleteResponse.body).to.have.property('data').that.is.an('object');
    } catch (error) {
      console.error('Error during deleting customer:', error);
      throw error;
    }
  });
});
