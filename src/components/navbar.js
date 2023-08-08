import { React, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SplashScreen from "./splash_screen";
import app_logo from "../static/app_logo.png";
import search_icon from "../static/search_icon.svg";
import { theme_context as theme_context_ } from "./home";

var curr_selected_news_cate = null;

function search_result(props, navigate) {
  const search_bar = document.getElementById("input_search_query");
  let search_string = search_bar.value.trim();
  if (search_string.length !== 0) {
    props.set_query(search_string);
    search_bar.value = "";
    navigate("search_query");
  } else {
    alert("Invalid input!!!");
  }
}

function update_startup_screen(props) {
  setTimeout(() => {
    props.startup_screen[1](false);
  }, 1500);
  return true;
}

function highlight_news_category(event) {
  if (!event) {
    let paths_list = window.location.pathname.split("/");
    let id =
      paths_list[paths_list.length - 1] === "" || paths_list.length < 3
        ? "general"
        : paths_list[paths_list.length - 1];
    document.getElementById(id).classList.add("nav_item_focus");
    curr_selected_news_cate = id;
    return;
  }
  document
    .getElementById(curr_selected_news_cate)
    .classList.remove("nav_item_focus");
  document.getElementById(event.target.id).classList.add("nav_item_focus");
  curr_selected_news_cate = event.target.id;
}

function set_new_theme(curr_theme, set_theme) {
  if (curr_theme.color === "black") {
    localStorage.setItem(
      "curr_theme",
      '{"color":"white","backgroundColor":"black"}'
    );
  } else {
    localStorage.setItem(
      "curr_theme",
      '{"color":"black","backgroundColor":"white"}'
    );
  }
  let localStoragePreference = localStorage.getItem("curr_theme");
  document.body.style.color = localStoragePreference.color;
  document.body.style.backgroundColor = localStoragePreference.backgroundColor;
  set_theme(JSON.parse(localStoragePreference));
}

export default function Navbar(props) {
  let theme_context = useContext(theme_context_);
  const navigate = useNavigate();
  useEffect(() => {
    !props.startup_screen[0] && highlight_news_category();
  }, [!props.startup_screen[0]]);
  return (
    <>
      {props.startup_screen[0] && <SplashScreen />}
      {props.startup_screen[0] && update_startup_screen(props)}

      {!props.startup_screen[0] && (
        <div style={theme_context.value}>
          <nav className="navbar navbar-expand-xl  sticky-top navbar-light custom_navbar">
            <div className="container-fluid">
              <img
                src={`${app_logo}`}
                alt="app logo"
                width="3%"
                height="0%"
              />
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul
                  className="navbar-nav me-auto mb-2 mb-lg-0"
                  key="country_category"
                >
                  {props.news_category_list.map((name) => (
                    <li key={name}>
                      <Link
                        className="nav-link nav_item"
                        aria-current="page"
                        to={name}
                        id={name}
                        onClick={(e) => {
                          highlight_news_category(e);
                        }}
                      >
                        {name.slice(0, 1).toUpperCase().concat(name.slice(1))}
                      </Link>
                    </li>
                  ))}
                  <li key="about_me">
                    <Link
                      className="nav-link nav_item"
                      aria-current="page"
                      to="about_me"
                      id="about_me"
                      onClick={(e) => {
                        highlight_news_category(e);
                      }}
                    >
                      About Me
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown ">
                <button
                  className="btn btn-secondary dropdown-toggle country_select"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {"Region"}
                </button>
                <ul className="dropdown-menu" id="country_list">
                  {Object.keys(props.country_name_map).map((val) => (
                    <li
                      className="select_option"
                      onClick={() => {
                        props.set_country(val);
                      }}
                      key={val}
                    >
                      {val}
                    </li>
                  ))}
                </ul>
              </div>
              <div id="search_bar" key="search_bar">
                <input
                  type="text"
                  placeholder="Search Here..."
                  id="input_search_query"
                />
                <img
                  src={`${search_icon}`}
                  onClick={() => {
                    search_result(props, navigate);
                  }}
                  id="search_button"
                  alt=""
                />
              </div>
            </div>
            <div id="dark_mode">
              <img
                alt="dark mode button"
                title="change view mode"
                id={
                  theme_context.value.color === "black"
                    ? "day_mode_img"
                    : "night_mode_img"
                }
                onClick={() => {
                  set_new_theme(theme_context.value, theme_context.func);
                }}
              />
            </div>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
}
