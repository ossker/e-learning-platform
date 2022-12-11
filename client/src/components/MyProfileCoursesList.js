import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyProfileTabs from "./MyProfileTabs";

const MyProfileCoursesList = () => {
    return (
        <UserCourseListWrapper>
            <div className='container'>
                <div className='courses-list-top'>
                    <h2>My courses.</h2>
                </div>
                <MyProfileTabs/>
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

export default MyProfileCoursesList;