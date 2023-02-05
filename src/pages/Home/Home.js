import classes from "./Home.module.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CreateButton from "../Common/CreateButton/CreateButton";
import ShowcaseCard from "../Common/ShowcaseCard/ShowcaseCard";
import { getStoriesList } from "../../utility/request";

const Home = () => {
  const [search, setSearch] = useState("");
  const [storiesList, setStoriesList] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getStoriesList().then((data) => {
      if (data.data) {
        setStoriesList(data.data);
      }
      // console.log("data is", data);
    });
  }, []);

  return (
    <>
      <div className="container-85">
        <NavLink style={{ textDecoration: "none" }} to="start">
          <div className={classes.text}>
            <p>Create-a-Story Admin Page (internal use only)</p>
          </div>
        </NavLink>
        <div className={classes.createButton}>
          <NavLink style={{ textDecoration: "none" }} to="/create">
            <CreateButton text="Create new story" />
          </NavLink>
        </div>
        <div className={classes.storiesList}>
          <p className={classes.heading}>Community Showcase</p>
          <div className={classes.flexBox}>
            {storiesList.map((el, i) => {
             return (el.title && el.story) &&  (
                <NavLink
                  key={i}
                  style={{ textDecoration: "none" }}
                  to={"read/" + el.id}
                >
                  <div className={classes.card}>
                    <ShowcaseCard
                      image={
                        el.title.backgroundImage
                          ? el.title.backgroundImage
                          : el.title.backgroundCover
                      }
                      title={el.title.value}
                      rating={15}
                      star={4.7}
                    />
                  </div>
                </NavLink>
              )
            })}
          </div>
          {/* <div className={classes.download}>
            <p className={classes.heading}>Download iPad App</p>
            <div className={classes.img}>
              <img src={apple} width="332px" height="99px" />
            </div>
          </div> */}
          <div className={classes.directory}>
            <p className={classes.heading}>Directory of Story Books</p>
            <div className={classes.searchBox}>
              <input
                className={classes.searchInput}
                value={search}
                onChange={handleSearch}
                placeholder="search for books"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
