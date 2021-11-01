import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../store/actions/userActions";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(logout());
    history.push("/");
  });
  return null;
};

export default Logout;
