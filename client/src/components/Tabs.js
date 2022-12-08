import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Course from "./Course";

const Tabs = () => {
  const [courses, setCourses] = useState([]);
  useEffect(
      ()=>{
          fetch('/course/courses')
          .then(res=>res.json())
          .then(data=>{
              setCourses(data)
          })
          .catch(err=>console.log(err))
      },[]
  );
  return (
    <TabsWrapper>
      <div className='tabs'>
        <div className='tabs-body'>
          {
            courses.map(
                (course, index)=>(
                    <Course key={index} id={course.id} name={course.name} description={course.description} owner={course.owner} update={false}
                    />
                )
            )
          }
        </div>
      </div>
    </TabsWrapper>
    
  )
}

const TabsWrapper = styled.div`
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

export default Tabs