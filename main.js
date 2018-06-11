function loginApplication() {
    let userEmail;
    let userPassword;
    let email;
    let password;
    let loginButton;
    let registerButton;
    let logOutButton;
    let userNameTitle;
    let userName;
    let database;
    let userRef;
    let allUsers;


    const config = {
        apiKey: "AIzaSyB3Rkk9tPnXrr1Ock9n34PG13WDVBXKm0M",
        authDomain: "loginfirebase-c98e7.firebaseapp.com",
        databaseURL: "https://loginfirebase-c98e7.firebaseio.com",
        projectId: "loginfirebase-c98e7",
        storageBucket: "loginfirebase-c98e7.appspot.com",
        messagingSenderId: "140074740448"
    };

    function start() {
        userNameTitle = document.querySelector('.mainTitle');
        userName = document.querySelector('#userName');
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
                const userReference = database.ref(`users/${firebaseUser.uid}`);
                userReference.once('value', snapshot => {
                    if (!snapshot.val()) {
                        // User does not exist, create user entry
                        userReference.set({
                            email: email,
                            name: userName.value
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
        firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    function loginWithEmailWithFirebase(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password);
    }

    function setLoggedUserState() {
        userName.classList.add('hide');
        userEmail.classList.add('hide');
        userPassword.classList.add('hide');
        loginButton.classList.add('hide');
        registerButton.classList.add('hide');
        logOutButton.classList.remove('hide');
        displayLoggedUserName();
    }

    function setLoggedOutUserState() {
        userName.value = '';
        userEmail.value = '';
        userPassword.value = '';
        userName.classList.remove('hide');
        userEmail.classList.remove('hide');
        userPassword.classList.remove('hide');
        loginButton.classList.remove('hide');
        registerButton.classList.remove('hide');
        logOutButton.classList.add('hide');
        displayNotLoggedMessage();
    }


    function displayLoggedUserName() {
        userNameTitle.innerHTML = `Hello ${userName.value}`;
    }

    function displayNotLoggedMessage() {
        userNameTitle.innerHTML = 'Authenticate Yourself';
    }

    return {
        start
    }
}