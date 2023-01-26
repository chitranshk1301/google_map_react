import './App.css';
import Header from './components/Header';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <h1 className='subtitle'>Let's calculate <strong>distance</strong> from Google maps</h1>
        <Form />
      </div>
    </div>
  );
}

export default App;
