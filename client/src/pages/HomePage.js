import React from 'react';


export default function HomePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <section className='container'>
      <h1 className='text-center'
        style={{"margin-top": "2rem"}}>
        Welcome,
        <span>
          {currentUser.name}
        </span>
      </h1>
      <p className='text-center'>Let's see what's new over there!</p>
    </section>
  )
}
