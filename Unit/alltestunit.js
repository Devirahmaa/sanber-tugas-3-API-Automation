import { expect } from 'chai';
import supertest from 'supertest';

import createUnitTest from './createunit.js';
import deleteUnitTest from './deleteunit.js';
import getUnitDetailTest from './getunitdetail.js';
import getUnitListTest from './getunitlist.js';
import updateUnitTest from './updateunit.js';

const BASE_URL = 'https://your-api-base-url.com'; // Update to your base URL

describe('Unit API Tests', function() {
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

  createUnitTest();
  deleteUnitTest();
  getUnitDetailTest();
  getUnitListTest();
  updateUnitTest();
});
