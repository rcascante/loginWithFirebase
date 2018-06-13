function createHome() {
    let homeMessageTitle;
    let logOutButton;
    let database;
    let refToUsersObject;
    let email;
    let userID

    const config = {
        apiKey: "AIzaSyB3Rkk9tPnXrr1Ock9n34PG13WDVBXKm0M",
        authDomain: "loginfirebase-c98e7.firebaseapp.com",
        databaseURL: "https://loginfirebase-c98e7.firebaseio.com",
        projectId: "loginfirebase-c98e7",
        storageBucket: "loginfirebase-c98e7.appspot.com",
        messagingSenderId: "140074740448"
    };

    function start() {
        homeMessageTitle = document.querySelector('#homeMessageTitle');
        logOutButton = document.querySelector('#logOut');
        logOutButton.addEventListener('click', logOutUser);
        firebase.initializeApp(config);
        database = firebase.database();
        refToUsersObject = database.ref().child('users');
        refToUsersObject.once('value', function (snapshot) {
            console.log(snapshot.val());
        });
        getUserID();
    }

    function setUserNameInTitle(email) {
        homeMessageTitle.innerHTML = `Hello ${email}`;
    }

    function getUserID() {
        let url_string = "file:///Users/rcascate/Documents/Firebase/loginWithFirebase/home.html?userID=OKqr9cIHrUfzkVfNqg0QzBponW23";
        var url = new URL(url_string);
        userID = url.searchParams.get("userID");
        console.log(userID);
    }



    function logOutUser() {
        firebase.auth().signOut();
        window.location = 'login.html';
    }

    return {
        start
    }
}