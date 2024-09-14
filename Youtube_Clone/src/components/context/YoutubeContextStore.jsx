import React, { createContext, useState, useReducer, useEffect } from 'react'

export const YoutubeContext = createContext({
  selectedCategory: 'All',
  setSelectedCategory: () => {},
  formatViews: () => {},
  formatPublishTime: () => {},
  randomHexColorCode: () => {},
  searchInput: '',
  setSearchInput: () => {},
  subList: [],
  addSub: () => {},
  addInitialSubs: () => {},
  deleteSub: () => {},
})

function formatViews(views) {
  const number = parseInt(views, 10)
  if (number >= 1_000_000) {
    return `${Math.round(number / 1_000_000)}M` // Return the number in millions
  } else if (number >= 1_000) {
    return `${Math.round(number / 1_000)}K` // Return the number in thousands
  } else {
    return number // Return the number as is
  }
}

function formatPublishTime(publishTime) {
  const now = new Date()
  const publishedDate = new Date(publishTime)
  const differenceInMilliseconds = now - publishedDate

  const millisecondsInASecond = 1000
  const secondsInAMinute = 60
  const minutesInAnHour = 60
  const hoursInADay = 24
  const daysInAMonth = 30 // Approximation
  const daysInAYear = 365 // Approximation

  const differenceInSeconds = Math.floor(
    differenceInMilliseconds / millisecondsInASecond
  )
  const differenceInMinutes = Math.floor(differenceInSeconds / secondsInAMinute)
  const differenceInHours = Math.floor(differenceInMinutes / minutesInAnHour)
  const differenceInDays = Math.floor(differenceInHours / hoursInADay)
  const differenceInMonths = Math.floor(differenceInDays / daysInAMonth)
  const differenceInYears = Math.floor(differenceInDays / daysInAYear)

  if (differenceInYears > 0) {
    return `${differenceInYears} ${
      differenceInYears === 1 ? 'year' : 'years'
    } ago`
  } else if (differenceInMonths > 0) {
    return `${differenceInMonths} ${
      differenceInMonths === 1 ? 'month' : 'months'
    } ago`
  } else if (differenceInDays > 0) {
    return `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} ago`
  } else if (differenceInHours > 0) {
    return `${differenceInHours} ${
      differenceInHours === 1 ? 'hour' : 'hours'
    } ago`
  } else if (differenceInMinutes > 0) {
    return `${differenceInMinutes} ${
      differenceInMinutes === 1 ? 'minute' : 'minutes'
    } ago`
  } else {
    return `${differenceInSeconds} ${
      differenceInSeconds === 1 ? 'second' : 'seconds'
    } ago`
  }
}

const randomHexColorCode = () => {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const YoutubeContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchInput, setSearchInput] = useState('')
  const [subList, setSubList] = useState([])
  
  

  // Add a new subscription
  const addSub = (sub) => {
   
    
    const updatedSubs = [...subList, sub]
    setSubList(updatedSubs)
    localStorage.setItem('subs', JSON.stringify(updatedSubs))
  }

  // Initialize the subscription list from local storage
  const addInitialSubs = () => {
    const storedSubs = localStorage.getItem('subs')
    if (storedSubs) {
      setSubList(JSON.parse(storedSubs))
    }
  }

  // Remove a subscription
  const deleteSub = (id) => {
    const updatedSubs = subList.filter((sub) => sub.id !== id)
    setSubList(updatedSubs)
    localStorage.setItem('subs', JSON.stringify(updatedSubs))
  }

  useEffect(() => {
    addInitialSubs()
  }, [])

  return (
    <YoutubeContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        formatViews,
        formatPublishTime,
        randomHexColorCode,
        searchInput,
        setSearchInput,
        subList,
        addSub,
        deleteSub,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  )
}

export default YoutubeContextProvider
