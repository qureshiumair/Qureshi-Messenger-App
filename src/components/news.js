import { React, useEffect, useState, useContext } from "react";
import News_items from "./news_items";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { theme_context } from "./home";

export default function News(props) {
  let curr_theme = useContext(theme_context);
  let [state, set_state] = useState({
    news_api_status: true,
    page_number: 1,
    news_data: [],
    totalResults: 0,
    is_loading: true,
  });

  const update_state = async () => {
    let data = await fetch_me_data(false);
    props.set_progress(70);
    set_state({
      page_number: state.page_number + 1,
      news_data: data.articles,
      totalResults: data.totalResults,
      is_loading: false,
    });
    setTimeout(() => {
      props.set_progress(100);
    }, 500);
  };

  function get_the_url() {
    if (props.search_query == null) {
      return `https://newsapi.org/v2/top-headlines?&country=${props.current_country}&category=${props.category}&apiKey=${props.api_key}&page=${state.page_number}&pageSize=${props.page_size}`;
    }

    return `https://newsapi.org/v2/top-headlines?&apiKey=${props.api_key}&page=${state.page_number}&pageSize=${props.page_size}&q=${props.search_query}`;
  }

  async function fetch_me_data(is_scrolled) {
    let url = get_the_url();
    let response = await fetch(url);
    let data = await response.json();
    if (is_scrolled) {
      set_state({
        ...state,
        news_data: state.news_data.concat(data.articles),
        page_number: state.page_number + 1,
      });
    }

    return data;
  }

  useEffect(() => {
    update_state();
  }, []);

  return (
    <>
      {state.is_loading && <Spinner />}
      {!state.is_loading && (
        <center id="news_comp_heading">
          <h3 style={curr_theme.value}>
            <b>{`${props.news_heading}`}</b>
          </h3>
        </center>
      )}
      <InfiniteScroll
        style={curr_theme.value}
        dataLength={state.news_data.length}
        next={() => {
          fetch_me_data(true);
        }}
        hasMore={state.totalResults != state.news_data.length}
        loader={<Spinner />}
        endMessage={
          !state.is_loading && (
            <center className="my-3">
              <b style={curr_theme.value}>
                {state.news_data.length >= 3 && (
                  <i>That's all we have right now for you.</i>
                )}
                {state.news_data.length < 1 && (
                  <i>No data found at the moment try again after sometime!!!</i>
                )}
              </b>
            </center>
          )
        }
      >
        <News_items
          news_data={state.news_data}
          key={props.category}
          is_loading={state.is_loading}
        />
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  category: "business"
};

News.propTypes = {
  news_heading: PropTypes.string,
  search_query: PropTypes.string,
  set_progress: PropTypes.func,
  page_size: PropTypes.string,
  api_key: PropTypes.string,
  current_country:PropTypes.string,
  category: PropTypes.string,
};
