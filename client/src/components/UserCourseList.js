import React from "react";
import styled from "styled-components";
import UserTabs from "./UserTabs";

const UserCourseList = (id) => {
    return (
        <UserCourseListWrapper>
            <div className='container'>
                <div className='courses-list-top mt-3'>
                    <h2>User's courses</h2>
                </div>
                <UserTabs id={id}/>
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
  }s
`;

export default UserCourseList;