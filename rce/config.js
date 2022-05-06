'use strict';

module.exports = {
  mailer: {
    service: 'Gmail',
    auth: {
      user: 'your_gmail_account_here',
      pass: 'your_pw_comes_here'
    }
  },
  mongoDB: {
    dbConnString: 'mongodb://localhost:27017/codasession',
    sessionKey: 'CodaSessionYolomatic'
  },
  facebook: {
    appID: 'APP_ID_HERE',
    appSecret: 'APP_SECRET_HERE',
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
  }
}
