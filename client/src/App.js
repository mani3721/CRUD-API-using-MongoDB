import logo from './logo.svg';
import './App.css';
import CRUDAPI from './Components/AXIOS';
import XHRMethod from './Components/XhrMethod';
import SuperAgent from './Components/SuperAgent';
import QwestMethod from './Components/Qwest';
import FetchMethod from './Components/Fetch';




function App() {
  return (
    <div className="App">
        {/* <XHRMethod/> */}
        {/* <FetchMethod/> */}
        <CRUDAPI/>
        {/* <SuperAgent/> */}
        {/* <QwestMethod/> */}
    </div>
  );
}

export default App;
