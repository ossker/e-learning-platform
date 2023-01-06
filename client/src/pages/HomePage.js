import React from 'react'
import Hero from '../components/Hero'
import CourseList from '../components/CourseList'
import CategoriesList from '../components/CategoriesList'


const HomePage = () => {
    return(
        <div className='holder'>
            <Hero/>
            <CourseList/>
            <CategoriesList/>
        </div>
    )
}

export default HomePage;