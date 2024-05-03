const firebaseConfig = {
  apiKey: "AIzaSyAUDQISvWh982_xUasznghIwQdFBLV7cGY",
  authDomain: "courseo-9497a.firebaseapp.com",
  databaseURL: "https://courseo-9497a-default-rtdb.firebaseio.com",
  projectId: "courseo-9497a",
  storageBucket: "courseo-9497a.appspot.com",
  messagingSenderId: "270297446800",
  appId: "1:270297446800:web:c2afc8c8ce25d1267cdb15",
};

// Initialize Firebase
(async () => {
  try {
    firebase.initializeApp(firebaseConfig);
    //Logout any user if any
    await firebase.auth().signOut();
  } catch (e) {
    console.log(e);
  }
})();

//creates the login card
function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? ( //shows the which form depending on show boolean
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

//creates the success message and a button to create another account
function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        {/* maybe have a button to reroute to login? */}
        Add another account
      </button>
    </>
  );
}

//creates the create account form
function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handle() {
    //create account and logs data in firebase
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Use credentials to log in
        const user = userCredential.user;

        //Gets UID from Firebase
        const uid = user.uid;

        //sets data into mongo
        console.log(name, email, password, uid);
        const url = `/account/create/${name}/${email}/${password}/${uid}`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
        })();
        props.setShow(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    //Signs account after getting info
    firebase.auth().signOut();
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Create Account
      </button>
    </>
  );
}
