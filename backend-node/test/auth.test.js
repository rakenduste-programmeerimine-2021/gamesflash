
let chai = require('chai');
let server = require('../src/server');
let chaiH = require('chai-http');
chai.use(chaiH);
let should = chai.should();
//backendi testimiseks kasutatud lingid (võetud ka näiteid sellepärast tsiteerin)
//https://www.chaijs.com/plugins/chai-http/
//https://www.chaijs.com/
//https://stackoverflow.com/questions/33986863/mocha-api-testing-getting-typeerror-app-address-is-not-a-function



describe('authi testid', () => {
  it('should succsessfully login', () => {
    let login = {
      userName: "testuser",
      password: "Kergem1!"
    }
    chai.request(server)
      .post('/api/auth/login')
      .type('json')
      .set('Content-Type', 'application/json')
      .send(login)
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('email');
      });
  });

  it('should throw signup error-400', () => {
    let signup = {
      userName: "testuser",
      email: "tester@testing.com",
      password: "Kergem1!"
    }
    chai.request(server)
      .post('/api/auth/signup')
      .type('json')
      .set('Content-Type', 'application/json')
      .send(signup)
      .end((err, res) => {
          res.should.have.status(400);
      });
  });

  it('should throw delete error-400', () => {
    let deleteUser = {
      userName: "testuser",
      aCC: 324
    }
    chai.request(server)
      .post('/api/auth/delete')
      .type('json')
      .set('Content-Type', 'application/json')
      .send(deleteUser)
      .end((err, res) => {
          res.should.have.status(400);
      });
  });
  it('should return all users', () => {
    chai.request(server)
      .get('/api/auth/allusers')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
      });
  });
  it('should return all admins', () => {
    chai.request(server)
      .get('/api/auth/admins')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
      });
  });
});

