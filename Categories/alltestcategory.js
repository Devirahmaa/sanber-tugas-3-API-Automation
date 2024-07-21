import { expect } from 'chai';
import supertest from 'supertest';

import createCategoryTest from './createcategory.js';
import deleteCategoryTest from './deletecategory.js';
import getCategoryDetailTest from './getcategorydetail.js';
import getCategoryListTest from './getcategorylist.js';
import updateCategoryTest from './updatecategory.js';

const BASE_URL = 'https://your-api-base-url.com'; // Update to your base URL

describe('Category API Tests', function() {
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

  createCategoryTest();
  deleteCategoryTest();
  getCategoryDetailTest();
  getCategoryListTest();
  updateCategoryTest();
});
