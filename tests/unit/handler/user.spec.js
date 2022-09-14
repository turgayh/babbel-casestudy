/* eslint-disable no-undef */
var request = require('supertest');
describe('Our server', function() {
    var app;
  
    before(function(done) {
      app = createApp();
      app.listen(function(err) {
        if (err) { return done(err); }
        done();
      });
    });
  
    it('should send back a JSON object with goodCall set to true', function() {
      request(app)
        .get('/')
        // .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res) {
          if (err) { return done(err); }
          callStatus = res.body.goodCall;
          expect(callStatus).to.equal(true);
          // Done
          done();
        });
    });
  
  });