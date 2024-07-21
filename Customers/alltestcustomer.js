import { expect } from 'chai';
import supertest from 'supertest';

import createCustomerTest from './createcustomer.js';
import deleteCustomerTest from './deletecustomer.js';
import getCustomerDetailTest from './getcustomerdetail.js';
import getCustomerListTest from './getcustomerlist.js';
import updateCustomerTest from './updatecustomer.js';

const BASE_URL = 'https://your-api-base-url.com'; // Update to your base URL

describe('Customer API Tests', function() {
  this.timeout(10000);

  before(async function() {
    try {
      const response = await supertest(BASE_URL)
        .post('/authentications')
        .send({
          email: 'sample@example.com',
          password: '123adsfadf@'
        });

      const accessToken = response.body.data.accessToken;

      if (!accessToken) {
        throw new Error('Login response does not contain access token');
      }

      global.accessToken = accessToken;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  });

  createCustomerTest();
  deleteCustomerTest();
  getCustomerDetailTest();
  getCustomerListTest();
  updateCustomerTest();
});
