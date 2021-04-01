import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const handleBlur = (event) => {
    let fieldValid = true;
    // console.log(event.target.name, event.target.value);
    if (event.target.name === "email") {
      fieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordValid1 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        event.target.value
      );
      fieldValid = isPasswordValid && isPasswordValid1;
    }
    if (fieldValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  };
  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signInInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signInInfo);
        setLoggedInUser(signInInfo);
        history.replace(from);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(
          "Error Code:",
          errorCode,
          "Error Message:",
          errorMessage,
          "Credential :",
          credential,
          "Email:",
          email
        );
        // ...
      });
  };
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signOutInfo = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signOutInfo);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {})
      .catch(function (error) {});
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(user.email, user.password);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })

        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)

        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.name = res.user.displayName;
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          //   console.log("sign In user info", res.user.displayName);
        })

        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    e.preventDefault();
  };
  return (
    <div className="w-50 mx-auto mt-5">
      <form>
        <h1>Authentication</h1>
        <div className="form-group">
          {newUser && (
            <input
              required
              type="name"
              className="form-control"
              name="name"
              placeholder="Name"
              onBlur={handleBlur}
            ></input>
          )}
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            required
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onBlur={handleBlur}
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            title="Password must contain uppercase, lowercase, number , special character and length 6-16!"
            required
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onBlur={handleBlur}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            title="Password must contain uppercase, lowercase, number , special character and length 6-16"
            required
            name="confirmPassword"
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Password"
          ></input>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={() => setNewUser(!newUser)}
            name="newUser"
          ></input>
          <label className="form-check-label" htmlFor="exampleCheck1">
            New User?
          </label>
        </div>
        <input
          className="btn btn-primary"
          onClick={handleSubmit}
          type="submit"
          value={newUser ? "Sign Up" : "Sign In"}
        />
      </form>
      <h5>Or</h5>

      {user.isSignedIn ? (
        <button className="btn btn-primary" onClick={handleSignOut}>
          Sign Out With Google
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleGoogleSignIn}>
          Sign In With Google
        </button>
      )}
      {user.success ? (
        <p style={{ color: "green" }}>
          Your {newUser ? "registration" : "Logged In"} is successful
        </p>
      ) : (
        <p style={{ color: "red" }}>{user.error}</p>
      )}
    </div>
  );
};

export default Login;
