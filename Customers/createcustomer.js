import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Customers - Add Customer', function() {
  let accessToken = '';

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

  it('should add a new customer', async function() {
    try {
      console.log('Adding a new customer...');
      // Make POST request to add a new customer
      const addResponse = await supertest(BASE_URL)
        .post('/customers')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Budi',
          phone: '081234567890',
          address: 'Bandoeng',
          description: 'Budi anak Pak Edi'
        });

      // Log the response body
      console.log('Add Customer Response:', addResponse.body);

      // Check the response status
      expect(addResponse.status).to.equal(201);
      expect(addResponse.body).to.have.property('status', 'success');
      expect(addResponse.body).to.have.property('message', 'Customer berhasil ditambahkan');
      expect(addResponse.body).to.have.property('data').that.is.an('object');
      expect(addResponse.body.data).to.have.property('customerId').that.is.a('string');
      expect(addResponse.body.data).to.have.property('name', 'Budi');

    } catch (error) {
      console.error('Error during adding customer:', error);
      throw error;
    }
  });
});
