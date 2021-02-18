import { useState } from 'react';
import Button from "./components/Button";
import Display from "./components/Display";

function App() {
  const [input, setInput] = useState('');
  const [currentNumber, setCurrentNumber] = useState('0');
  const [operator, setOperator] = useState(undefined);
  const [equalPressed, setEqualPressed] = useState(false);

  const buttons = [
    { label: 'AC', id: 'clear', class: 'reset'},
    { label: '±', id: 'negative', class: 'negative'},
    { label: 'x', id: 'multiply', class: 'operator'},
    { label: 7, id: 'seven', class: 'number'},
    { label: 8, id: 'eight', class: 'number'},
    { label: 9, id: 'nine', class: 'number'},
    { label: '÷', id: 'divide', class: 'operator'},
    { label: 4, id: 'four', class: 'number'},
    { label: 5, id: 'five', class: 'number'},
    { label: 6, id: 'six', class: 'number'},
    { label: '-', id: 'subtract', class: 'operator'},
    { label: 1, id: 'one', class: 'number'},
    { label: 2, id: 'two', class: 'number'},
    { label: 3, id: 'three', class: 'number'},
    { label: '+', id: 'add', class: 'operator'},
    { label: 0, id: 'zero', class: 'zero'},
    { label: '.', id: 'decimal', class: 'decimal'},
    { label: '=', id: 'equals', class: 'equals'}
  ];

  return (
    <div className="App">
     <div className="calculator">
       <Display input={input} currentNumber={currentNumber} operator={operator} />
       <div className="keyboard">
        <div className="button-container">
          {buttons.map(btn => (
              <Button key={btn.id} btn={btn} input={input} setInput={setInput} currentNumber={currentNumber} setCurrentNumber={setCurrentNumber} operator={operator} setOperator={setOperator} equalPressed={equalPressed} setEqualPressed={setEqualPressed} />
            )
          )}
        </div>
        <div className="speaker"></div>       
       </div>
     </div>
    </div>
  );
}

export default App;
