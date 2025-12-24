import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔐 FIREBASE CONFIG (YOURS) */
const firebaseConfig = {
  apiKey: "AIzaSyDH4cDLuaWsyDvgK1aHjjXiJWaSQ9i_Cjk",
  authDomain: "unified-organic-platform.firebaseapp.com",
  projectId: "unified-organic-platform",
};

/* INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ================= REGISTER ================= */
window.register = async function () {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const msg = document.getElementById("registerMsg");

  if (!name || !email || !password) {
    msg.innerText = "All fields are required";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email
    });

    msg.style.color = "green";
    msg.innerText = "Registered successfully";
  } catch (e) {
    msg.innerText = e.message;
  }
};

/* ================= LOGIN ================= */
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "landing.html";
  } catch {
    msg.innerText = "User not found / invalid credentials";
  }
};

/* ================= AUTH CHECK ================= */
window.checkAuth = function () {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      const snap = await getDoc(doc(db, "users", user.uid));
      document.getElementById("userInfo").innerText =
        `Welcome ${snap.data().name} (${user.email})`;
    }
  });
};

/* ================= LOGOUT ================= */
window.logout = async function () {
  await signOut(auth);
  window.location.href = "index.html";
};
