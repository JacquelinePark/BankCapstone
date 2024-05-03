function Logout() {
  const [show, setShow] = React.useState(true);
  
  return (
    <Card
      bgcolor="secondary"
      header="Logout"
      body={
        show ? (
          <LogoutForm setShow={setShow} />
        ) : (
          <LogoutMsg />
        )
      }
    />
  );
}

function LogoutMsg() {
  return (
    <>
      <h5>Success</h5>
      <h5>You have been succesfully logged out.</h5>
    </>
  );
}

function LogoutForm(props) {

  return (
    <>
      Press the button below to logout.
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          console.log("logout button clicked");
          (async () => {
            try {
              await firebase.auth().signOut();
              console.log(firebase.auth().currentUser);
              props.setShow(false);
            } catch (e) {
              console.log(e);
            }
          })();
          document.getElementById("accountName").innerHTML = "";
        }}
      >
        Logout
      </button>
    </>
  );
}
