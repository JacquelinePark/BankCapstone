function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="/images/bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
