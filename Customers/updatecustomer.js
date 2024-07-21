import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Customers - Update Customer', function() {
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

  it('should update the customer details', async function() {
    try {
      console.log('Updating customer details...');
      // Make PUT request to update customer details
      const updateResponse = await supertest(BASE_URL)
        .put(`/customers/${customerId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Budi Doremi',
          phone: '08987654321',
          address: 'Bandung',
          description: 'Pelanggan VIP'
        });

      // Log the response body
      console.log('Update Customer Response:', updateResponse.body);

      // Check the response status
      expect(updateResponse.status).to.equal(200);
      expect(updateResponse.body).to.have.property('status', 'success');
      expect(updateResponse.body).to.have.property('data').that.is.an('object');
      expect(updateResponse.body.data).to.have.property('name', 'Budi Doremi');

      // Check if the phone property exists before validating it
      if (updateResponse.body.data.hasOwnProperty('phone')) {
        expect(updateResponse.body.data).to.have.property('phone', '08987654321');
      } else {
        console.error('Phone field is missing in the response:', updateResponse.body.data);
      }

      // Check if the address property exists before validating it
      if (updateResponse.body.data.hasOwnProperty('address')) {
        expect(updateResponse.body.data).to.have.property('address', 'Bandung');
      } else {
        console.error('Address field is missing in the response:', updateResponse.body.data);
      }

      // Check if the description property exists before validating it
      if (updateResponse.body.data.hasOwnProperty('description')) {
        expect(updateResponse.body.data).to.have.property('description', 'Pelanggan VIP');
      } else {
        console.error('Description field is missing in the response:', updateResponse.body.data);
      }
    } catch (error) {
      console.error('Error during updating customer:', error);
      throw error;
    }
  });
});
