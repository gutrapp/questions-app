import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreatePage from './routes/create';
import EditPage from './routes/edit';
import QuestionPage from './routes/question';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/:id",
    element: <QuestionPage />
  },
  {
    path: "/edit/:type/:id",
    element: <EditPage />
  },
  {
    path: "/create/:type/:id",
    element: <CreatePage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
