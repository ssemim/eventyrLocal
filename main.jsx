import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Provider } from "react-redux";
import store from './store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>

); 
