
let chai = require('chai');
let server = require('../src/server');
let chaiH = require('chai-http');
chai.use(chaiH);
let should = chai.should();

describe('comment testid', () => {
  it('should succsessfully login', () => {

    chai.request(server)
      .get('/api/comment/comments/332211112233')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
      });
  });

  it('should throw comment exists error-400', () => {
    let comment = {
      commentID: 22222,
      postID: 332211112233,
      userName: "test",
      commentContent: "Suusabaasis tantsupidu"

    }
    chai.request(server)
      .post('/api/auth/signup')
      .type('json')
      .set('Content-Type', 'application/json')
      .send(comment)
      .end((err, res) => {
          res.should.have.status(400);
      });
  });
});

