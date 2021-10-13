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
              .add({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
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
