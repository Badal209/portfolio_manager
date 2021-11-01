import { auth } from "../../Firebase";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { logoutAction, loginAction } from "../slice/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const login = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch(loginAction(email, password));
        console.log("SING_IN", res);
        toast.success("Login Successfully !", {
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Email or Password !", {
          autoClose: 3000,
        });
      });
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((res) => {
    //     console.log("res", res);

    //     addDoc(collection(db, "user"), {
    //       email: email,
    //       password: password,
    //     }).then((res) => {
    //       console.log("res..", res);
    //       dispatch(singupAction(email, password));
    //     });
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     if (errorCode === "auth/email-already-in-use") {
    //       alert("already exists an account with the given email address.");
    //     } else {
    //       alert(errorMessage);
    //     }
    //     console.log("ERROR", error);
    //   })
  };
};

export const logout = () => {
  return (dispatch) => {
    signOut(auth);
    dispatch(logoutAction());
  };
};
