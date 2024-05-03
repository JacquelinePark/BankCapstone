function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar/> 
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/Login/" component={Login} />
            <Route path="/Deposit/" component={Deposit} />
            <Route path="/Withdraw/" component={Withdraw} />
            <Route path="/AllData/" component={AllData} />
            <Route path="/Logout/" component={Logout} />
          </div>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
