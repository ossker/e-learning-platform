import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { course_images } from "../utils/images";
import Category from './Category';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(
      ()=>{
          fetch('/category/categories')
          .then(res=>res.json())
          .then(data=>{
            setCategories(data)
          })
          .catch(err=>console.log(err))
      },[]
  );
  console.log("categories")
  console.log(categories)

  return (
    <CategoriesListWrapper>
      <div className='container'>
        <div className='categories-list-top'>
          <h2>Top Categories</h2>
        </div>
        <div className='categories-list grid'>
          {
            categories.map((category, idx) => {
              return (
                <Category image = {course_images.image} name = {category.name} key = {idx} />
              )
            })
          }
        </div>
      </div>
    </CategoriesListWrapper>
  )
}

const CategoriesListWrapper = styled.div`
  .categories-list-top{
    margin-bottom: 32px;
  }
  .categories-list{
    gap: 32px;
  }
  @media screen and (min-width: 600px){
    .categories-list{
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 800px){
    .categories-list{
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 992px){
    .categories-list{
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default CategoriesList