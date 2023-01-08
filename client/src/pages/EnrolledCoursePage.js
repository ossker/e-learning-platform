import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import StarRating from '../components/StarRating';
import {MdInfo} from "react-icons/md";
import {TbWorld} from "react-icons/tb";
import {RiTimeLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import { course_images } from "../utils/images";
import Accordion from 'react-bootstrap/Accordion';
import ReactPlayer from 'react-player'
import { logout, useAuth } from '../auth';
import TokenExpiredModal from '../components/TokenExpiredModal';
import LoginPage from './LoginPage'
import HomePage from './HomePage';
import { Button, Modal } from 'react-bootstrap';
import ErrorModal from '../components/ErrorModal';

const LoggedInUser = (course_id, user_id) => {
  user_id = course_id.user_id
  course_id = course_id.course_id
  const [category, setCategory] = useState()
    const [owner, setOwner] = useState()
    const [course, setCourse] = useState()
    const [enrolledCourse, setEnrolledCourse] = useState()
    const [duration, setDuration] = useState()
    const [actualUser, setActualUser] = useState()
    const history = useHistory()
    const [showModalError, setShowModalError] = useState(false);
    const [show, setShow] = useState(false)
    const closeModal = () => {
      setShow(false)
    }
    const showModal = () => {
      setShow(true)
    }

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
          fetch('/auth/actual-user', requestOptions)
          .then(res=>res.json())
          .then(data=>{
              setActualUser(data)
          })
          .catch(err=>console.log(err))
      },[]
  );

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
            if(data.msg == "Token has expired"){
                logout();
                setShowModalTokenExpired(true);
            }
            setEnrolledCourse(data)
        })
        .catch(err=>console.log(err))
    },[]
);

const deleteEnrolledCourse = (user_id, course_id) => {

  const requestOptionsDelete={
    method:'DELETE',
    headers:{
        'content-type':'application/json',
        'Authorization':`Bearer ${JSON.parse(token)}`
    }
  }
  fetch(`/enrolled_course/enrolled_course/${course_id}/${user_id}`, requestOptionsDelete)
  .then(res=>res.json())
  .then(data=>{
    if(data.msg == "Token has expired" | data.msg == "Not enough segments"){
      closeModal()
      logout();
      setShowModalTokenExpired(true);
    }
    else if(data.status == 1){
      history.push('/my-profile')
    }
    else{
      closeModal()
      setShowModalError(true)
    }
  })
  .catch(err=>console.log(err))
}
  return (
    <>
    {enrolledCourse && actualUser?.id==user_id?
    <SingleCourseWrapper>
        {showModalTokenExpired?<TokenExpiredModal/>:null}
        {showModalError?<ErrorModal/>:null}
        <Modal
              size="lg"
              show={show}
              onHide={closeModal}
              scrollable={true}
              centered
            >
              <ModalWrapper>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h3 className='wait'>
                    Wait..
                  </h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3 className='content'>
                  Are you sure you want to unenroll the course?
                </h3>
                
              </Modal.Body>
              <Modal.Footer>
                <ButtonWrapper>
                  <Button variant="outline-dark" className='save__button' onClick={() => {deleteEnrolledCourse(user_id, course_id)}}>
                    Unenroll
                  </Button>
                  </ButtonWrapper>
              </Modal.Footer>
              </ModalWrapper>
            </Modal>
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
                <span><RiTimeLine /></span>
                <span className='fs-14 course-info-txt fw-5'>{duration}</span>
              </li>
            </ul>
          </div>

          <div className='course-foot'>
            <div className='course-price'>
              {enrolledCourse?.is_finished?<span className='free-price fs-26 fw-8' style={{"color":"green"}}>Finished</span>:<span className='free-price fs-26 fw-8' style={{"color":"red"}}>In progress</span>}
              <Link to="#" onClick={()=>{showModal()}} className='delete-btn d-inline-block'>
                Unenroll
              </Link>
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
    </SingleCourseWrapper>:<HomePage/>}
    </>
    
  )
}


const EnrolledCoursePage = () => {
    const {course_id, user_id} = useParams();
    const [logged]=useAuth();
    
    const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    if(!token){
      logout()
    }
  return (
    <>
    {logged?<LoggedInUser course_id={course_id} user_id={user_id}/>:<LoginPage/>}
    </>
  )
}

const ButtonWrapper = styled.div`
.save__button{
  width: 150px;
  height: 50px;
  border: 0px;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  background: #c21b4e;
  transition: 0.5s;
  :hover{
      background-color: #a024c9;
  }
}
`
const ModalWrapper = styled.div`
  .wait, .content{
    color: #c21b4e;
    font-weight: 700;
  }

  .wait{
    font-size: 2rem;
    padding: 5px 0px 0px 20px;
  }
  .content{
    font-size: 1.8rem;
    padding: 20px 20px;
  }

  .save__button{

  }
`
const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);
    .content-item{
        border: 1px solid #878787;
    }

    .delete-btn{
      height: 50px;
      width: 130px;
      margin-left: 25px;
      padding: 7px 25px;
      font-size: 20px;
      border: 1px solid white;
      transition: 0.5s ease;
      :hover{
          background: #700808;
      }
      span{
        margin-left: 12px;
      }
    }

  .content-body{
    background:#ededed;
  }
  .content-title{
    font-weight: bold;
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

export default EnrolledCoursePage