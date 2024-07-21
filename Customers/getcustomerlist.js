import { expect } from 'chai';
import supertest from 'supertest';

// Define the base URL of the API
const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('Customers - Get Customer List', function() {
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

  it('should get a list of customers', async function() {
    try {
      console.log('Getting customer list...');
      // Make GET request to get customer list
      const listResponse = await supertest(BASE_URL)
        .get('/customers?page=1&q=Budi')
        .set('Authorization', `Bearer ${accessToken}`);

      // Log the response body
      console.log('Get Customer List Response:', listResponse.body);

      // Check the response status
      expect(listResponse.status).to.equal(200);
      expect(listResponse.body).to.have.property('status', 'success');
      expect(listResponse.body).to.have.property('data').that.is.an('object');
      expect(listResponse.body.data).to.have.property('customers').that.is.an('array');

      // Check if the customers array contains the expected customer
      const customers = listResponse.body.data.customers;
      expect(customers).to.be.an('array');
      expect(customers).to.not.be.empty;

      const customer = customers.find(c => c.name === 'Budi');
      expect(customer).to.have.property('name', 'Budi');
      expect(customer).to.have.property('phone', '081234567890');
      expect(customer).to.have.property('description', 'Budi anak Pak Edi');

      // Check the meta object for pagination details
      expect(listResponse.body.data).to.have.property('meta').that.is.an('object');
      expect(listResponse.body.data.meta).to.have.property('totalPages').that.is.a('number');
      expect(listResponse.body.data.meta).to.have.property('total').that.is.a('number');
      expect(listResponse.body.data.meta).to.have.property('page').that.is.a('string'); // page returned as string, adjust check accordingly

    } catch (error) {
      console.error('Error during getting customer list:', error);
      throw error;
    }
  });
});
