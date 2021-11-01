import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../route/route";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  useSelector((state) => state.user.user);
  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      document.body.classList.add("mini-navbar");
    } else {
      document.body.classList.remove("mini-navbar");
    }
  }, [isOpen]);

  // openModal = (event) => {
  //   document.body.classList.add('mini-navbar');
  //   this.setState({ showModal: true });
  // }
  // hideModal = (event) => {
  //   document.body.classList.remove('mini-navbar');
  //   this.setState({ showModal: false });
  // }

  const user = useSelector((state) => state.user.user);

  if (!user) return null;
  return (
    <>
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top"
          role="navigation"
          style={{ marginBottom: 0 }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn"
              onClick={(e) => {
                // e.preventDefault();
                console.log("true");
                setIsOpen(!isOpen);
              }}
            >
              <i className="fa fa-bars" />
            </a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <Link to={routes.logout}>
                <i className="fas fa-sign-out-alt" /> Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-sm-4">
          <h2>Project list</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/dashboard">Project list</Link>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Header;
