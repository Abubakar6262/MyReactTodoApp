import './App.scss';
import HandlePath from './Pages/Routes/HandlePath';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import AuthContextProvider from './Contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <HandlePath/>    
    </AuthContextProvider>
  );
}

export default App;
