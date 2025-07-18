document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    messageDiv.style.color = '';           // reset color
    messageDiv.textContent = 'Logging in…';

    // now these will actually exist
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const res = await fetch('/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        messageDiv.style.color = 'green';
        messageDiv.textContent = data.message;
        // redirect to your home.html
        window.location.href = 'home.html';
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
