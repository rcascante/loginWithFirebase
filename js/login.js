function createLogin() {
    let userEmail;
    let userPassword;
    let email;
    let password;
    let loginButton;
    let registerButton;
    let logOutButton;
    let loginMessageTitle;
    let database;
    let uid;
    let userReference;


    const config = {
        apiKey: "AIzaSyB3Rkk9tPnXrr1Ock9n34PG13WDVBXKm0M",
        authDomain: "loginfirebase-c98e7.firebaseapp.com",
        databaseURL: "https://loginfirebase-c98e7.firebaseio.com",
        projectId: "loginfirebase-c98e7",
        storageBucket: "loginfirebase-c98e7.appspot.com",
        messagingSenderId: "140074740448"
    };

    function start() {
        loginMessageTitle = document.querySelector('.mainTitle');
        userEmail = document.querySelector('#userEmail');
        userPassword = document.querySelector('#userPassword');
        loginButton = document.querySelector('#loginEmail');
        registerButton = document.querySelector('#signUpEmail');
        logOutButton = document.querySelector('#logOut');
        loginButton.addEventListener('click', logInUser);
        registerButton.addEventListener('click', registerUser);
        logOutButton.addEventListener('click', logOutUser);
        firebase.initializeApp(config);
        database = firebase.database();


        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                uid = firebaseUser.uid;
                userReference = database.ref(`users/${uid}`);
                setLoggedUserState();
            } else {
                console.log('not logged in')
            }
        });
    }

    function registerUser() {
        email = userEmail.value;
        password = userPassword.value;
        registerWithEmailWithFirebase(email, password);
    }

    function logInUser() {
        email = userEmail.value;
        password = userPassword.value;
        loginWithEmailWithFirebase(email, password);
    }

    function logOutUser() {
        firebase.auth().signOut();
    }

    function registerWithEmailWithFirebase(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode == 'auth/invalid-email') {
                loginMessageTitle.innerHTML = "Wrong email format";
            } else if (errorCode == 'auth/weak-password') {
                loginMessageTitle.innerHTML = "Weak password";
            }
        });
    }

    function loginWithEmailWithFirebase(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode == 'auth/user-not-found') {
                loginMessageTitle.innerHTML = "You need to register"
            } else if (errorCode == 'auth/wrong-password' || errorCode == 'auth/invalid-email') {
                loginMessageTitle.innerHTML = "Wrong password or email"
            }
        });
    }

    function setLoggedUserState(done) {
        userReference.once('value', snapshot => {
            if (!snapshot.val()) {
                userReference.set({
                    email: email,
                });
            }
        });
        console.log(uid)
        setTimeout(function () {
            window.location = `home.html?userID=${uid}`;
            done();
        }, 200);
    }


    return {
        start
    }
}