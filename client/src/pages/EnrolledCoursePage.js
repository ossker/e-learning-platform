import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import StarRating from '../components/StarRating';
import {MdInfo} from "react-icons/md";
import {TbWorld} from "react-icons/tb";
import {FaShoppingCart} from "react-icons/fa";
import {RiClosedCaptioningFill, RiContactsBookLine} from "react-icons/ri";
import {BiCheck} from "react-icons/bi";
import {Link} from "react-router-dom";
import { course_images } from "../utils/images";
import Accordion from 'react-bootstrap/Accordion';
import ReactPlayer from 'react-player'
import { logout, useAuth } from '../auth';
import TokenExpiredModal from '../components/TokenExpiredModal';

const EnrolledCoursePage = () => {
    const {course_id, user_id} = useParams();
    const [category, setCategory] = useState()
    const [owner, setOwner] = useState()
    const [course, setCourse] = useState()
    const [enrolledCourse, setEnrolledCourse] = useState()
    const [duration, setDuration] = useState()

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
          fetch(`/category/categoryCourse/${course_id}`)
          .then(res=>res.json())
          .then(data=>{
              setCategory(data)
          })
          .catch(err=>console.log(err))
      },[]
  );

  useEffect(
    ()=>{
        fetch(`/tutorial/duration-tutorials/${course_id}`)
        .then(res=>res.json())
        .then(data=>{
            setDuration(data)
        })
        .catch(err=>console.log(err))
    },[]
);

    useEffect(
      ()=>{
          fetch(`/auth/userCourse/${course_id}`)
          .then(res=>res.json())
          .then(data=>{
              setOwner(data)
          })
          .catch(err=>console.log(err))
      },[]
  );

  useEffect(
    ()=>{
        fetch(`/course/course/${course_id}`)
        .then(res=>res.json())
        .then(data=>{
            setCourse(data)
        })
        .catch(err=>console.log(err))
    },[]
);

const [showModalTokenExpired, setShowModalTokenExpired] = useState(false);
useEffect(
    ()=>{
        fetch(`/enrolled_course/enrolled_course/${course_id}/${user_id}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log("DEJTA")
            console.log(data)
            if(data.msg == "Token has expired"){
                logout();
                setShowModalTokenExpired(true);
            }
            setEnrolledCourse(data)
        })
        .catch(err=>console.log(err))
    },[]
);
console.log("course?.tutorials")
    console.log(course?.tutorials)
  return (
    <SingleCourseWrapper>
        {showModalTokenExpired?<TokenExpiredModal/>:null}
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
                <span className='fs-14'>Created by <span className='fw-6 opacity-08'><Link to = {`/users/${owner?.id}`}>{owner?.username}</Link></span></span>
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
                <span><RiClosedCaptioningFill /></span>
                <span className='fs-14 course-info-txt fw-5'>{duration}</span>
              </li>
            </ul>
          </div>

          <div className='course-foot'>
            <div className='course-price'>
              {enrolledCourse?.is_finished?<span className='free-price fs-26 fw-8' style={{"color":"green"}}>Finished</span>:<span className='free-price fs-26 fw-8' style={{"color":"red"}}>In progress</span>}
              
            </div>
          </div>
        </div>
      </div>

      <div className='course-full bg-white text-dark'>
        <div className='course-content mx-auto'>
          <div className='course-sc-title'>Course content</div>
          <ul className='course-content-list'>
            <Accordion defaultActiveKey="0">
                {
                    course?.tutorials && course?.tutorials.map((contentItem, idx) => {
                        return (
                            
                            <Accordion.Item eventKey={idx} key={idx} className="mt-2 content-item">
                                <Accordion.Header><div className='content-title'>{idx+1}. {contentItem.title}</div></Accordion.Header>
                                <Accordion.Body className="content-body">
                                    <ReactPlayer 
                                        width="100%"
                                        url={contentItem.video}
                                        controls
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                            
                        )
                    })
                }
            </Accordion>
          </ul>
        </div>
      </div>
    </SingleCourseWrapper>
  )
}

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);
    .content-item{
        border: 1px solid #878787;
    }
  .content-body{
    background:#ededed;
  }
  .content-title{
    font-weight: bold;
  }
  .img{
    margin-top: 10%;
    min-width: 600px;
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

export default EnrolledCoursePage