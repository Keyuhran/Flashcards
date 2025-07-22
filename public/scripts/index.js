document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('loginForm');
const params   = new URLSearchParams(location.search);
const returnTo = params.get('returnTo') || 'home.html';
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async e => {
    e.preventDefault();
    messageDiv.style.color = '';           // reset color
    messageDiv.textContent = 'Logging in…';

    // now these will actually exist
    const email = form.email.value.trim();
    const password = form.password.value;
    const rememberMe = form.rememberMe.checked; 

    try {
    const res = await fetch('/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password,rememberMe}),
    });

    const data = await res.json();
    console.log('🚥 login payload →', data);
    if (res.ok) {
        messageDiv.style.color = 'green';
        messageDiv.textContent = data.message;
        if (data.role === 'Admin') {
            window.location.href = 'admin.html';
        }
        else {
            window.location.href = returnTo;
        }
    } else {
        throw new Error(data.error || 'Login failed');
    }
    } catch (err) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = err.message;
    console.error('Login error:', err);
    }
});
});

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
    return req.session.destroy(() => res.redirect('/index.html'));
  }

  return next();
}
