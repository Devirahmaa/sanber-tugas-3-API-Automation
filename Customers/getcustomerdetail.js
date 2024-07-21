import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Customers - Get Customer Detail', function() {
  let accessToken = '';
  let customerId = '12560ce9-fda4-400b-9cc8-edc768e7c41b';

  // Increase timeout for the entire suite to 10000ms
  this.timeout(10000);

  before(async function() {
    try {
      console.log('Starting setup: logging in to obtain accessToken...');
      // Perform login to obtain accessToken
      const response = await supertest(BASE_URL)
        .post('/authentications')
        .send({
          email: 'sample@example.com', // Use valid credentials
          password: '123adsfadf@'
        });

      accessToken = response.body.data.accessToken;
      console.log('AccessToken obtained:', accessToken);
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  it('should get customer detail', async function() {
    try {
      console.log('Getting customer detail...');
      // Make GET request to get customer detail
      const detailResponse = await supertest(BASE_URL)
        .get(`/customers/${customerId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Get Customer Detail Response:', detailResponse.body);

      // Check the response status
      expect(detailResponse.status).to.equal(200);
      expect(detailResponse.body).to.have.property('status', 'success');
      expect(detailResponse.body).to.have.property('data').that.is.an('object');
      expect(detailResponse.body.data).to.have.property('customer').that.is.an('object');
      expect(detailResponse.body.data.customer).to.have.property('name', 'Budi');
      expect(detailResponse.body.data.customer).to.have.property('description', 'Budi anak Pak Edi');

    } catch (error) {
      console.error('Error during getting customer detail:', error);
      throw error;
    }
  });
});
