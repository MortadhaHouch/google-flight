import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeContextProvider } from './providers/ThemeProvider.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Airports from './pages/Airports.tsx'
import Flights from './pages/Flights.tsx'
import Home from './pages/Home.tsx'
import FlightFilter from './pages/FlightFilter.tsx'
import FlightDetails from './pages/FlightDetails.tsx'
import PriceCalendar from './pages/PriceCalendar.tsx'
import FlightMultiStop from './pages/FlightMultiStop.tsx'
import FlightEveryWhereDetails from './pages/FlightEveryWhereDetails.tsx'
import Search from './pages/Search.tsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<Home/>}/>
      <Route path='/search' element={<Search/>}>
        <Route path='airports' element={<Airports/>}/>
        <Route path='flights' element={<Flights/>}/>
        <Route path='flights-filter' element={<FlightFilter/>}/>
        <Route path='flights-details' element={<FlightDetails/>}/>
        <Route path='price-calendar' element={<PriceCalendar/>}/>
        <Route path='flights-multi-stop' element={<FlightMultiStop/>}/>
        <Route path='flights-everywhere' element={<FlightEveryWhereDetails/>}/>
      </Route>
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router}/>
    </ThemeContextProvider>
  </StrictMode>,
)
