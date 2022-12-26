import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Course from './Course';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const MyProfilePagination = ({ data, title, pageLimit, dataLimit }) => {
    const [pages] = useState(Math.ceil(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }
  
    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }
  
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
  
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };
  
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
    const coursesSection = useRef(null);
    useEffect(() => {
      window.scrollTo({ behavior: 'smooth', top: coursesSection.current.offsetTop });
    }, [currentPage]);
  
    return (
      <div>
        <CoursesWrapper  ref={coursesSection}>
          <div className='tabs'>
            <div className='tabs-body' >
              {getPaginatedData().map((course, idx) => (
                <Course key={idx} id={course.id} owner={course.owner} description={course.description} name={course.name} image={course.course_image} updated_date={course.updated_date}
                actual_price={course.actual_price} discounted_price={course.discounted_price} is_free={course.is_free} language={course.language} topics={course.topics} tutorials={course.tutorials} edit={true}
               />
              ))}
            </div>
          </div>
        </CoursesWrapper>
        <PaginationWrapper>
        <div className="pagination">
          {/* previous button */}
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            <MdKeyboardArrowLeft/>
          </button>
    
          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
              <span>{item}</span>
            </button>
          ))}
    
          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            <MdKeyboardArrowRight/>
          </button>
        </div>
        </PaginationWrapper>
      </div>
    );
}
const PaginationWrapper = styled.div`
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.paginationItem {
  background: #fff;
  border: 2px solid #666;
  padding: 10px 15px;
  border-radius: 10%;
  height: 45px;
  width: 45px;
  position: relative;
  margin: 0 5px;
  cursor: pointer;
}

.paginationItem span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.prev,
.next {
  background: #fff;
  padding: 10px;
  color: #851f99;
  margin: 0 10px;
  cursor: pointer;
  font-weight: bold;
}

.paginationItem.active {
  border: 1px solid #888;
  color: #888;
  pointer-events: none;
}

.prev.disabled,
.next.disabled {
  pointer-events: none;
  box-shadow: none;
  color: #999;
}
`

const CoursesWrapper = styled.div`
.tabs{
    margin-top: 16px;

    .tabs-head-item button{
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;
      
      &:hover{
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body{
      margin-top: 32px;
    }

    @media screen and (min-width: 600px){
      .tabs-body{
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(1, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
`;

export default MyProfilePagination;