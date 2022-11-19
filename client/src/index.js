import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    useEffect(
        ()=>{
            fetch('/category/categories')
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                setMessage(data[0].name)
            })
            .catch(err=>console.log(err))
        },[]
    )

    const [message, setMessage]= useState('')

    return (
        <div className='app'>
            {message}
        </div>
    )
}



ReactDOM.render(<App/>, document.getElementById('root'));