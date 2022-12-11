import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserTabs from "./UserTabs";

const UserCourseList = (id) => {
    return (
        <UserCourseListWrapper>
            <div className='container'>
                <div className='courses-list-top'>
                    <h2>User's courses.</h2>
                </div>
                <UserTabs id={id}/>
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

export default UserCourseList;