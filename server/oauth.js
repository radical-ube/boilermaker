const router = require('express').Router()
const passport = require('passport')
const { User } = require('./db/models/User')
module.exports = router

if (process.env.NODE_ENV === 'development') {
  require('./localSecrets'); // this will mutate the process.env object with your secrets.
}

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({where: { googleId: googleId  }})
    .then((user) => {
      if (!user) {
        return User.create({ name, email, googleId })
          .then((user) => {
            done(null, user);
          });
      }
      else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);

passport.serializeUser((user, done) => {
  try { done(null, user.id); }
  catch (err) { done(err); }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

router.get('/', passport.authenticate('google', { scope: 'email' }))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}))


