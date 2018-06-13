function createLogin() {
    let userEmail;
    let userPassword;
    let email;
    let password;
    let loginButton;
    let registerButton;
    let logOutButton;
    let messageToUser;
    let database;

    function activateFirebase() {
        const config = {
            apiKey: "AIzaSyB3Rkk9tPnXrr1Ock9n34PG13WDVBXKm0M",
            authDomain: "loginfirebase-c98e7.firebaseapp.com",
            databaseURL: "https://loginfirebase-c98e7.firebaseio.com",
            projectId: "loginfirebase-c98e7",
            storageBucket: "loginfirebase-c98e7.appspot.com",
            messagingSenderId: "140074740448"
        };
        firebase.initializeApp(config);
        database = firebase.database();
    }


    function start() {
        messageToUser = document.querySelector('.mainTitle');
        userEmail = document.querySelector('#userEmail');
        userPassword = document.querySelector('#userPassword');

        loginButton = document.querySelector('#loginEmail');
        loginButton.addEventListener('click', logInUser);

        registerButton = document.querySelector('#signUpEmail');
        registerButton.addEventListener('click', registerUser);

        logOutButton = document.querySelector('#logOut');
        logOutButton.addEventListener('click', logOutUser);

        activateFirebase();
        onUserStateChange();
    }

    function onUserStateChange() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const userReference = database.ref(`users/${firebaseUser.uid}`);
                userReference.once('value', snapshot => {
                    if (!snapshot.val()) {
                        userReference.set({
                            email: email,
                        });
                    }
                });
                console.log(firebaseUser.uid)
                setLoggedUserState();
            } else {
                console.log('not logged in')
                setLoggedOutUserState();
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
                messageToUser.innerHTML = "Wrong email format";
            } else if (errorCode == 'auth/weak-password') {
                messageToUser.innerHTML = "Weak password";
            }
        });
    }

    function loginWithEmailWithFirebase(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode == 'auth/user-not-found') {
                messageToUser.innerHTML = "You need to register"
            } else if (errorCode == 'auth/wrong-password' || errorCode == 'auth/invalid-email') {
                messageToUser.innerHTML = "Wrong password or email"
            }
        });
    }

    function setLoggedUserState() {
        userEmail.classList.add('hide');
        userPassword.classList.add('hide');
        loginButton.classList.add('hide');
        registerButton.classList.add('hide');
        logOutButton.classList.remove('hide');
        messageToUser.innerHTML = `Hello ${email}`;
    }

    function setLoggedOutUserState() {
        userEmail.value = '';
        userPassword.value = '';
        userEmail.classList.remove('hide');
        userPassword.classList.remove('hide');
        loginButton.classList.remove('hide');
        registerButton.classList.remove('hide');
        logOutButton.classList.add('hide');
        messageToUser.innerHTML = 'Authenticate Yourself';
    }


    return {
        start
    }
}