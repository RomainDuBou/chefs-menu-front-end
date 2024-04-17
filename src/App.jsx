import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreationRestaurant from './pages/restaurant/gestion/creation/CreationRestaurant';
import ModifRestaurant from './pages/restaurant/gestion/modification/ModifRestaurant';
import Home from './pages/home/Home';
import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "creationRestaurant",
      element: <CreationRestaurant/>
    },
    {
      path: "modificationRestaurant",
      element: <ModifRestaurant/>
    },
    {
      path: "home",
      element: <Home/>
    }
  ]);
  return (
    <>
      <div className="App">
        <RouterProvider router={router}/>
    </div>
    </>
  )
}

export default App
