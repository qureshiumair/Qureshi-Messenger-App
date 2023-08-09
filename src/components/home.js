import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import News from "./news";
import Navbar from "./navbar";
import LoadingBar from "react-top-loading-bar";
import { useState, createContext } from "react";
import ErrorElement from "./error_element";
import AboutMe from "./about_me";

function usePrefer_country(name) {
  let [curr_name, update_curr_name] = useState(
    localStorage.getItem("selected_country") == null
      ? name
      : localStorage.getItem("selected_country")
  );
  function set_country(new_country) {
    localStorage.setItem("selected_country", new_country);
    update_curr_name(new_country);
  }

  return [curr_name, set_country];
}

function get_curr_theme() {
  let curr_theme = { color: "black", backgroundColor: "white" };
  if (localStorage.getItem("curr_theme") == null) {
    return curr_theme;
  }

  curr_theme = JSON.parse(localStorage.getItem("curr_theme"));
  document.body.style.color = curr_theme.color;
  document.body.style.backgroundColor = curr_theme.backgroundColor;
  return curr_theme;
}

export const theme_context = createContext();
export default function Home() {
  let [curr_theme, set_theme] = useState(get_curr_theme());
  const country_names = JSON.parse(process.env.REACT_APP_NEWS_COUNTRY_MAP);
  let [country, set_country] = usePrefer_country("India");
  let [progress, setProgress] = useState(0);
  let [search_query, set_query] = useState("");
  let [splash_screen, set_splash_screen] = useState(true);
  const api_key = process.env.REACT_APP_NEWS_API_KEY;
  const homepage_url = process.env.REACT_APP_NEWS_HOMEPAGE;
  const news_category_list = [
    "general",
    "business",
    "technology",
    "entertainment",
    "science",
    "health",
    "sports",
  ];
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorElement />,
    },
    {
      path: `${homepage_url}/`,
      element: (
        <Navbar
          key="navbar_in_home"
          current_country={country}
          set_country={set_country}
          country_name_map={country_names}
          set_query={set_query}
          startup_screen={[splash_screen, set_splash_screen]}
          news_category_list={news_category_list}
        />
      ),
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: (
            <News
              key={`{general_${country}}`}
              news_heading={`Top General Headlines of ${country}`}
              set_progress={setProgress}
              page_size="9"
              api_key={api_key}
              current_country={country_names[country]}
            />
          ),
          errorElement: <ErrorElement />,
        },
        {
          path: `search_query`,
          element: (
            <News
              key={`search_${search_query}}`}
              news_heading={`Search Result for ${search_query}`}
              search_query={search_query}
              set_progress={setProgress}
              page_size="9"
              api_key={api_key}
              current_country={country_names[country]}
            />
          ),
          errorElement: <ErrorElement />,
        },
        ...news_category_list.map((val) => ({
          path: `${val}`,
          element: (
            <News
              key={`{${val}_${country}}`}
              news_heading={`Top ${val
                .slice(0, 1)
                .toUpperCase()
                .concat(val.slice(1))} Headlines of ${country}`}
              set_progress={setProgress}
              page_size="9"
              api_key={api_key}
              current_country={country_names[country]}
              category={val}
            />
          ),
          errorElement: <ErrorElement />,
        })),
        {
          path: "about_me",
          element: <AboutMe />,
          errorElement: <ErrorElement />,
        },
      ],
    },
  ]);
  return (
    <>
      <theme_context.Provider value={{ value: curr_theme, func: set_theme }}>
        <div style={curr_theme}>
          <RouterProvider router={router} />
          <LoadingBar
            height={3}
            color="black"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            key="loading_bar"
          />
        </div>
      </theme_context.Provider>
    </>
  );
}
