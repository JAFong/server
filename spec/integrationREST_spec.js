var frisby = require('frisby');

frisby.create('GET JSON of nearby stops from Rest Bus API')
  //Test for locations around Hack Reactor
  .get('http://mybus-api.herokuapp.com/locations/37.783725,-122.408977/predictions')
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
  .after(function(err, res, body) {
    // Data should be an array of route objects
    var jsonData = JSON.parse(body);
    expect(Array.isArray(jsonData)).toMatch(true);
    if (jsonData.length > 0) {
      var route = jsonData[0]
      expect(typeof route).toMatch('object');
      expect(typeof route.route.title).toMatch('string');
      expect(typeof route.stop.title).toMatch('string');
      expect(typeof route.values[0].minutes).toMatch('number');
      expect(typeof route.values[0].direction.title).toMatch('string');
    }
  })
.toss();