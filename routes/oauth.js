/**
 * Created by 维 on 2017/3/31.
 */
var express = require("express");
var router = express.Router();

var passport = require('passport');
// var GitHubStrategy = require('passport-github').Strategy;
var JirenguStrategy = require('passport-jirengu').Strategy;

passport.serializeUser(function(user, done) {
    console.log('---serializeUser---');
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---');
    done(null, obj);
});

passport.use(new JirenguStrategy({
        clientID: '5c4e7ab974a050290995fa279d949a6e8540995e28e3b5ff04cf19d23f90c513',
        tokenURL: 'http://user.jirengu.com/oauth/token',
        clientSecret: 'aaeaab099520704c3a1998da9c8fdc26e02ba7dd252b1ce70b4c6f6a45cd7f5d',
        callbackURL: "http://localhost:3000/oauth/jirengu/callback"},
    function(accessToken, refreshToken, profile, done) {
        done(null, profile)
    }));

router.get('/jirengu',
    passport.authenticate('jirengu'));

router.get('/jirengu/callback',
    passport.authenticate('jirengu', { failureRedirect: '/' }),
    function(req, res) {
        console.log('success......')
        console.log(req.user);
        req.session.user = {
            id: req.user._json.uid,
            username: req.user._json.name,
            avatar: req.user._json.avatar,
            provider: req.user.provider
        };
        res.redirect('/');
    });
router.get("/logout",function (req,res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
