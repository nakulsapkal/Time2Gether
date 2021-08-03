export default function Navbar(props) {
  const loginUser = JSON.parse(localStorage.getItem('User'));
  return( 
    <div> 
      <h1>{loginUser.email}</h1>
    </div>
  )
}
