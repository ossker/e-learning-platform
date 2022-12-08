import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tabs from "./Tabs";

const CourseList = () => {
    
    return (
        <CourseListWrapper>
            <div className='container'>
                <div className='courses-list-top'>
                    <h2>Wide Selection of Courses</h2>
                    <p>Choose from 213,000 online video courses with new ones released every month</p>
                </div>
                <Tabs/>
            </div>
        </CourseListWrapper>
    )
}

const CourseListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p{
    font-size: 1.8rem;
  }
`;

export default CourseList;