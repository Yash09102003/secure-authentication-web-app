import {
auth,
db,
provider,
signInWithPopup,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
doc,
setDoc
} from "./firebase.js";

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".eye-icon");

  if (!passwordInput || !eyeIcon) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-eye-off">
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575"/>
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151"/>
        <path d="m2 2 20 20"/>
      </svg>
    `;
  } else {
    passwordInput.type = "password";
    eyeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-eye">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696
                 10.75 10.75 0 0 1 19.876 0
                 1 1 0 0 1 0 .696
                 10.75 10.75 0 0 1-19.876 0"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    `;
  }
}

function toggleSignupPassword(inputId, iconEl) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-eye-off">
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575"/>
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151"/>
        <path d="m2 2 20 20"/>
      </svg>
    `;
  } else {
    input.type = "password";
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-eye">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696
                 10.75 10.75 0 0 1 19.876 0
                 1 1 0 0 1 0 .696
                 10.75 10.75 0 0 1-19.876 0"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    `;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-box");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit working");

    const email = document.getElementById("email");
    const password =
    document.getElementById("password") ||
    document.getElementById("signup-password");

    if (!email.value.includes("@")) {
      alert("Please enter a valid email");
      email.focus();
      return;
    }
    
    if (password.value.length < 6) {
      alert("Password must be at least 6 characters");
      password.focus();
      return;
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
.then(async (userCredential)=>{

const user = userCredential.user;

const fullName = document.getElementById("name").value;

await setDoc(doc(db,"users",user.uid),{
name: fullName,
email: user.email,
createdAt: new Date().toISOString()
});

alert("Account created successfully!");
window.location.href="index.html";

})
.catch((error)=>{
alert(error.message);
});
  });
});

// GOOGLE SIGN IN
document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.querySelector(".google-btn");
  if (!googleBtn) return;

  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      window.location.href = "dashboard.html";
      console.log("Google user:", user);

      // OPTIONAL redirect
      // window.location.href = "dashboard.html";

    } catch (error) {
      alert(error.message);
    }
  });
});

window.toggleSignupPassword = toggleSignupPassword;
window.togglePassword = togglePassword;

document.addEventListener("DOMContentLoaded", () => {

const forgotBtn = document.getElementById("forgotPassword");

if(!forgotBtn) return;

forgotBtn.addEventListener("click", function(e){
e.preventDefault();

const email = prompt("Enter your registered email:");

if(!email) return;

sendPasswordResetEmail(auth,email)
.then(()=>{
alert("Password reset email sent!");
})
.catch((error)=>{
alert(error.message);
});

});

});

