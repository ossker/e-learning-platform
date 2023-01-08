import React from "react";
import styled from "styled-components";
import { useCourses } from "../context/courses_context";
import Tabs from "./Tabs";

const CourseList = () => {
    const courses = useCourses();
    return (
        <CourseListWrapper>
            <div className='container'>
                <div className='courses-list-top'>
                    <h2>Wide Selection of Courses</h2>
                    <p>Choose from {courses?.length} online video course{courses?.length>1?"s":null} with new ones released every month</p>
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