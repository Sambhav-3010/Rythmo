import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { PlayerProvider } from "./components/PlayerProvider"
import Home from "./pages/Home"
import Discover from "./pages/Discover"
import Collection from "./pages/Collection"
import Studio from "./pages/Studio"
import Auth from "./pages/Auth"
import Search from "./pages/Search"
import Library from "./pages/Library"
import ArtistDashboard from "./pages/ArtistDashboard"
import { useContext } from "react"
import { AuthContext } from './context/authContext';
import ErrorPage from "./pages/NotFound"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/discover", element: <Discover /> },
  { path: "/collection", element: <Collection /> },
  { path: "/studio", element: <Studio /> },
  { path: "/auth", element: <Auth /> },
  { path: "/search", element: <Search /> },
  { path: "/library", element: <Library /> },
  { path: "/artist-dashboard", element: <ArtistDashboard /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "*", element: <ErrorPage /> }
])

function App() {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <div className="bg-black text-white antialiased min-h-screen">
      <PlayerProvider>
        <RouterProvider router={router} />
      </PlayerProvider>
    </div>
  )
}

export default App
