import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const Category = ({image, name, category_id}) => {
  return (
    <Link to = {`/category/${category_id}`}>
      <CategoryItemWrapper className='flex flex-column bg-alice-blue'>
        <div className='category-item-img'>
          <img src = {image} alt = {name} />
        </div>
        <div className='category-item-name'>
          <h6>{name}</h6>
        </div>
      </CategoryItemWrapper>
    </Link>
  )
}

const CategoryItemWrapper = styled.div`
  padding: 20px;
  border: 1px solid #827f80;
  transition: var(--transition);
  .category-item-img{
    img{
      max-width: 110px;
    }
  }
  .category-item-name{
    margin-top: 24px;
    h6{
      font-size: 15px;
    }
  }
  &:hover{
    border: 1px solid var(--clr-purple);
  }
`;

export default Category