import React, {useEffect, useState, useRef} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import StarRating from './StarRating';
import {MdConstruction, MdInfo, MdOutlineCheckCircleOutline, MdRemoveCircleOutline, MdReportGmailerrorred} from "react-icons/md";
import {TbWorld} from "react-icons/tb";
import {FaShoppingCart} from "react-icons/fa";
import {RiClosedCaptioningFill, RiAddCircleFill, RiFolderUploadFill} from "react-icons/ri";
import {BiCheck} from "react-icons/bi";
import {Link} from "react-router-dom";
import { course_images } from "../utils/images";
import Hero from './Hero';
import { useForm } from 'react-hook-form';
import { logout, useAuth } from '../auth';
import { useCategories } from '../context/categories_context';
import TokenExpiredModal from './TokenExpiredModal';
import ErrorModal from './ErrorModal';


const PageOne = ({ onButtonClick }) => {
  const categories = useCategories();
  const {register, watch, handleSubmit, setValue, reset, formState:{errors}} = useForm();
  const history = useHistory();
  const [logged]=useAuth();
  
  const [imageName, setImageName] = useState('')
  const [imageError, setImageError] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const createCourse = (data) => {
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    
    const requestOptions = {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(data)
    }
    
    fetch('/course/courses', requestOptions)
    .then(async res => {
      let response = await res.json()
      if(response.msg == "Token has expired"){
        logout();
        setShowModal(true);
      }
      else if(response.status == 1){
        onButtonClick("pagetwo", response.course_name)
      }
      else{
        setShowModalError(true)
      }
      
          
    })
    .then(data => {
    })
    .catch(err => console.log(err))
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
        setValue("course_image", "");
      }
      else{
        convertToBase64(file, (result) => {
          setImageError(false)
          setImageName(file.name)
          setValue("course_image", result.toString());
        });
      }
    }
  };
  
  return (
    <SingleCourseWrapper>
      {showModal?<TokenExpiredModal/>:null}
      {showModalError?<ErrorModal/>:null}
      <form>
      <div className='course-intro mx-auto grid'>
        <div className='course-img'>
          <img src={course_images.addcourse} className="img"/>
        </div>
        <div className='course-details mt-4'>
          <SelectWrapper>
            <div className='select'>
              <select defaultValue={""} {...register("category", { required: true })}
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


              <div className="form__group field">
                <input type="text" className="form__field" placeholder="Description" name="description" id='description' required 
                {...register("description", { required: true })}
                />
                <label htmlFor="description" className="form__label">Description</label>
              </div>
              {errors.description && errors.description?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Description is required.</p></div>}


              <div className="form__group field">
                <input type="text" className="form__field" placeholder="Language" name="language" id='language' required 
                {...register("language", { required: true })}
                />
                <label htmlFor="language" className="form__label">Language</label>
              </div>
              {errors.language && errors.language?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Language is required.</p></div>}

              <UploadWrapper>
                <span className="btn btn-outline-light btn-file mt-5">
                  {imageName? <div style={{ "font-weight":"bold"}}>{imageName}</div>: "Upload course image" }
                  <input type="file" name="uploaded-file" onChange={uploadFile}/>
                  <input type="hidden"
                      {...register("course_image", { required: true })}
                  />
                  
                </span>
                {imageName?<MdOutlineCheckCircleOutline className='checked-icon'/>: null}
                {imageError?<MdRemoveCircleOutline className='checked-icon' style={{"color":"red"}}/>: null}
                {errors.course_image && errors.course_image?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Image is required.</p></div>}
              </UploadWrapper>
            </InputWrapper>
          </div>
          <div className='course-btn'>
            <Link to="#" className='add-to-cart-btn d-inline-block fw-7 bg-purple mt-4' onClick={handleSubmit(createCourse)}>
              <RiAddCircleFill /> Add
            </Link>
          </div>
        </div>
      </div>
      <div className='course-full bg-white text-dark'>
        

        <div className='course-content mx-auto'>
          <div className='course-sc-title'>Course content</div>
          <ul className='course-content-list'>
            {
              "HEJ" 
            }
          </ul>
        </div>
        
      </div>
      </form>
      
    </SingleCourseWrapper>
  )
}

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
  border-bottom: 2px solid #9b9b9b;
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
  top: 10px;
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
  border-image: linear-gradient(to right, black, #9b9b9b);
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

const UploadWrapper = styled.div`
.checked-icon{
  margin-top: 40px;
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

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);
  .img{
    min-width: 500px;
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

export default PageOne