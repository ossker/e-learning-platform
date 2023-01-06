import React, {useState} from 'react';
import styled from "styled-components";
import { useCategories } from '../context/categories_context';
import { useCourses } from '../context/courses_context';
import Pagination from './Pagination';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('');
  const courses=useCourses();
  const categories=useCategories();

  const tabHandler = (category_id) => {
    setActiveTab(category_id);
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
        </ul>

        {courses?.length > 0 ? (
          
          <Pagination
            data={activeTab?courses.filter(course => course.category_id == activeTab):courses}
            pageLimit={5}
            dataLimit={4}
          />
        
          ) : (
          <h1>No Courses to display</h1>
      )}

      </div>
    </TabsWrapper>
    
  )
}

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