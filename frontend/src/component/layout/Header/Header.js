import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaSearch } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="#FFA500"
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(0 0 0)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIconUrl="/login"
      searchIcon={true}
      SearchIconElement={FaSearch}
      cartIcon={true}
      CartIconElement={RiShoppingCartFill}
      profileIcon={true}
      ProfileIconElement={CgProfile}
      profileIconColor="rgba(0 0 0)"
      searchIconColor="rgba(0 0 0)"
      cartIconColor="rgba(0 0 0)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
      ProfileIconMargin="1vmax"
    />
  );
};
export default Header;
