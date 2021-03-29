import MenuIcon from '@material-ui/icons/Menu';
import useWidth from 'hooks/useWidth';
import React, { useState } from 'react';
import "./style.scss";


function Header(props) {
  const { student } = props;
  const width = useWidth();
  const avatarUrl = `https://ui-avatars.com/api/?name=${student.displayName}&background=random&size=42`;
  const [openNav, setOpenNav] = useState(false);

  const handleOpenNav = () => {
    const nav = document.getElementById("Nav");
    if (!openNav) nav.style.width = "220px";
    else {
      if (width > 576) nav.style.width = "56px";
      else nav.style.width = "0";
    }
    setOpenNav(!openNav);
  }

  return (
    <div className="Header">
      <MenuIcon className="Header_nav" onClick={handleOpenNav} />
      <div className="Header_kma">
        <span style={{ color: "red", fontWeight: "bold" }}>KMA</span> Schedule
      </div>
      <div className="Header_student">
        {/* <span>{student.displayName}</span>
        <span>{student.studentCode}</span> */}
        <img src={avatarUrl} alt="" />
      </div>
    </div >
  );
}

export default Header;