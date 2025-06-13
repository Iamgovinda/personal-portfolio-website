import React from "react";
import UserInfo1 from "../../components/UserInfo/UserInfo1";
import styles from "./Home.module.scss";
import WhatIDo from "../WhatIDo/WhatIDo";
import Resume from "../Resume/Resume";
import TestimonialLayout from "../Testimonial/TestimonialLayout";
// import ClientLayout from "../ClientLayout/ClientLayout";
import BlogLayout from "../Blog/Blog";
import Contact from "../../components/Contact/Contact";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "../../API/axios";
import { useUserContext } from "../../context/UserContext";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [Error, isError] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const {setUserData} = useUserContext();



  useEffect(()=>{
    if(isLoading){
      get(`/user/info/`, {"username": process.env.REACT_APP_USER_USERNAME}).then((response)=>{
        if(response.status===200){
          setUserInfo(response.data.results);
          setIsLoading(false);
          setUserData(response.data?.results[0]);
        }
      })
    }
  }, [isLoading])
  return (
    <>
      <div className={styles["parent"]}>
        <UserInfo1 data={userInfo} loading={isLoading}/>
        <div className={styles["blur"]}></div>
        <div className={styles["blur2"]}></div>
        <div className={styles["blur3"]}></div>
      </div>

      <WhatIDo email={userInfo[0]?.email} what_i_do_items={userInfo?.[0]?.what_i_do_items} loading={isLoading} what_i_do_desc={userInfo[0]?.what_i_do_desc}/>
      <Resume data={userInfo[0]} loading={isLoading}/>
      <BlogLayout/>
      <TestimonialLayout data={userInfo[0]?.testimonials} loading={isLoading}/>
      {/* {
      client && <ClientLayout data={client}/>
      } */}
      <Contact data={userInfo[0]}/>
    </>
  );
};

export default Home;
