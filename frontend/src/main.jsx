import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './context/socketContext.jsx'
import { ModelContextProvider } from './context/modelContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
        <SocketContextProvider>
          <ModelContextProvider>

            <App store={store}/>

          </ModelContextProvider>
        </SocketContextProvider>
        </BrowserRouter>
    </Provider>
  </StrictMode>,
)
