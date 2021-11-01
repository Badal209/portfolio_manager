import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.user);
  if (!user) return null;
  return (
    <div className="footer">
      <div>
        <strong>Copyright</strong> Zluck Solutions Company &copy; 2021-2025
      </div>
    </div>
  );
};

export default Footer;
