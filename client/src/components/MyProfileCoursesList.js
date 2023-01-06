import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyProfileTabs from "./MyProfileTabs";

const MyProfileCoursesList = () => {
    return (
        <UserCourseListWrapper>
            <div className='container'>
                <div className='courses-list-top'>
                    <p>Uploaded courses</p>
                </div>
                <MyProfileTabs/>
            </div>
        </UserCourseListWrapper>
    )
}

const UserCourseListWrapper = styled.div`
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

export default MyProfileCoursesList;