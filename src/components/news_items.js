import { React, useContext } from "react";
import PropTypes from "prop-types";
import { theme_context } from "./home";
import default_article_img from '../static/default_article_img.jpg';

export default function News_items(props) {
  let theme_context_ = useContext(theme_context);
  return (
    <>
      <div className="container my-2" style={theme_context_}>
        <div className="row g-0">
          {!props.is_loading &&
            props.news_data.map((info_obj) => (
              <div
                className="col-md-4 my-4 mx-1.5 h-80  zoom_card"
                key={info_obj.title.split(" - ")[0]}
                onClick={() => {
                  window.open(info_obj.url);
                }}
                title="Read Full Article"
              >
                <img
                  src={
                    info_obj.urlToImage
                      ? info_obj.urlToImage
                      : default_article_img
                  }
                  alt=""
                  className="card-img-top custom_card_img"
                  width="160"
                  height="240"
                  
                />
                <div className="my-1" style={{ height: "200px" }}>
                  <h5 className="card-title">
                    {info_obj.title.split(" - ")[0]}
                  </h5>
                  <p className="card-text text-wrap pos ">
                    {info_obj.description
                      ? info_obj.description.slice(0, 150)
                      : "No data found"}
                    ...
                  </p>
                </div>
                <div className="footer text-body-secondary">
                  <small className="news_update_time">{`Last updated at ${
                    info_obj.publishedAt.split("T")[0]
                  }`}</small>
                  <small className="badge">{info_obj.source.name}</small>
                  <br />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

News_items.defaultProps = {
  news_data: [],
  is_loading: true,
};

News_items.propTypes = {
  news_data: PropTypes.array,
  is_loading: PropTypes.bool,
};
