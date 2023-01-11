import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
const initialstate = {
  email: "",
  password: "",

}
export default function SignUp() {

  const [state, setState] = useState(initialstate)
  const [user, setUser] = useState({})

  // This is use for onAuth change 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        setUser(user);
        // ...
      } else {
        // User is signed out
        console.log("user logged out");
        setUser({})
      }
    });
  }, [])
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        console.log("user Loggedin Successfully");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        // ..
      });

  }
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user logout");
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <div className="mt-4">
      <div className="container">
        {
          user.email
            ?
            <div className="row">
              <div className="col text-center">
                <h3 className="text-center"><strong>userEmail: </strong> {user.email}</h3>
                <button className="btn btn-danger px-5 mt-2" onClick={handleLogOut}>Log Out</button>
              </div>
            </div>
            :
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3">
                <div className="card p-3">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <input type="email" placeholder="Email" name="email" className="form-control mb-2" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input type="password" placeholder="password" name="password" className="form-control mb-2" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col text-center">
                        <button className="btn btn-info my-2 w-50">Login</button>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col">
                      <Link to='/signup' className="text-primary">Register Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  );
}
