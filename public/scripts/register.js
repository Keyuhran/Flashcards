// scripts/register.js

// 1) Class shape must match your requirement
class User {
  constructor(
    id, email, password,
    subject1, subject2, subject3, subject4,
    subject5, subject6, subject7, subject8,
    role
  ) {
    this.id = id;
    this.email = email;
    this.password = password; // NOTE: don't store raw passwords in production.
    this.subject1 = subject1;
    this.subject2 = subject2;
    this.subject3 = subject3;
    this.subject4 = subject4;
    this.subject5 = subject5;
    this.subject6 = subject6;
    this.subject7 = subject7;
    this.subject8 = subject8;
    this.role = role;
  }
}

// 2) Subject options (adjust to your curriculum)
const SUBJECT_OPTIONS = [
  "Mathematics", "Additional Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Literature", "History", "Geography", "Economics",
  "Computer Science", "Art", "Music", "Chinese", "Malay", "Tamil"
];

const form = document.getElementById("registerForm");
const messageEl = document.getElementById("message");
const subjectCountEl = document.getElementById("subjectCount");
const subjectsContainer = document.getElementById("subjectsContainer");

// preserve choices when user changes the count
let savedSubjects = {};

// Init with 1 subject
document.addEventListener("DOMContentLoaded", () => {
  if (subjectCountEl) generateSubjectSelectors(parseInt(subjectCountEl.value, 10) || 1);
});

// Changing the number of subjects dynamically regenerates dropdowns
if (subjectCountEl) {
  subjectCountEl.addEventListener("change", (e) => {
    const count = clamp(parseInt(e.target.value, 10) || 1, 1, 8);
    cacheCurrentSubjects();
    generateSubjectSelectors(count);
  });
}

// Helper to clamp values
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

// Build N subject selects named subject1..subjectN
function generateSubjectSelectors(count) {
  subjectsContainer.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const wrap = document.createElement("label");
    wrap.className = "input-wrap fade-in-up";
    wrap.style.setProperty("--delay", `${i * 50}ms`);

    // icon
    const icon = document.createElement("span");
    icon.className = "input-icon";
    icon.innerHTML = `
      <!-- graduation-cap -->
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 10L12 5 2 10l10 5 10-5z"></path>
        <path d="M6 12v5a6 6 0 0 0 12 0v-5"></path>
      </svg>
    `;

    const select = document.createElement("select");
    select.className = "login-input with-icon";
    select.name = `subject${i}`;
    select.id = `subject${i}`;
    if (i === 1) select.required = true; // require at least Subject 1

    const placeholder = new Option(`Subject ${i}`, "", true, false);
    placeholder.disabled = true;
    select.add(placeholder);

    SUBJECT_OPTIONS.forEach(s => select.add(new Option(s, s)));

    if (savedSubjects[`subject${i}`]) {
      select.value = savedSubjects[`subject${i}`];
    }

    wrap.appendChild(icon);
    wrap.appendChild(select);
    subjectsContainer.appendChild(wrap);
  }
}

// cache currently visible subject selections
function cacheCurrentSubjects() {
  const selects = subjectsContainer.querySelectorAll("select[name^='subject']");
  selects.forEach(sel => {
    savedSubjects[sel.name] = sel.value || "";
  });
}

// Toast-ish message
function setMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.style.marginTop = "0.5rem";
  messageEl.style.textAlign = "center";
  messageEl.style.color = isError ? "#ffdddd" : "#ddffdd";
}

// On submit, construct User and (demo) log it
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMessage("");

  const fd = new FormData(form);
  const email = (fd.get("email") || "").trim();
  const password = (fd.get("password") || "").trim();
  const confirmPassword = (fd.get("confirmPassword") || "").trim(); // NEW
  const role = "User"; // Always register as 'User'

  const subjectsNeeded = subjectCountEl ? clamp(parseInt(subjectCountEl.value, 10) || 1, 1, 8) : 1;

  if (!email || !password) {
    setMessage("Please fill in Email and Password.", true);
    return;
  }

  // NEW: verify confirm password
  if (password !== confirmPassword) {
    setMessage("Passwords do not match.", true);
    return;
  }

  const subjects = [];
  for (let i = 1; i <= 8; i++) {
    const sel = document.getElementById(`subject${i}`);
    const value = sel ? (sel.value || "") : "";
    if (i <= subjectsNeeded && !value) {
      setMessage(`Please select Subject ${i}.`, true);
      return;
    }
    subjects.push(value);
  }

  const chosen = subjects.slice(0, subjectsNeeded).filter(Boolean);
  const hasDup = new Set(chosen).size !== chosen.length;
  if (hasDup) {
    setMessage("Duplicate subjects detected. Please select unique subjects.", true);
    return;
  }

  // Build payload for backend
  const payload = {
    email,
    password,
    subject1: subjects[0] || "",
    subject2: subjects[1] || "",
    subject3: subjects[2] || "",
    subject4: subjects[3] || "",
    subject5: subjects[4] || "",
    subject6: subjects[5] || "",
    subject7: subjects[6] || "",
    subject8: subjects[7] || "",
    role
  };

  try {
    const res = await fetch('/user-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (res.ok) {
      setMessage("Registration successful!");
      form.reset();
      savedSubjects = {};
      if (subjectCountEl) {
        subjectCountEl.value = "1";
        generateSubjectSelectors(1);
      }
    } else {
      setMessage(result.error || "Registration failed.", true);
    }
  } catch (err) {
    setMessage("Network error during registration.", true);
  }
});
