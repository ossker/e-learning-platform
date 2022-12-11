import React, { useEffect, useState } from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import { useAuth } from '../auth'
import Course from '../components/Course'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import LoginPage from './LoginPage'
import { useHistory } from 'react-router-dom'
import styled from "styled-components";
import { hero_images, user_images } from "../utils/images";
import { course_images } from "../utils/images";
import {BsLinkedin, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import UserCourseList from "../components/UserCourseList";
import MyProfileCoursesList from '../components/MyProfileCoursesList'


const LoggedInUser=(id)=>{
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState();
    const history = useHistory()
    
    
    const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    const requestOptions ={
        method: 'GET',
        headers: {
            'content-type':'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`
        }
    }

    useEffect(
        ()=>{
            fetch('/course/my-courses', requestOptions)
            .then(res=>res.json())
            .then(data=>{
                setCourses(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    console.log("actual courses")
    console.log(courses)

    useEffect(
        ()=>{
            fetch('/auth/actual-user', requestOptions)
            .then(res=>res.json())
            .then(data=>{
                setUser(data)
            })
            .catch(err=>console.log(err))
        },[]
    );
    console.log("actual user")
    console.log(user)
    return(
        <UserPageWrapper>
            <div className="header__wrapper">
                <header>
                </header>
                <div className="cols__container">
                    <div className="left__col">
                    <div className="img__container">
                        <img src={user_images.default_user} alt={user?.username} />
                        <span></span>
                    </div>
                    <h2>{user?.username}</h2>
                    <p>{user?.first_name} {user?.last_name}</p>
                    <p>{user?.email}</p>

                    <ul className="about">
                        <li><span>0</span>Followers</li>
                        <li><span>0</span>Following</li>
                        <li><span>0</span>Students</li>
                    </ul>

                    <div className="content">
                        <p>
                        {user?.about_me?user?.about_me:"I am a new user of this platform. I haven't set up my profile yet :)"}
                        </p>
                        <ul>
                            {user?.fb_link?<i className="fab"><Link to={{ pathname: user?.fb_link }} target="_blank"><BsFacebook/></Link></i>:""}
                            {user?.li_link?<i className="fab"><Link to={{ pathname: user?.li_link }} target="_blank"><BsLinkedin/></Link></i>:""}
                            {user?.tw_link?<i className="fab"><Link to={{ pathname: user?.tw_link }} target="_blank"><BsTwitter/></Link></i>:""}
                            {user?.yt_link?<i className="fab"><Link to={{ pathname: user?.yt_link }} target="_blank"><BsYoutube/></Link></i>:""}
                        </ul>
                    </div>
                    </div>
                    <div className="right__col">
                        <ButtonsWrapper>
                            <div className='item-btns flex'>
                                <Link to = {`/`} className = "item-btn see-details-btn">Edit Profile</Link>
                                <Link to = {`/`} className = "item-btn see-details-btn">Add Course</Link>
                            </div>
                        </ButtonsWrapper>
                        <MyProfileCoursesList/>
                    </div>
                </div>
            </div>
        </UserPageWrapper>
    )
    
}

const MyProfilePage = () => {
    const [logged]=useAuth();
    const {id} = useParams();
    return(
        <>
            {logged?<LoggedInUser id={id}/>:<LoginPage/>}
        </>
    )
}

const ButtonsWrapper = styled.div`
.item-btns{
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    margin-top: auto;

    .item-btn{
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn{
        background-color: transparent;
        border: 1px solid var(--clr-black);
        margin-right: 5px;

        &:hover{
          background-color: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
        }
      }

      &.add-to-cart-btn{
        background: rgba(0, 0, 0, 0.9);
        color: var(--clr-white);
        border: 1px solid rgba(0, 0, 0, 0.9);
        
        &:hover{
          background-color: transparent;
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }`

const UserPageWrapper = styled.div`
body {
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
    font-family: "Poppins", sans-serif;
  }
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }
  
  a {
    text-decoration: none;
  }
  
  .header__wrapper header {
    width: 100%;
    background: url(${hero_images.hero1}) no-repeat 50% 20% / cover;
    min-height: calc(100px + 15vw);
  }
  
  .header__wrapper .cols__container .left__col {
    padding: 25px 20px;
    text-align: center;
    max-width: 350px;
    position: relative;
    margin: 0 auto;
  }
  
  .header__wrapper .cols__container .left__col .img__container {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translatex(-50%);
  }
  .header__wrapper .cols__container .left__col .img__container img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.18);
  }
  .header__wrapper .cols__container .left__col .img__container span {
    position: absolute;
    background: #2afa6a;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    bottom: 3px;
    right: 11px;
    border: 2px solid #fff;
  }
  .header__wrapper .cols__container .left__col h2 {
    margin-top: 60px;
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 5px;
  }
  .header__wrapper .cols__container .left__col p {
    font-size: 0.9rem;
    color: #818181;
    margin: 0;
  }
  .header__wrapper .cols__container .left__col .about {
    justify-content: space-between;
    position: relative;
    margin: 35px 0;
  }
  .header__wrapper .cols__container .left__col .about li {
    display: flex;
    flex-direction: column;
    color: #818181;
    font-size: 0.9rem;
  }
  .header__wrapper .cols__container .left__col .about li span {
    color: #1d1d1d;
    font-weight: 600;
  }
  .header__wrapper .cols__container .left__col .about:after {
    position: absolute;
    content: "";
    bottom: -16px;
    display: block;
    background: #cccccc;
    height: 1px;
    width: 100%;
  }
  .header__wrapper .cols__container .content{
    min-width: 100px;
  }
  .header__wrapper .cols__container .content p {
    font-size: 1rem;
    color: #1d1d1d;
    line-height: 1.8em;
  }
  .header__wrapper .cols__container .content ul {
    gap: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
  }
  .header__wrapper .cols__container .content ul li {
    display: flex;
  }
  .header__wrapper .cols__container .content ul i {
    font-size: 1.3rem;
  }
  .header__wrapper .cols__container .right__col {
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    flex-direction: column;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
  .header__wrapper .cols__container .right__col nav ul {
    display: flex;
    gap: 20px;
    flex-direction: column;
  }
  .header__wrapper .cols__container .right__col nav ul li a {
    text-transform: uppercase;
    color: #818181;
  }
  .header__wrapper .cols__container .right__col nav ul li:nth-child(1) a {
    color: #1d1d1d;
    font-weight: 600;
  }
  .header__wrapper .cols__container .right__col nav button {
    background: #0091ff;
    color: #fff;
    border: none;
    padding: 10px 25px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }
  .header__wrapper .cols__container .right__col nav button:hover {
    opacity: 0.8;
  }
  .header__wrapper .cols__container .right__col .photos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 20px;
  }
  .header__wrapper .cols__container .right__col .photos img {
    max-width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }
  
  /* Responsiveness */
  
  @media (min-width: 868px) {
    .header__wrapper .cols__container {
      max-width: 1200px;
      margin: 0 auto;
      width: 90%;
      justify-content: space-between;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 50px;
    }
    .header__wrapper .cols__container .left__col {
      padding: 25px 0px;
      min-width: 300px;
    }
    .header__wrapper .cols__container .right__col nav ul {
      flex-direction: row;
      gap: 30px;
    }
    .header__wrapper .cols__container .right__col .photos {
      height: 365px;
      overflow: auto;
      padding: 0 0 30px;
    }
  }
  @media (max-width: 1017px) {
  .header__wrapper .cols__container .right__col{
    align-items: center;
  }
}
  @media (min-width: 1017px) {
    
    .header__wrapper .cols__container .left__col {
      margin: 0;
      margin-right: auto;
    }
    .header__wrapper .cols__container .right__col nav {
      flex-direction: row;
    }
    .header__wrapper .cols__container .right__col nav button {
      margin-top: 0;
    }
  }
`


export default MyProfilePage;