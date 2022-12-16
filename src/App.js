import './App.css';

function App() {
  return (
    <div>
      {process.env.REACT_APP_API_URL}
    </div>
  );
}

export default App;
