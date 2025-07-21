const session = require("express-session");

function ensureLoggedIn(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/index.html');
  }

  if (req.session.oneTime) {
    // first protected request: consume the flag
    delete req.session.oneTime;
    req.session.logoutOnNext = true;
    return next();
  }

  if (req.session.logoutOnNext) {
    // after that, destroy session & force login
    sessionStorage.setItem('userId', sessionStorage.getItem('userId'));
    return req.session.destroy(() => res.redirect('/index.html'));

  }

  return next();
}


module.exports = ensureLoggedIn;
