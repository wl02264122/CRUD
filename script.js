// Create
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, set, onValue, update, get } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth,connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCwGdR-3aFaKU6OY_qZDbbyyX9E5vkFOOg",
    authDomain: "github-crud-ed61b.firebaseapp.com",
    projectId: "github-crud-ed61b",
    storageBucket: "github-crud-ed61b.appspot.com",
    messagingSenderId: "1094516833746",
    appId: "1:1094516833746:web:2fd069720847b274ef9c0b",
    databaseURL: "https://github-crud-ed61b-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const createSubmit = document.querySelector("#register-submit");
const login = document.querySelector("#login-submit");
const updates = document.querySelector("#update-submit");
const authCreateSubmit = document.querySelector("#auth-register-submit");
const authLoginSubmit = document.querySelector("#auth-login-submit");

const data = {
    create() {
        try {
            createSubmit.addEventListener("click", (e) => {
                let emailInfo = document.querySelector("#email").value;
                let usernameInfo = document.querySelector("#username").value;
                let passwordInfo = document.querySelector("#password").value;
                if (!emailInfo && !usernameInfo && !passwordInfo) {
                    alert("All fields are required!");
                    return;
                }
                else if (!emailInfo) {
                    alert("email cannot be empty.");
                    return;
                } else if (!usernameInfo) {
                    alert("Username cannot be empty.")
                    return;
                } else if (!passwordInfo) {
                    alert("Password cannot be empty.")
                    return;
                }
                set(ref(database, 'users/' + usernameInfo), {
                    email: emailInfo,
                    password: passwordInfo
                })
                    .then(function () {
                        alert("Register success");
                    }).catch(function (error) {
                        alert("Error:" + error);
                    })
            })
        }
        catch { }
    },
    login() {
        try {
            login.addEventListener("click", () => {
                let username = document.querySelector("#username").value;
                let password = document.querySelector("#password").value;
                const starCountRef = ref(database, 'users/' + username);
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    if (password === data.password) {
                        alert('帳號密碼正確，正在登陸...');
                    } else {
                        alert("帳號或密碼錯誤，請稍後再試。");
                    }
                });
            })
        }
        catch { }
    },
    changePassword() {
        try {
            updates.addEventListener("click", () => {
                let username = document.querySelector("#username").value;
                let oldPassword = document.querySelector("#old-password").value;
                let newPassword = document.querySelector("#new-password").value;
                const userRef = ref(database, 'users/' + username);
                get(userRef).then((snapshot) => {
                    const data = snapshot.val();
                    if (oldPassword === data.password) {
                        update(userRef, { password: newPassword })
                        alert("密碼修改完成")
                    } else {
                        alert("帳號或密碼錯誤，請稍後再試。")
                    }
                })
            })
        }
        catch { }
    }
}
const userAuth = {
    
    creatNewUser() {
        try{
            authCreateSubmit.addEventListener("click", (event) => {
                const email = document.querySelector("#auth-email").value;
                const password = document.querySelector("#auth-password").value;
                const username = document.querySelector("#auth-username").value;
                console.log('email:'+email+'password:'+password+'username:'+username);
                
                try{
                    createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        alert("創建帳戶中...");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert("發生未知錯誤");
                        console.log(errorCode, errorMessage);
                    })}
                catch{
                    console.log(error);
                }
            })
        }catch{
            
        }
        
    },

    loginNewUser(){
        try{
            authLoginSubmit.addEventListener("click",(event)=>{
            const email = document.querySelector("#auth-email").value;
            const password = document.querySelector("#auth-password").value;
            console.log('email:'+email+'password:'+password);
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("登陸帳戶中...");
                    window.location.href = "grand.html";
                })
                .catch((error) =>{
                    alert("發生未知錯誤");
                    console.log(error.code, error.message);
                })
            })
        }catch{
        }
    }
}
data.create();
data.login();
data.changePassword();
userAuth.creatNewUser();
userAuth.loginNewUser();