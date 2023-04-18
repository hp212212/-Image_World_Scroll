import React from 'react';
import './Components/css/index.css'
import Header from './Components/js/Header';
import MiddleByLoding from './Components/js/MiddleByLoding';
function App() {
  return (
    <>
      <div className='Main'>
        <Header />
        <MiddleByLoding />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
