import React from 'react'
import {  createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'

import Feed from './Components/Feed'
import CategoryBtn from './Components/CategoryBtn'
import Layout from './Components/Layout'
import Shorts from './Components/Shorts'
import Subscriptions from './Components/Subscriptions'
import You from './Components/You'
import VideoDetail from './Components/VideoDetail'
import ChannelDetail from './Components/ChannelDetail'
import SearchResults from './Components/SearchResults'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path=""
        element={
          <>
            <CategoryBtn />
            <Feed />
          </>
        }
      />
      <Route
        path="/search"
        element={
          <>
            <CategoryBtn />
            <SearchResults />
          </>
        }
      />
      <Route path="shorts" element={<Shorts />} />
      <Route path="subscriptions" element={<Subscriptions />} />
      <Route path="you" element={<You />} />
      <Route path="video/:id/:channel" element={<VideoDetail />} />
      <Route path="channel/:id" element={<ChannelDetail />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App