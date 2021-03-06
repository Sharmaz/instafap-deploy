'use strict'

const config = {
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  },
  client: {
    endpoints: {
      pictures: 'http://api.instafap.com/picture',
      users: 'http://api.instafap.com/user',
      auth: 'http://api.instafap.com/auth'
    }
  },
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://instafap.com/auth/facebook/callback'
    }
  },
  secret: process.env.INSTAFAP_SECRET || '1nst4fap'
}

if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }

  config.auth.facebook.callbackURL = 'http://instafap.test:5050/auth/facebook/callback'
}

module.exports = config
