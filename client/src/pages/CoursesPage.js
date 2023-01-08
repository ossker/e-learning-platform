import React, { useEffect } from 'react';
import { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Course from "../components/Course";
import { useCourses } from '../context/courses_context';

const CoursesPage = () => {
  const category_id = useParams();
  const courses = useCourses();
  const [category, setCategory] = useState();


    useEffect(
      ()=>{
        fetch(`/category/category/${category_id.category}`)
      .then(res=>res.json())
      .then(data=>{
          setCategory(data)
      })
      .catch(err=>console.log(err))
      },[category_id]
  );
  
  return (
    <CoursesPageWrapper>
      <div className='container'>
        <div className='category-list-top'>
             <p>{category?.name}</p>
        </div>
        {courses?.filter(course => course.category_id == category_id.category).length == 0?<div className='not-uploaded mt-4'><p><MdInfoOutline className='icon'/> No courses to display in this category</p></div>:null}

        <div className='category-based-list'>
          {
            courses?.filter(course => course.category_id == category_id.category).map((course) => (
                <Course key = {course.id} {...course} />
              ))
          }
        </div>
      </div>
    </CoursesPageWrapper>
  )
}

const CoursesPageWrapper = styled.div`

.not-uploaded{
  padding: 20px 20px 10px 20px;
  background: white;
  border: 1px solid red;
  font-size: 1.5rem;
  color: red;
  font-weight: 500;
}
.icon{
  margin-bottom:4px;
  font-size: 2rem;
}
.category-list-top{
  background-image: linear-gradient(to right, #e00052 0%, #7400e0 100%);
    color: white;
    margin-top: 30px;
    padding: 10px 10px 0px 20px;
    border: 1px solid black;
    text-align: center;
    p{
        font-size: 2rem;
        font-weight: 600;
    }
  }

  .category-based-list{
    margin-top: 32px;
  }
  @media screen and (min-width: 600px){
    .category-based-list{
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 992px){
    .category-based-list{
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1400px){
    .category-based-list{
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default CoursesPage