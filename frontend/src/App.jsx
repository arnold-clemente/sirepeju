
import AppRouter from './routes/AppRouter'
// estilos globales 
import 'assets/css/alert2.css'
import 'assets/css/login.css'
import 'assets/css/styles.css'
import 'assets/css/sidebar.css'
import 'assets/css/navbar.css'
import 'assets/css/user.css'
import 'assets/css/buttons.css'
import 'assets/css/loading.css'
import 'assets/css/modal.css'
import 'assets/css/profile.css'
import 'assets/css/roles.css'
import 'assets/css/errors.css'
import 'assets/css/dashboard.css'
import 'assets/css/busqueda.css'


function App() {

  return (
    <>
      <div className='app_container'>
        <AppRouter />
      </div>
    </>
  )
}

export default App
