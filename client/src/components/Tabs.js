import React, {useState} from 'react';
import { MdInfoOutline, MdSearch } from 'react-icons/md';
import styled from "styled-components";
import { useCategories } from '../context/categories_context';
import { useCourses } from '../context/courses_context';
import Pagination from './Pagination';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('');
  const courses=useCourses();
  const categories=useCategories();
  const [searchInput, setSearchInput] = useState("");

  const tabHandler = (category_id) => {
    setActiveTab(category_id);
  }

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  }

  return (
    <TabsWrapper>
      <div className='tabs'>
        <ul className='flex flex-wrap'>
          {
          categories?.map((category, idx) => (
            <li className='tabs-head-item' key={idx}>
              <button type = "button" className={`tab-btn ${activeTab==category.id ? "active-tab" : ""}`} onClick={()=>{tabHandler(category.id)}}>{category.name}</button>
            </li>
          ))
          }
          <SearchWrapper>
          <form className="Search">
            <input
              type="text"
              placeholder="SEARCH..."
              onChange={searchHandler}
              value={searchInput} 
              className="Search-box"
              id="Search-box"
            />
            <label className="Search-label" htmlFor="Search-box"><MdSearch/></label>
            </form>
          </SearchWrapper>
        </ul>

        {courses?.length > 0 ? (
          
          <Pagination
            data={activeTab?courses.filter(course => course.category_id == activeTab).filter((course) => {
              return course.name.toLowerCase().match(searchInput);
          }):courses.filter((course) => {
              return course.name.toLowerCase().match(searchInput);
          })}
            pageLimit={5}
            dataLimit={4}
          />
        
          ) : (
            <div className='not-uploaded mt-4'><p><MdInfoOutline className='icon'/> No courses to display</p></div>
      )}

      </div>
    </TabsWrapper>
    
  )
}

const SearchWrapper = styled.div`
input[type="search"] {
  box-sizing: border-box;
}
input, input::placeholder {
    color: black;
    font-size: 15px;
    font-weight: 500;
}
.Search {
  top:-5px;
  position: relative;
  display: flex;
  color: rgba(0, 0, 0, 0.7);
}

.Search-box {
  flex: 1 0 auto;
  margin: 0;
  padding: 8px 20px;
  height: 46px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  transition: all .15s ease-in-out;
}
.Search-box:focus {
  flex: 1 0 90%;
  margin-left: 20px;
  outline: 0;
}

.Search-label {
  position: absolute;
  right: 15px;
  top: 5px;
  font-size: 20px;
  transition: all .15s ease-in-out;
}
`

const TabsWrapper = styled.div`
.active-tab{
  background-image: linear-gradient(to right, #e00052 0%, #7400e0 100%);
  color: white;
}
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
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default Tabs