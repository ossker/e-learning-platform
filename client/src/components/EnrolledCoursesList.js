import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EnrolledTabs from "./EnrolledTabs";

const EnrolledCoursesList = () => {
    return (
        <UserCourseListWrapper>
            <div className='container'>
                <div className='courses-list-top'>
                    <h2>Enrolled courses.</h2>
                </div>
                <EnrolledTabs/>
            </div>
        </UserCourseListWrapper>
    )
}

const UserCourseListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p{
    font-size: 1.8rem;
  }
`;

export default EnrolledCoursesList;