import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EnrolledTabs from "./EnrolledTabs";

const EnrolledCoursesList = () => {
    return (
        <UserCourseListWrapper>
            <div className='container'>
                <div className='courses-list-top'>
                    <p>Enrolled courses</p>
                </div>
                <EnrolledTabs/>
            </div>
        </UserCourseListWrapper>
    )
}

const UserCourseListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top{
    padding: 10px 10px 0px 20px;
    border: 1px solid black;
    text-align: center;
    p{
        font-size: 2rem;
        font-weight: 500;
    }
  }
`;

export default EnrolledCoursesList;