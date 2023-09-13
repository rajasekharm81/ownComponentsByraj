import { useState } from "react";

import ThemeObserver from "../utilities/ThemeObserver";
import { useEffect } from "react";

const Header = () => {
  const navItms = [
    { item: "Home", path: "/" },
    { item: "About Us", path: "/aboutus" },
    { item: "Services", path: "/services" },
    { item: "Projects", path: "/projects" },
    { item: "Clients", path: "/clients" },
    { item: "Contact", path: "/contactus" },
    { item: "Careers", path: "/careers" },
  ];
  const act = sessionStorage.getItem("acthead");
  const theme = sessionStorage.getItem("them") == "false" ? false : true;
  const [atstart, setAtstart] = useState(true);
  const [light, setLight] = useState(theme);
  const [showItems, setShowItems] = useState(false);

  const [activeNavItem, setActiveNavItem] = useState(
    act ? act : navItms[0]["item"]
  );

  useEffect(() => {
    ThemeObserver.subscriber(setLight);
  });

  () => {
    ThemeObserver.unsubscribe(setLight);
  };

  document.addEventListener("scroll", () => {
    if (window.scrollY < 2) {
      setAtstart(true);
    } else {
      setAtstart(false);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id.split("-")[0] == "nav_item") {
      setShowItems(true);
    } else {
      setShowItems(false);
    }
  });

  return (
    <div
      className={`${atstart ? "hdr-a" : "hdr-b"} ${
        light ? "bg-light" : "bg-dark"
      } d-flex justify-content-between align-items-center`}
    >
      <h1 className="hdr-logo">Logo</h1>
      <div className="d-flex justify-content-center align-items-center">
        <button
          onClick={() => {
            sessionStorage.setItem("them", !light),
              ThemeObserver.notify(!light);
          }}
          className="btn btn-primary"
        >
          Theme
        </button>
        <ul className="hdr-items">
          <div
            id="nav_item-button"
            className="hdr-nav-menu-button d-flex flex-column"
            onClick={() => setShowItems(!showItems)}
          >
            {showItems ? (
              <div className="nav-x">
                <p className="nav-menu-cls-1" id="nav_item-button-line-4"></p>
                <p className="nav-menu-cls-2" id="nav_item-button-line-5"></p>
              </div>
            ) : (
              <div className="nav--">
                <p className="nav-menu-cls-3" id="nav_item-button-line-1"></p>
                <p className="nav-menu-cls-3" id="nav_item-button-line-2"></p>
                <p className="nav-menu-cls-3" id="nav_item-button-line-3"></p>
              </div>
            )}
          </div>
          <div
            id="hdr-container"
            className={`${showItems ? "hdr-show" : "hdr-hide"} `}
          >
            {navItms.map((each, index) => {
              return (
                <div
                  onClick={(e) =>
                    setActiveNavItem(navItms[e.target.id.split("-")[1]]["item"])
                  }
                  id={`nav_item-${index}`}
                  key={`nav-${each["item"]}`}
                >
                  <li
                    onClick={() => {
                      sessionStorage.setItem("acthead", each["item"]),
                        window.location.replace(`${each["path"]}`);
                    }}
                    id={`nav_item-${index}-index`}
                  >
                    {each["item"]}
                  </li>
                  <hr
                    className={
                      activeNavItem == each["item"]
                        ? "hdr-active"
                        : "hdr-inactive"
                    }
                  />
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
