// alltests.js

import { expect } from 'chai';
import supertest from 'supertest';

import createUserTest from './createuser.js';
import deleteUserTest from './deleteuser.js';
import getUserDetailTest from './getuserdetail.js';
import getUserListTest from './getuserlist.js';
import updateUserTest from './updateuser.js';

const BASE_URL = 'https://kasir-api.belajarqa.com';

describe('User API Tests', function() {
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

  createUserTest();
  deleteUserTest();
  getUserDetailTest();
  getUserListTest();
  updateUserTest();
});
