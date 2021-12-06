//serveri testi setup jne on saadud siit:
//https://dev.to/lukekyl/testing-your-express-js-backend-server-3ae6

const server = require('../../backend-node/src/server');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User endpoints', () => {

    it('GET /user should show all users', async () => {
      const res = await requestWithSupertest.get('/api/auth/admins');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        //expect(res.body).toHaveProperty('users')
    });
  
  });