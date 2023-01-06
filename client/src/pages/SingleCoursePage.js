import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import StarRating from '../components/StarRating';
import {MdInfo} from "react-icons/md";
import {TbWorld} from "react-icons/tb";
import {FaShoppingCart} from "react-icons/fa";
import {RiTimeLine} from "react-icons/ri";
import {BiCheck} from "react-icons/bi";
import {Link} from "react-router-dom";
import { course_images } from "../utils/images";
import { logout, useAuth } from '../auth';
import ErrorModal from '../components/ErrorModal';
import TokenExpiredModal from '../components/TokenExpiredModal';
import SuccessModal from '../components/SuccessModal';

const SingleCoursePage = () => {
    const {id} = useParams();
    const [category, setCategory] = useState()
    const [user, setUser] = useState()
    const [course, setCourse] = useState()
    const [duration, setDuration] = useState()
    const [showModalTokenExpired, setShowModalTokenExpired] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [showModalOwner, setShowModalOwner] = useState(false);
    
    const [student, setStudent] = useState()
    const history = useHistory()
    const [logged]=useAuth();


    const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    const requestOptionsStudent ={
        method: 'GET',
        headers: {
            'content-type':'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`
        }
    }

    useEffect(
        ()=>{
            fetch('/auth/actual-user', requestOptionsStudent)
            .then(res=>res.json())
            .then(data=>{
                setStudent(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    useEffect(
      ()=>{
          fetch(`/category/categoryCourse/${id}`)
          .then(res=>res.json())
          .then(data=>{
              setCategory(data)
          })
          .catch(err=>console.log(err))
      },[]
  );

  useEffect(
    ()=>{
        fetch(`/tutorial/duration-tutorials/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setDuration(data)
        })
        .catch(err=>console.log(err))
    },[]
);

    useEffect(
      ()=>{
          fetch(`/auth/userCourse/${id}`)
          .then(res=>res.json())
          .then(data=>{
              setUser(data)
          })
          .catch(err=>console.log(err))
      },[]
  );

  useEffect(
    ()=>{
        fetch(`/course/course/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setCourse(data)
        })
        .catch(err=>console.log(err))
    },[]
);
  
const enrollCourse = () => {

  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  if(student){
    const data = {"student_id": student.id, "course_id": course.id, "is_finished": 0}
  const requestOptions = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
    },
    body: JSON.stringify(data)
  }

  fetch('/enrolled_course/enrolled_courses', requestOptions)
  .then(async res => {
      let response = await res.json()
      if(response.msg == "Token has expired"){
        logout();
        setShowModalTokenExpired(true);
      }
      else if(response.status == 1){
        history.push('/my-profile')
      }
      else if(response.status == 2){
        setShowModalSuccess(true)
      }
      else if(response.status == 3){
        setShowModalOwner(true)
      }
      else{
        setShowModalError(true)
      }       
    })
    .then(data => {})
    .catch(err => console.log(err))
  }
  else{
    logout();
    setShowModalTokenExpired(true);
  }
}

  return (
    <SingleCourseWrapper>
      {showModalTokenExpired?<TokenExpiredModal/>:null}
      {showModalError?<ErrorModal/>:null}
      {showModalSuccess?<SuccessModal content="You already enrolled this course."/>:null}
      {showModalOwner?<ErrorModal content="You are owning this course."/>:null}
      <div className='course-intro mx-auto grid'>
        <div className='course-img'>
          <img src = {course?.course_image? course?.course_image : course_images.image} alt = {course?.name} className="img"/>
        </div>
        <div className='course-details'>
          <div className='course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block'>{category?.name}</div>
          <div className='course-head'>
            <h5>{course?.name}</h5>
          </div>
          <div className='course-body'>
            <p className='course-para fs-18'>{course?.description}</p>
            <div className='course-rating flex'>
              <span className='rating-star-val fw-8 fs-16'>3</span>
              <StarRating rating_star={3} />
              <span className='rating-count fw-5 fs-14'>(5)</span>
              <span className='students-count fs-14'>1000</span>
            </div>

            <ul className='course-info'>
              <li>
                <span className='fs-14'>Created by <span className='fw-6 opacity-08'><Link to = {`/users/${user?.id}`}>{user?.username}</Link></span></span>
              </li>
              <li className='flex'>
                <span><MdInfo /></span>
                <span className='fs-14 course-info-txt fw-5'>Last updated {course?.updated_date}</span>
              </li>
              <li className='flex'>
                <span><TbWorld /></span>
                <span className='fs-14 course-info-txt fw-5'>{course?.language}</span>
              </li>
              <li className='flex'>
                <span><RiTimeLine /></span>
                <span className='fs-14 course-info-txt fw-5'>{duration}</span>
              </li>
            </ul>
          </div>

          <div className='course-foot'>
            <div className='course-price'>
              {!course?.is_free?<div><span className='new-price fs-26 fw-8'>{course?.discounted_price}</span>
              <span className='old-price fs-26 fw-6'>{course?.actual_price}</span></div>:<span className='free-price fs-26 fw-8'>Free</span>}
              
            </div>
          </div>

          <div className='course-btn'>
            {logged?<Link to="#" onClick={()=>{enrollCourse()}} className='add-to-cart-btn d-inline-block fw-7 bg-purple'>
              <FaShoppingCart /> Enroll
            </Link>:<button className='add-to-cart-btn d-inline-block fw-7 button-disabled'>
              <FaShoppingCart /> Enroll
            </button>}
            {logged?null:<p className="small mt-2 pt-1 mb-0"><Link to="/login" className={"fw-bold"} style={{color: '#c72cf2'}}>Log In</Link> to enroll in the course</p>}
            
          </div>
        </div>
      </div>

      <div className='course-full bg-white text-dark'>
        <div className='course-learn mx-auto'>
          <div className='course-sc-title'>What you'll learn</div>
          <ul className='course-learn-list grid'>
            {
              course?.what_you_will_learn && course?.what_you_will_learn.map((learnItem, idx) => {
                return (
                  <li key = {idx}>
                    <span><BiCheck /></span>
                    <span className='fs-14 fw-5 opacity-09'>{learnItem.title}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className='course-content mx-auto'>
          <div className='course-sc-title'>Course content</div>
          <ul className='course-content-list'>
            {
              course?.tutorials && course?.tutorials.map((contentItem, idx) => {
                return (
                  <li key = {idx}>
                    <span>{contentItem.title}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </SingleCourseWrapper>
  )
}

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);
  
  .button-disabled{
    color:#fff;
    border-color: #a0a0a0;
    background-color: #a0a0a0;
    cursor:not-allowed !important;
  }
  .img{
    margin-top: 10%;
    min-width: 400px;
  }
  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }

    .course-para{
      padding: 12px 0;
    }

    .rating-star-val{
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }

    .students-count{
      margin-left: 8px;
    }

    .rating-count{
      margin-left: 6px;
      color: #d097f6;
    }

    .course-info{

      li{
        margin-bottom: 2px;

        &:nth-child(2){
          margin-top: 10px;
        }
      }

      .course-info-txt{
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price{
      margin-top: 12px;

      .old-price{
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }

      .free-price{
        color: #eceb98;
        margin-left: 10px;
      }
    }

    .course-btn{
      margin-top: 16px;

      .add-to-cart-btn{
        padding: 12px 28px;
        span{
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px){
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;

      .course-details{
        padding-top: 0;
      }

      .course-img{
        order: 2;
      }
    }

    @media screen and (min-width: 1400px){
      grid-template-columns: 60% 40%;
    }
  }

  .course-full{
    padding: 40px 16px;

    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }

    .course-learn{
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list{

        li{
          margin: 5px 0;
          display: flex;
          span{

            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{

        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }
`;

export default SingleCoursePage