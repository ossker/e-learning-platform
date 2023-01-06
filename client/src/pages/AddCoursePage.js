import React, {useState} from 'react';
import MultiStepProgressBar from '../components/MultiStepProgressBar';
import PageTwo from '../components/PageTwo';
import PageOne from '../components/PageOne';
import PageThree from '../components/PageThree';
import styled from 'styled-components';
import {logout, useAuth } from '../auth';
import LoginPage from './LoginPage'

const LoggedInUser = () => {
  const [page, setPage] = useState("pageone");
  const [courseName, setCourseName] = useState();
  const nextPage = (page, course_name) => {
    setCourseName(course_name)
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        alert("Ooops! Seems like you did not fill the form.");
        break;
      default:
        setPage("1");
    }
  };

  return(
    <BarWrapper>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <PageOne onButtonClick={nextPage} />,
          pagetwo: <PageTwo onButtonClick={nextPage} courseName={courseName}/>,
          pagethree: <PageThree courseName={courseName}/>
        }[page]
      }
    </BarWrapper>
  )
}

const AddCoursePage = () => {
  const [logged]=useAuth();
  const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    if(!token){
      logout()
    }
  return (
    <>
      {logged?<LoggedInUser/>:<LoginPage/>}
    </>
  )
}

const BarWrapper = styled.div`
background: var(--clr-dark);
`


export default AddCoursePage