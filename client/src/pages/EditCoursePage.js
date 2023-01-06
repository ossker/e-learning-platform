import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import StarRating from '../components/StarRating';
import {MdCancel, MdInfo, MdOutlineCancel, MdReportGmailerrorred} from "react-icons/md";
import {TbWorld} from "react-icons/tb";
import {RiAddCircleFill, RiTimeLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import { course_images } from "../utils/images";
import { useCategories } from '../context/categories_context';
import { logout, useAuth } from '../auth';
import ErrorModal from '../components/ErrorModal';
import TokenExpiredModal from '../components/TokenExpiredModal';
import { useForm } from 'react-hook-form';
import { Accordion, Button, Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import LoginPage from './LoginPage'
import HomePage from './HomePage';

const LoggedInUser = (id) => {
  id=id.id
  const {register, watch, handleSubmit, setValue, reset, formState:{errors}} = useForm();
    const {register:register1, watch:watch1, handleSubmit:handleSubmit1, setValue:setValue1, reset:reset1, formState:{errors:errors1}} = useForm();
    const {register:register2, watch:watch2, handleSubmit:handleSubmit2, setValue:setValue2, reset:reset2, formState:{errors:errors2}} = useForm();
    const [category, setCategory] = useState()
    const [owner, setOwner] = useState()
    const [course, setCourse] = useState()
    const [duration, setDuration] = useState()
    const [showModalTokenExpired, setShowModalTokenExpired] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [showErrorNameTaken, setShowErrorNameTaken] = useState(false)
    const categories = useCategories();
    const [actualUser, setActualUser] = useState()
    const history = useHistory()
    const [show, setShow] = useState(false)
    const closeModal = () => {
      setShow(false)
  }
  const showModal = () => {
    setShow(true)
}
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
                setActualUser(data)
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
    const getDuration = () => {
      fetch(`/tutorial/duration-tutorials/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setDuration(data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(
      ()=>{
          fetch(`/auth/userCourse/${id}`)
          .then(res=>res.json())
          .then(data=>{
              setOwner(data)
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

useEffect(
  ()=>{
    setValue("category", category?.id)
    setValue("name", course?.name)
    setValue("description", course?.description)
  }
);

  const getCourse = () => {
      fetch(`/course/course/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setCourse(data)
        })
        .catch(err=>console.log(err))
  }


  const requestOptionsDelete={
    method:'DELETE',
    headers:{
        'content-type':'application/json',
        'Authorization':`Bearer ${JSON.parse(token)}`
    }
  }

  

  const deleteLearnItem = (id) => {
    fetch(`/topic/topic/${id}`, requestOptionsDelete)
        .then(res=>res.json())
        .then(data=>{
          if(data.msg == "Token has expired" | data.msg == "Not enough segments"){
            logout();
            setShowModalTokenExpired(true);
          }
          else if(data.status == 1){
            getCourse()
          }
          else{
            setShowModalError(true)
          }
        })
        .catch(err=>console.log(err))
  }

  const deleteTutorial = (id) => {
    fetch(`/tutorial/tutorial/${id}`, requestOptionsDelete)
        .then(res=>res.json())
        .then(data=>{
          if(data.msg == "Token has expired" | data.msg == "Not enough segments"){
            logout();
            setShowModalTokenExpired(true);
          }
          else if(data.status == 1){
            getDuration()
            getCourse()
          }
          else{
            setShowModalError(true)
          }
        
        })
        .catch(err=>console.log(err))
    
  }

  const deleteCourse = (id) => {
    fetch(`/course/course/${id}`, requestOptionsDelete)
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
  
  const createTopic = (data) => {
    data["course"] = id;

    const requestOptionsCreateTopic = {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(data)
    }

    fetch('/topic/topics', requestOptionsCreateTopic)
    .then(res=>res.json())
    .then(data => {
      if(data.msg == "Token has expired" | data.msg == "Not enough segments"){
        logout();
        setShowModalTokenExpired(true);
      }
      else if(data.status == 1){
        getCourse()
        setValue1("title", "");
        setMode(MODES.SUCCESS)
        loading()
        getCourse()
      }
      else{
        setShowModalError(true)
      }
    })
    .catch(err => console.log(err))

}

  const createTutorial = (data) => {
    data["course"] = id;
        
        const requestOptions = {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(token)}`
          },
          body: JSON.stringify(data)
        }
        
        fetch('/tutorial/tutorials', requestOptions)
        .then(res => res.json())
        .then(data => {
          if(data.msg == "Token has expired" | data.msg == "Not enough segments"){
            logout();
            setShowModalTokenExpired(true);
          }
          else if(data.status == 1){
            setValue2("title", "");
            setValue2("video", "");
            setMode1(MODES.SUCCESS)
            getDuration()
            getCourse()
            loading()
            
          }
          else{
            setShowModalError(true)
          }
        })
        .catch(err => console.log(err))
  }

const [mode, setMode] = useState(MODES.LOADING)
const [mode1, setMode1] = useState(MODES.LOADING)
    function loading(){
      setTimeout(function(){ 
          setMode(MODES.LOADING)
          setMode1(MODES.LOADING)
      }, 2000);
  }
  const updateCourse = (data) => {
    
    data["id"] = id;
    const requestOptionsUpdate={
      method:'PUT',
        headers:{
            'content-type':'application/json',
            'Authorization':`Bearer ${JSON.parse(token)}`
        },
        body:JSON.stringify(data)
    }

    fetch(`/course/course/${id}`, requestOptionsUpdate)
    .then(res=>res.json())
    .then(data=>{
      if(data.status == 1){
        const reload =window.location.reload()
        reload()
      }
      else if(data.msg == "Token has expired" | data.msg == "Not enough segments"){
        logout();
        setShowModalTokenExpired(true);
      }
      else if(data.status == 0){
        setShowErrorNameTaken(true);
      }
      else{
        setShowModalError(true);
      }
         
    })
    .catch(err=>console.log(err))
   
    
  }
  return (
    <>
    {(actualUser?.id == owner?.id)?<SingleCourseWrapper>
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
                  Are you sure you want to delete the course?
                </h3>
                
              </Modal.Body>
              <Modal.Footer>
                <ButtonWrapper>
                  <Button variant="outline-dark" className='save__button' onClick={() => {deleteCourse(id)}}>
                    Delete
                  </Button>
                  </ButtonWrapper>
              </Modal.Footer>
              </ModalWrapper>
            </Modal>
            
      <div className='course-intro mx-auto grid'>
        <div className='course-img'>
            <div className='course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block'>
              Editing course
            </div>
          <img src = {course?.course_image? course?.course_image : course_images.image} alt = {course?.name} className="img"/>
        </div>
        <div className='course-details'>
        <form>
        <SelectWrapper>
            <div className='select mt-2'>
              <select defaultValue={""} 
              {...register("category", { required: true })}
              >
                  <option value={""} disabled>
                      Category
                  </option>
                  {
                    categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                          {category.name}
                      </option>))
                  }
              </select>
            </div>
            {errors.category && errors.category?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Category is required.</p></div>}
        </SelectWrapper>

          <div className='course-head'>
            <InputWrapper>
              
              <div className="form__group field">
                <input type="text" className="form__field" placeholder="Name of course" name="name" id='name' required 
                {...register("name", { required: true })}
                />
                <label htmlFor="name" className="form__label">Name of course</label>
              </div>
              {errors.name && errors.name?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Name is required.</p></div>}
              {showErrorNameTaken?<div className="error-response"><MdCancel/> <p className="error">NAME OF COURSE TAKEN.</p></div>:""}
              <div className="form__group field">
                <input type="text" className="form__field" placeholder="Description" name="description" id='description' required 
                {...register("description", { required: true })}
                />
                <label htmlFor="description" className="form__label">Description</label>
              </div>
              {errors.description && errors.description?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Description is required.</p></div>}

            </InputWrapper>
          </div>
          <div className='course-body'>
            
            <div className='course-rating flex'>
              <span className='rating-star-val fw-8 fs-16'>3</span>
              <StarRating rating_star={3} />
              <span className='rating-count fw-5 fs-14'>(5)</span>
              <span className='students-count fs-14'>1000</span>
            </div>

            <ul className='course-info'>
              <li>
                <span className='fs-14'>Created by <span className='fw-6 opacity-08 you'><Link to = {`/my-profile`}>You</Link></span></span>
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
            <Link to="#" onClick={handleSubmit(updateCourse)} className='add-to-cart-btn d-inline-block fw-7 bg-purple'>
              Save
            </Link>
            <Link to="#" onClick={()=>{showModal()}} className='delete-btn d-inline-block'>
              Delete
            </Link>
          </div>
          </form>
        </div>
      </div>

      <div className='course-full bg-white text-dark'>
        <div className='course-learn mx-auto'>
          <form>
          <div className='course-sc-title'>What you'll learn</div>
          <ul className='course-learn-list grid'>
            {
              course?.what_you_will_learn && course?.what_you_will_learn.map((learnItem, idx) => {
                return (
                  <li key = {idx}>
                    <Link to="#" onClick={()=>{deleteLearnItem(learnItem.id)}}>
                        <MdOutlineCancel className='delete-icon'/>
                    </Link>
                    <span className='fs-18 fw-5 opacity-09 learn-item'>{learnItem.title}</span>
                    
                  </li>
                )
              })
            }
            
          </ul>
          <BlackInputWrapper>
              <div className="form__group field">
                <input type="text" className="form__field" placeholder="Learn Item" name="learnItem" id='learnItem' required
                  {...register1("title", { required: true })}
                />
                <label htmlFor="learnItem" className="form__label">Learn Item</label>
              </div>
              {errors1.title && errors1.title?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Learn item is required.</p></div>}
            </BlackInputWrapper>
          <div className='topic-btn'>
            <Link to="#" className='add-to-cart-btn d-inline-block fw-7 bg-purple mt-5' onClick={handleSubmit1(createTopic)}>
              <RiAddCircleFill /> Add 
            </Link>
            <p className='checkMark'><AnimatedCheckmark mode={mode} baseColor='#ab12e3' collapseFactor={1} size={40}/></p>
          </div>
          </form>
        </div>

        <div className='course-content mx-auto'>
          <div className='course-sc-title'>Course content</div>
          <ul className='course-content-list'>
            <Accordion defaultActiveKey="0">
                {
                    course?.tutorials && course?.tutorials.map((contentItem, idx) => {
                        return (
                            <div className='d-flex'>
                                <Link to="#" onClick={()=>{deleteTutorial(contentItem.id)}}>
                                    <MdOutlineCancel className='delete-icon-tutorial'/>
                                </Link>
                            
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
                            </div>
                            
                        )
                    })
                }
            </Accordion>
          </ul>
          <BlackInputWrapper>
            <div className="form__group field">
              <input type="text" className="form__field" placeholder="Title" name="title" id='title' required
                {...register2("title", { required: true })}
              />
              <label htmlFor="title" className="form__label">Title</label> 
            </div>
            {errors2.title && errors2.title?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Title is required.</p></div>}

            <div className="form__group field mt-4">
              <input type="text" className="form__field" placeholder="Youtube url" name="video" id='video' required
                {...register2("video", { required: true, pattern:/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/})}
              />
              <label htmlFor="video" className="form__label">Youtube URL</label> 
            </div>
            {errors2.video && errors2.video?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">URL is required.</p></div>}
            {errors2.video && errors2.video?.type !=="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Invalid URL.</p></div>}
            
          </BlackInputWrapper>
          <div className='topic-btn'>
            <Link to="#" className='add-to-cart-btn d-inline-block fw-7 bg-purple mt-5' onClick={handleSubmit2(createTutorial)}>
              <RiAddCircleFill /> Add 
            </Link>
            <p className='checkMark'><AnimatedCheckmark mode={mode1} baseColor='#ab12e3' collapseFactor={1} size={40}/></p>
          </div>
        </div>
      </div>
    </SingleCourseWrapper>:<HomePage/>}
    </>

  )
}

const EditCoursePage = () => {
    const {id} = useParams();
    const [logged]=useAuth();
    const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    if(!token){
      logout()
    }
  return (
    <>
    {logged?<LoggedInUser id={id}/>:<LoginPage/>}
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
  background: #a024c9;
  transition: 0.5s;
  :hover{
      background-color: #c21b4e;
  }
}
`
const ModalWrapper = styled.div`
  .wait, .content{
    color: #a024c9;
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

const BlackInputWrapper = styled.div`
.error-response{
  display: flex;
  color: red;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 2rem;
}
.error-section{
  margin-top: 0.5rem;
  display: flex;
  color: red;
  height: 0.5rem;
  font-weight: bold;
}
.error{
  margin-left: 5px;
  font-size: 1.1rem;
}
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 5px;
  margin-left: 0px;
  width: 90%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid black;
  outline: 0;
  font-size: 1.3rem;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 30px;
  }
}

.form__label {
  position: absolute;
  top: 0px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: black;
       
  }
  padding-bottom: 6px; 
  border-width: 3px;
  border-image: linear-gradient(to right, #ae15bf, #e955fa);
  border-image-slice: 1;
}

.form__field{
  &:required,&:invalid { box-shadow:none; }
}
`
const InputWrapper = styled.div`
.error-response{
    display: flex;
    color: red;
    font-weight: 600;
    font-size: 2rem;
    margin-top: 5px;
}
.error-section{
    margin-top: 0.5rem;
    display: flex;
    color: red;
    height: 0.5rem;
    font-weight: bold;
}
.error{
    margin-left: 5px;
    font-size: 1.1rem;
    margin-top: 5px;
}
.icon{
  margin-top: -10px;
  width: 1.7rem;
}
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 5px;
    margin-left: 0px;
    width: 100%;
  }
  
  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    color: white;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  
    &::placeholder {
      color: transparent;
    }
  
    &:placeholder-shown ~ .form__label {
      font-size: 1.3rem;
      cursor: text;
      top: 30px;
    }
  }
  
  .form__label {
    position: absolute;
    top: 10px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
  }
  
  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: 10px;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: white;
         
    }
    padding-bottom: 6px; 
    border-width: 3px;
    border-image: linear-gradient(to right, white,white);
    border-image-slice: 1;
  }

  .form__field{
    &:required,&:invalid { box-shadow:none; }
  }
`

const SelectWrapper = styled.div`
.error-response{
  display: flex;
  color: red;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 2rem;
}
.error-section{
  margin-top: 0.5rem;
  display: flex;
  color: red;
  height: 0.5rem;
  font-weight: bold;
}
.error{
  margin-left: 5px;
  font-size: 1.1rem;
}
select {
  appearance: none;
  outline: 1;
  border: 1;
  box-shadow: none;
  flex: 1;
  font-size: 0.8em;
  padding: 0 1em;
  color: #9b9b9b;
  background-color: #1C1D1F;
  background-image: none;
  cursor: pointer;
  border: 2px solid #9b9b9b;
  
}

select::-ms-expand {
  display: none;
}

.select {
  width: 35%;
  position: relative;
  display: flex;
  height: 1.6em;
  border-radius: .15em;
  overflow: hidden;
  color: #1C1D1F;
}

.select::after {
  content: '\\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.1em;
  background-color: #9b9b9b;
  transition: .5s all ease;
  pointer-events: none;
}

.select:hover::after {
  color: white;
}

`

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .topic-btn{
    display:inline-table;
      .add-to-cart-btn{
        font-size: 0.8em;
        margin-right: 10px;
        padding: 10px 15px;
        color: white;
      }
    }
  .checkMark{
    display:table-cell
  }
  .you{
    color: white;
    transition: 0.3s ease;
    :hover{
      color: #d633e8;
    }
  }
  .content-item{
    border: 1px solid #878787;
    width: 100%;
    }
    .content-body{
    background:#ededed;
    }
    .content-title{
    font-weight: bold;
    }

  .learn-item{
      margin-top: 7px;
  }

  .delete-icon{
    margin-right: 10px;
    transition: 0.2s ease;
    font-size: 21px;
    font-weight: 500;
    :hover{
        color: #bf3434;
    }
  }
  .delete-icon-tutorial{
    margin-right: 10px;
    margin-top: 21px;
    transition: 0.2s ease;
    font-size: 21px;
    font-weight: 500;
    :hover{
        color: #bf3434;
    }
  }

  .button-disabled{
    color:#fff;
    border-color: #a0a0a0;
    background-color: #a0a0a0;
    cursor:not-allowed !important;
  }
  .img{
    
    min-width: 400px;
  }
  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
        margin-top: 5%;
        margin-bottom: 2%;
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
      line-height: 1.2;
      padding: 0 0 20px 0;
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
      .delete-btn{
        margin-left: 25px;
        padding: 12px 28px;
        border: 1px solid white;
        transition: 0.5s ease;
        :hover{
            background: #700808;
        }
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

export default EditCoursePage