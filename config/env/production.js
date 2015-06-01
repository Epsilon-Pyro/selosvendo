// Invocar el modo 'strict' de JavaScript mode
'use strict';
module.exports = {
  db: process.env.OPENSHIFT_MONGO_DB_URL ||'mongodb://localhost/mean',
    google: {
    clientID: '401637428460-vsamojb5lqciiq5m1k7s4d5sh9c2gk1e.apps.googleusercontent.com',
    clientSecret: 'N2dGszmxN5Lvmyh7MJJc8Y9K',
    callbackURL: 'http://localhost:3000/oauth/google/callback'
  }
  
}