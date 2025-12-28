import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocaleProvider } from './context/LocaleContext.jsx'
import { Provider } from 'react-redux'
import { store } from './RiduxToolkit/Store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <Provider store={store}>
          <App />
      </Provider>
      
    </LocaleProvider>
  </StrictMode>,
)
