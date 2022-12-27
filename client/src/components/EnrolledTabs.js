import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import EnrolledPagination from './EnrolledPagination';

const EnrolledTabs = () => {
    const [courses, setCourses] = useState([]);
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
                setCourses(data.course_associations)
            })
            .catch(err=>console.log(err))
        },[]
    );
        
    
  return (
    <UserTabsWrapper>
      {courses?.length > 0 ? (
          <EnrolledPagination
            data={courses}
            pageLimit={5}
            dataLimit={3}
          />
        
          ) : (
          <h1>You have not enrolled any courses.</h1>
      )}
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
        grid-template-columns: repeat(1, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
`;

export default EnrolledTabs