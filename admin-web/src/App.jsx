import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, Landing, Login, DashboardLayout, Error, Stats, Profile, AddSong, AddAlbum, ListSong, ListAlbum } from './pages'
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as profileAction } from "./pages/Profile";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddSong />,
          },
          {
            path: 'list-song',
            element: <ListSong />,

          },
          {
            path: 'add-album',
            element: <AddAlbum />,

          },
          {
            path: 'list-album',
            element: <ListAlbum />,

          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
        ],
      },
    ]
  },
]);

const App = () => {
  return <RouterProvider router={router} />
};
export default App; 