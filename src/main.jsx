import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store.js';
import './styles/index.css'
import './styles/theme.css';
import './styles/card.css';
import './styles/layout.css'
import './styles/navbar.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className="stars" />
    <App />
  </Provider>
);
