import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { TaskProvider } from './contexts/TaskContext';
import './index.css';
import store from './redux/store';



createRoot(document.getElementById('root')).render(
  <StrictMode>
         <TaskProvider>
    <Provider store={store}>
       <BrowserRouter>
            <App />
      </BrowserRouter>
    </Provider>
         </TaskProvider>,
  </StrictMode>,
);


