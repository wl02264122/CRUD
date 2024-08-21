// Create
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCwGdR-3aFaKU6OY_qZDbbyyX9E5vkFOOg",
    authDomain: "github-crud-ed61b.firebaseapp.com",
    projectId: "github-crud-ed61b",
    storageBucket: "github-crud-ed61b.appspot.com",
    messagingSenderId: "1094516833746",
    appId: "1:1094516833746:web:2fd069720847b274ef9c0b",
    databaseURL: "https://github-crud-ed61b-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let submit = document.querySelector(".submit-box");

const data = {
    create() {
        submit.addEventListener("click", (e) => {
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
                username: usernameInfo,
                password: passwordInfo
            })
                .then(function () {
                    alert("Register success");
                }).catch(function (error) {
                    alert("Error:" + error);
                })
        })
    }
}

data.create();
