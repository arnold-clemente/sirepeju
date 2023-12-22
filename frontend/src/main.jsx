import React from 'react'
// librerias
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'animate.css'

import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { url } from './conection/env.jsx'
import storage from './Storage/storage.jsx'
import App from './App.jsx'

// redux 
import store from './store/store'
import { Provider } from 'react-redux'

// redux query 
import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

window.axios = axios

window.axios.defaults.baseURL = url;
// window.axios.defaults.headers.common['Accept'] = 'application/json'
// window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.get('authToken');
// window.axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
