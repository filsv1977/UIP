import {logOut} from "../api/logout";

let idTimer;

export const logonTimer = (dispatch, navigate) => {
  if (idTimer) {
    clearTimeout(idTimer)
  }

  idTimer = setTimeout(() => {
    logOut(dispatch).then(_=> navigate('/'));
  }, "360000")
}
