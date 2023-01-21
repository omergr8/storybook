import classes from "./Home.module.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CreateButton from "../Common/CreateButton/CreateButton";
import ShowcaseCard from "../Common/ShowcaseCard/ShowcaseCard";
import apple from "../../assets/images/appStore.svg";
import { getStoriesList } from "../../utility/request";
const si =
  "https://s3-alpha-sig.figma.com/img/4003/dce8/c3235cb2db6897bef0c1bac1c0193088?Expires=1673827200&Signature=Ah34yZrEemYdnVpl00mJMRyhfV-PeLDd~NXumy5TpbOH5RZuul2JAJE93FaTsgyyvey0CC6fLihhr8ftbWp2eXfBGX8RhusBhC4DwUO3jGb3EKuxnWV4kMjnmaBNjugTFpey6mZgmFdLdhyIseW7cvEIlM3O9cil5Mr0BXJLAqVOLkSItsGt5tlXrALhOo~7rU83m~SZUaMa0nhD~fNI7QgLxGcpP2DHXdagfduRTOnhFzc~kzoccBF0FSI3YtVhGy2gOjvYZLnfzY0OVpMuUmIUfSm2BKl46spMHyDI-b5FoKMSC29Qz4eau4qYcXDyORYG-MaGyHoTxjF~YYJGpQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
const Home = ({ direction, icon, text, isActive }) => {
  const [search, setSearch] = useState("");
  const [storiesList,setStoriesList] = useState([])
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(()=>{
    getStoriesList().then(data =>{
        if(data.data){
            setStoriesList(data.data)
        }
        console.log("data is",data)
    })
   
  },[])

  return (
    <>
      <div className="container-85">
        <div className={classes.title}>
          <h1>Dallas</h1>
        </div>
        <div className={classes.text}>
          <p>Fun stories to encourage problem-solving and creativity</p>
        </div>
        <div className={classes.createButton}>
          <NavLink style={{ textDecoration: 'none' }} to="start">
            <CreateButton text="Create your own story book for your kids with the power of AI" />
          </NavLink>
        </div>
        <div className={classes.storiesList}>
          <p className={classes.heading}>Community Showcase</p>
          <div className={classes.flexBox}>
            {storiesList.map((el, i) => (
                <NavLink key={i} style={{ textDecoration: 'none' }} to={"read/"+el.id}>
              <div  className={classes.card} >
                <ShowcaseCard
                  image={el.title.backgroundImage ? el.title.backgroundImage : el.title.backgroundCover }
                  title={el.title.value}
                  rating={15}
                  star={4.7}
                />
              </div>
              </NavLink>
            ))}
          </div>
          <div className={classes.download}>
            <p className={classes.heading}>Download iPad App</p>
            <div className={classes.img}>
              <img src={apple} width="332px" height="99px" />
            </div>
          </div>
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
