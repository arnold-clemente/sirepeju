import AppRouter from './routes/AppRouter'

// estilos 
import './css/alert2.css'
import './css/login.css'
import './css/style.css'
import './css/sidebar.css'
import './css/navbar.css'
import './css/user.css'
import './css/buttons.css'
import './css/loading.css'
import './css/modal.css'
import './css/profile.css'

function App() {

  return (
    <>
      <div className="app_container">
        <AppRouter />
      </div>
    </>
  )
}

export default App
