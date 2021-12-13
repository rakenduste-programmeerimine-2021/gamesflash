
let chai = require('chai');
let server = require('../src/server');
let chaiH = require('chai-http');
chai.use(chaiH);
let should = chai.should();

describe('posti', () => {
  it('create a post', () => {
    let post = {
        userName: "testuser",
        postID: 1234432123,
        postTitle: "postTitle",
        content: "content",
        category: "social"
    }
    chai.request(server)
      .post('/api/post/create')
      .type('json')
      .set('Content-Type', 'application/json')
      .send(post)
      .end((err, res) => {
          res.should.have.status(200);
      });
  });

  it('edit a post', () => {
    let post = {
      content: "test content",
    }
    chai.request(server)
      .put('/api/post/edit/1234432123')
      .type('json')
      .set('Content-Type', 'application/json')
      .send(post)
      .end((err, res) => {
          res.should.have.status(200);
      });
  });

  it('should delete a post', () => {
    chai.request(server)
      .delete('/api/post/delete/1234432123')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
      });
  });
  it('should get a post', () => {
    chai.request(server)
      .get('/api/post/332211112233')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
      });
  });
  it('should get social posts', () => {
    chai.request(server)
      .get('/api/post/social')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
      });
  });
  it('should get gaming posts', () => {
    chai.request(server)
      .get('/api/post/gaming')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
      });
  });
  it('should get given users posts', () => {
    chai.request(server)
      .get('/api/post/userposts/:testuser')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
      });
  });
});

