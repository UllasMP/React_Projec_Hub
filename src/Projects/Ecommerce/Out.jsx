import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'


 function Out(){
  return(
   <Provider store={store}>
      <App />
   </Provider>
     

  )
 }
    

 export default Out
   
    
    
 
