<script type="module">
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth, 
createUserWithEmailAndPassword, 
signInWithEmailAndPassword, 
onAuthStateChanged, 
signOut } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG (REPLACE WITH YOUR OWN) */
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
window.register = async () => {
  const name = regName.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (!name || !email || !password) {
    registerMsg.innerText = "All fields are required";
    return;
  }

  try {
    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    registerMsg.style.color = "green";
    registerMsg.innerText = "Registration successful!";
  } catch (error) {
    registerMsg.innerText = error.message;
  }
};

/* ================= LOGIN ================= */
window.login = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value.trim(),
      loginPassword.value.trim()
    );
    window.location.href = "landing.html";
  } catch (error) {
    loginMsg.innerText = "User not found or invalid credentials";
  }
};

/* ================= AUTH CHECK ================= */
window.checkAuth = () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      const snap = await getDoc(doc(db, "users", user.uid));
      userInfo.innerText = `Welcome ${snap.data().name} (${user.email})`;
    }
  });
};

/* ================= LOGOUT ================= */
window.logout = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};
</script>
