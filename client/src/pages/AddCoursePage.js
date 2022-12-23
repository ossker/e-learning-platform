import React, {useEffect, useState} from 'react';
import MultiStepProgressBar from '../components/MultiStepProgressBar';
import PageTwo from '../components/PageTwo';
import PageOne from '../components/PageOne';
import PageThree from '../components/PageThree';
import styled from 'styled-components';


const AddCoursePage = () => {
  const [page, setPage] = useState("pageone");
  const [courseName, setCourseName] = useState("pageone");
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
  return (
    <BarWrapper>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <PageOne onButtonClick={nextPage} />,
          pagetwo: <PageTwo onButtonClick={nextPage} courseName={courseName}/>,
          pagethree: <PageThree/>
        }[page]
      }
    </BarWrapper>
  )
}

const BarWrapper = styled.div`
background: var(--clr-dark);
`


export default AddCoursePage