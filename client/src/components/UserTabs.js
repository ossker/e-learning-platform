import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useCourses } from '../context/courses_context';
import Course from "./Course";

const UserTabs = (id) => {
    const [courses, setCourses] = useState()
    console.log("IDDD")
    console.log(id.id.id)
    useEffect(() => {
        fetch(`/course/courses-owner/${id.id.id}`).
        then(data => data.json()).
        then(data => setCourses(data));
      }, [])
  return (
    <UserTabsWrapper>
      <div className='tabs'>
        <div className='tabs-body'>
          {
            courses?.map(
              (course, index)=>(
                  <Course key={index} id={course.id} description={course.description} name={course.name} image={course.image} updated_date={course.updated_date}
                   actual_price={course.actual_price} discounted_price={course.discounted_price} is_free={course.is_free} language={course.language} topics={course.topics} tutorials={course.tutorials} update={false} 
                  />
              )
          )
          }
        </div>
      </div>
    </UserTabsWrapper>
    
  )
}

const UserTabsWrapper = styled.div`
  .tabs{
    margin-top: 16px;

    .tabs-head-item button{
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;
      
      &:hover{
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body{
      margin-top: 32px;
    }

    @media screen and (min-width: 600px){
      .tabs-body{
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default UserTabs