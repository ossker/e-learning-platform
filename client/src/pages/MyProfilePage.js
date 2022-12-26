import React, { useEffect, useState } from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
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
import { logout, useAuth } from '../auth';
import TokenExpiredModal from '../components/TokenExpiredModal'
import { RiContactsBookLine } from 'react-icons/ri'
import {MdConstruction, MdInfo ,MdCancel, MdOutlineCheckCircleOutline, MdRemoveCircleOutline, MdReportGmailerrorred} from "react-icons/md";

const LoggedInUser=(id)=>{
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState();
    const history = useHistory()
    const {register, watch, handleSubmit, setValue, reset, formState:{errors}} = useForm();
    const [showModalTokenExpired, setShowModalTokenExpired] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

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
              if(data.msg == "Token has expired"){
                logout();
                setShowModalTokenExpired(true);
              }else{
                setCourses(data)
              }
            })
            .catch(err=>console.log(err))
        },[]
    );


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

    console.log(user)
    const [show, setShow] = useState(false)
    const [imageName, setImageName] = useState('')
  const [imageError, setImageError] = useState(false)
    const closeModal = () => {
      setShow(false)
  }

  const showModal = () => {
      setShow(true)
      setValue("username", user?.username)
      setValue("first_name", user?.first_name)
      setValue("last_name", user?.last_name)
      setValue("email", user?.email)
      setValue("about_me", user?.about_me)
      setValue("password", user?.password)
      setValue("fb_link", user?.fb_link)
      setValue("yt_link", user?.yt_link)
      setValue("li_link", user?.li_link)
      setValue("tw_link", user?.tw_link)
      setValue("avatar", user?.avatar)
  }

  const convertToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    };
}

const uploadFile = async (e) => {
  const file = e.target.files[0];
  if (file != null) {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(!allowedExtensions.exec(file.name)){ 
      setImageName("")
      setImageError(true)
      setValue("avatar", "");
    }
    else{
      convertToBase64(file, (result) => {
        setImageError(false)
        setImageName(file.name)
        setValue("avatar", result.toString());
      });
    }
  }
};

  const editProfile = (data) => {
    console.log(data)

    const requestOptions={
      method:'PUT',
      headers:{
          'content-type':'application/json',
          'Authorization':`Bearer ${JSON.parse(token)}`
      },
      body:JSON.stringify(data)
  }

  fetch(`/auth/user/${user?.id}`, requestOptions)
  .then(res=>res.json())
  .then(data=>{
      console.log(data)

      const reload =window.location.reload()
      reload() 
  })
  .catch(err=>console.log(err))
    

  }

    return(
        <UserPageWrapper>
        {showModalTokenExpired?<TokenExpiredModal/>:null}
          <EditProfileModalWrapper>
            <Modal
              size="lg"
              show={show}
              onHide={closeModal}
              scrollable={true}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Update Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputWrapper>
                  <form className="mx-1 mx-md-4">

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field__disabled" placeholder="Username" name="username" id='username' disabled={true}
                          {...register("username")}
                        />
                        <label htmlFor="username" className="form__label">Username</label>
                      </div>
                    </div>

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field__disabled" placeholder="First name" name="first_name" id='first_name' disabled={true}
                          {...register("first_name")}
                        />
                        <label htmlFor="first_name" className="form__label">First name</label>
                      </div>
                    </div> 

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field__disabled" placeholder="Last name" name="last_name" id='last_name' disabled={true}
                          {...register("last_name")}
                        />
                        <label htmlFor="last_name" className="form__label">Last name</label>
                      </div>
                    </div>

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field__disabled" placeholder="Email" name="email" id='email' disabled={true}
                          {...register("email")}
                        />
                        <label htmlFor="email" className="form__label">Email</label>
                      </div>
                    </div>

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field" placeholder="About me" name="about_me" id='about_me'
                          {...register("about_me", {maxLength:1000})}
                        />
                        {errors.about_me && errors.about_me?.type ==="maxLength" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Too many characters.</p></div>}
                        <label htmlFor="about_me" className="form__label">About me</label>
                      </div>
                    </div>

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field" placeholder="Facebook" name="facebook" id='facebook'
                          {...register("fb_link", {pattern: /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com/})}
                        />
                        {errors.fb_link && errors.fb_link?.type ==="pattern" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Invalid facebook link.</p></div>}

                        <label htmlFor="facebook" className="form__label">Facebook</label>
                      </div>
                    </div>

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field" placeholder="Youtube" name="youtube" id='youtube'
                          {...register("yt_link", {pattern: /^(?:(?:http|https):\/\/)?(?:www.)?youtube.com/})}
                        />
                        {errors.yt_link && errors.yt_link?.type ==="pattern" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Invalid youtube link.</p></div>}
                        <label htmlFor="youtube" className="form__label">Youtube</label>
                      </div>
                    </div>

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field" placeholder="Twitter" name="twitter" id='twitter'
                          {...register("tw_link", {pattern: /^(?:(?:http|https):\/\/)?(?:www.)?twitter.com/})}
                        />
                        {errors.tw_link && errors.tw_link?.type ==="pattern" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Invalid twitter link.</p></div>}
                        <label htmlFor="twitter" className="form__label">Twitter</label>
                      </div>
                    </div>

                    <div className="flex-row align-items-center mb-3">
                      <div className="form__group field">
                        <input type="text" className="form__field" placeholder="Linkedin" name="linkedin" id='linkedin'
                          {...register("li_link", {pattern: /^(?:(?:http|https):\/\/)?(?:www.)?linkedin.com/})}
                        />
                        {errors.li_link && errors.li_link?.type ==="pattern" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Invalid linkedin link.</p></div>}
                        <label htmlFor="linkedin" className="form__label">Linkedin</label>
                      </div>
                    </div>

                    <UploadWrapper>
                      <span className="btn btn-outline-dark btn-file mt-3 upload">
                        {imageName? <div style={{ "font-weight":"bold"}}>{imageName}</div>: "Upload avatar image" }
                        <input type="file" name="uploaded-file" onChange={uploadFile}/>
                        <input type="hidden"
                            {...register("avatar")}
                        />
                        
                      </span>
                      {imageName?<MdOutlineCheckCircleOutline className='checked-icon'/>: null}
                      {imageError?<MdRemoveCircleOutline className='checked-icon' style={{"color":"red"}}/>: null}
                    </UploadWrapper>


                    <input type="hidden" className="form__field" placeholder="password" name="password" id='password'
                          {...register("password")}
                        />

                  </form>
                </InputWrapper>
              </Modal.Body>
              <Modal.Footer>
                <ButtonWrapper>
                  <Button variant="outline-dark" className='save__button' onClick={handleSubmit(editProfile)}>
                    Save
                  </Button>
                </ButtonWrapper>
              </Modal.Footer>
            </Modal>
          </EditProfileModalWrapper>
            <div className="header__wrapper">
                <header>
                </header>
                <div className="cols__container">
                    <div className="left__col">
                    <div className="img__container">
                        {user?.avatar? <img src={user?.avatar} alt={user?.username}/>:<img src={user_images.default_user} alt={user?.username}/>}
                        
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
                                <Link to ="#" onClick={()=>{showModal()}} className = "item-btn see-details-btn">Edit Profile</Link>
                                <Link to = "/add-course" className = "item-btn see-details-btn">Add Course</Link>
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
const ButtonWrapper = styled.div`
.save__button{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100px;
  height: 40px;
  border: 0px;
  color: white;
  font-weight: bold;
  background: #fa6995;
  transition: 0.5s;
  :hover{
      background-color: #c21b4e;
  }
}
`
const EditProfileModalWrapper = styled.div`

`
const UploadWrapper = styled.div`
.upload{
  border: 2px solid #fa6995;

  :hover{
    background: #fa6995;
  }
}
.checked-icon{
  margin-top: 20px;
  margin-left: 10px;
  font-size: 30px;
  color: #34fa69;
}
.btn-file {
  position: relative;
  overflow: hidden;
  min-width: 150px;
}
.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}
`

const InputWrapper = styled.div`
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
    width: 100%;
  }

  .form__field__disabled {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid gray;
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
      top: 20px;
    }
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #fa6995;
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
      top: 20px;
    }
  }
  
  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
  }
  
  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #c21b4e;
      font-weight:700;    
    }
    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #c21b4e,#db3769,#f5b0c5);
    border-image-slice: 1;
  }

  .form__field{
    &:required,&:invalid { box-shadow:none; }
  }
`

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