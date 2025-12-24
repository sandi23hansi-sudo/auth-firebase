<script type="module">
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth, 
createUserWithEmailAndPassword, 
signInWithEmailAndPassword, 
onAuthStateChanged, 
signOut } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, doc, setDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDH4cDLuaWsyDvgK1aHjjXiJWaSQ9i_Cjk",
  authDomain: "unified-organic-platform.firebaseapp.com",
  projectId: "unified-organic-platform",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* REGISTER */
window.register = async () => {
  const email = regEmail.value;
  const password = regPassword.value;
  const name = regName.value;

  if (!email || !password || !name) {
    registerMsg.innerText = "All fields required";
    return;
  }

  try {
    const userCred =
      await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      name, email
    });

    registerMsg.style.color = "green";
    registerMsg.innerText = "Registered successfully!";
  } catch (err) {
    registerMsg.innerText = err.message;
  }
};

/* LOGIN */
window.login = async () => {
  try {
    await signInWithEmailAndPassword(
      auth, loginEmail.value, loginPassword.value
    );
    window.location.href = "landing.html";
  } catch (err) {
    loginMsg.innerText = "User not found / Invalid credentials";
  }
};

/* AUTH CHECK */
window.checkAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "index.html";
    else userInfo.innerText = user.email;
  });
};

/* LOGOUT */
window.logout = () => {
  signOut(auth);
  window.location.href = "index.html";
};
</script>
