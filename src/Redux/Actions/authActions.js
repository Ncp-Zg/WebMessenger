import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import { authConstants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `{$authConstant.USER_LOGIN}_REQUEST`,
    });
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const currentUser = auth.currentUser;
        const name = `${user.firstName} ${user.lastName}`;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            //if u are here means it is updated successfully
            db.collection("users")
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                // successful
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };

                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("user logged in successfully");
                dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((err) => {
                console.log(err);
                dispatch({
                  type: `${authConstants.USER_LOGIN}_FAILURE`,
                  payload: err,
                });
              });
          });
      })
      .catch((error) => console.log(error));
  };
};

export const signIn = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);

        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(" ");
            const firstName = name[0];
            const lastName = name[1];

            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
            };

            localStorage.setItem("user", JSON.stringify(loggedInUser));

            dispatch({
              type: `${authConstants.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstants.USER_LOGIN}_FAILURE`,
              payload: { error },
            });
            toast.error("Email ya da ??ifre hatal??!!")
          });
      })
      .catch((err) => {console.log(err);toast.error("Email ya da ??ifre hatal??!!")});
  };
};

export const isloggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user: user },
      });
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { error: "Login again please" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `$authConstants.USERLOGOUT}_REQUEST` });

    //Now lets logout user

    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth
          .signOut()
          .then(() => {
            //successfully

            localStorage.clear();
            dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: `${authConstants.USER_LOGOUT}_FAILURE`,
              payload: { err },
            });
          });
      })
      .catch((err) => console.log(err));
  };
};
