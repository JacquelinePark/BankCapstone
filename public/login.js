const loggedIn = LoggedIn;

function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <h5>Please use the navigation bar up top to select your next action.</h5>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handle() {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;

        console.log(email, password, uid);

        fetch(`/account/login/${email}/${password}/${uid}`)
          .then((response) => response.text())
          .then((text) => {
            try {
              const data = JSON.parse(text);
              props.setStatus("");
              props.setShow(false);
              document.getElementById("accountName").innerHTML = email; //adds email to navbar
              loggedIn.tf = true; //sets context LoggedIn to true
            } catch (err) {
              props.setStatus(text);
              console.log("err:", text);
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <>
      Email
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
        Login
      </button>
    </>
  );
}
