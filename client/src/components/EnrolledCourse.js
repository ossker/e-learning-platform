import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import StarRating from './StarRating';
import { course_images } from "../utils/images";

const EnrolledCourse = (props) => {
    const {id,student_id, is_finished, description, name, owner, image, updated_date, actual_price, discounted_price, is_free, language, topics, edit} = props;
    
    const [user, setUser] = useState('')
    useEffect(()=>{

      fetch(`/auth/user/${owner}`)
        .then(res=>res.json())
        .then(data=>{
          setUser(data)
        })
        .catch(err=>console.log(err))

    }, [])

    
  return (
    <CourseCard>
      <div className='item-img'>
        <img src = {image? image : course_images.image} alt = {name} />
      </div>
      <div className='item-body'>
        <h5 className='item-name'>{name}</h5>
        <span className='item-creator'><Link to = {`/users/${owner}`}>{user.username}</Link></span>
        <div className='item-rating flex'>
          <span className='rating-star-val'>{4}</span>
          <StarRating rating_star = {4} />
          <span className='rating-count'>(43)</span>
        </div>
        <div className='item-price'>
          {is_finished? <span className='item-price-new' style={{"color":"green"}}>Finished</span>:<span className='item-price-new' style={{"color":"red"}}>In progress</span>}
          
        </div>
      </div>
      <div className='item-btns flex'>
        <Link to = {`/enrolled/${id}/${student_id}`} className = "item-btn see-details-btn">See details</Link>
      </div>
    </CourseCard>
  )

}

const CourseCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  .item-img{
    margin-bottom: 14px;
    padding-top: 20px;
  }
  .item-body{
    margin: 14px 0;
    padding: 4px 18px;
    margin-top: auto;
    .item-name{
      font-size: 15px;
      line-height: 1.4;
      font-weight: 800;
    }

    .item-creator{
      font-size: 12.5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }

    .rating-star-val{
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 800;
      color: #b4690e;
      margin-right: 6px;
    }

    .rating-count{
      font-size: 12.5px;
      margin-left: 3px;
      font-weight: 500;
      opacity: 0.8;
    }

    .item-price-new{
      font-weight: 700;
      font-size: 15px;
    }

    .item-price-old{
      opacity: 0.8;
      font-weight: 500;
      text-decoration: line-through;
      font-size: 15px;
      margin-left: 8px;
    }
  }
  .item-btns{
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    

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
  }
`;

export default EnrolledCourse