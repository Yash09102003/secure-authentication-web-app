import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSbA3wbJZUMnhcp3Ygj5zngIl9qLmY6TI",
  authDomain: "auth-ui-87be7.firebaseapp.com",
  projectId: "auth-ui-87be7",
  appId: "1:539053762326:web:d86caee24d52fa9c755237",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 PROTECT DASHBOARD
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // ❌ Not logged in → go back to login
    window.location.href = "index.html";
  } else {
    // ✅ Logged in
    document.getElementById("username").innerText =
      `Welcome ${user.displayName} 🎉`;
  }
  document.getElementById("username").innerText = user.displayName;
  document.getElementById("userEmail").innerText = `Email: ${user.email}`;

  if (user.photoURL) {
    document.getElementById("userPhoto").src = user.photoURL;
  } else {
    document.getElementById("userPhoto").src =
      "https://ui-avatars.com/api/?name=" + user.displayName;
  }
});

// Logout
document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
