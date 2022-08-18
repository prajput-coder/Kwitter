var firebaseConfig = {
  apiKey: "AIzaSyDc-qtc88-EImU8qwP-LnwpUPerQunpNCw",
  authDomain: "kwitter-68a6e.firebaseapp.com",
  databaseURL: "https://kwitter-68a6e-default-rtdb.firebaseio.com",
  projectId: "kwitter-68a6e",
  storageBucket: "kwitter-68a6e.appspot.com",
  messagingSenderId: "368196252338",
  appId: "1:368196252338:web:f1daaedb59c8adc6830fab"
};
//ADD YOUR FIREBASE LINKS
firebase.initializeApp (firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}