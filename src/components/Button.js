const Button = ({ btn, input, setInput, currentNumber, setCurrentNumber, previousNumber, setPreviousNumber, operator, setOperator, equalPressed, setEqualPressed }) => {

    const className = `btn ${btn.class}`;

    // my safe version of the eval() function
    const safeEval = (newInput) => {
        // return if input is empty
        if (!input) {
            return currentNumber;
        }

        const inputArray = newInput ? newInput.split(' ') : input.split(' ');
        const numbers = [];
        const operators = [];

        // capture numbers and operators from input state
        for (let i = 0; i < inputArray.length; i++) {
            if (!isNaN(inputArray[i])) {
                numbers.push(parseFloat(inputArray[i]));
            } else if (inputArray[i].match(/^(\+|-|x|÷)$/)) {
                operators.push(inputArray[i]);
            }
        }
        
        // calculate sum from current inputs
        const reducer = (total, value, index) => {
            switch (operators[index - 1]) {
                case '÷':
                    return total / value;
                case 'x':
                    return total * value;
                case '-':
                    return total - value;
                case '+':
                    return total + value;
                default:
                    return total;
            }
        }

        return numbers.reduce(reducer);
    }

    // reset state to intial settings
    const resetState = () => {
        setInput('');
        setCurrentNumber('0');
        setOperator(undefined);
        setEqualPressed(false);
    }

    // converts positive numbers to negative and vice-versa
    const reverseNumber = () => {
        const regex = new RegExp(currentNumber + '$');

        if (Math.sign(Number(currentNumber)) < 0) {
            setInput(input.replace(regex, Math.abs(currentNumber)));
            setCurrentNumber(Math.abs(currentNumber));
        } else if (Math.sign(Number(currentNumber)) > 0) {
            setInput(input.replace(regex, -Math.abs(currentNumber)));
            setCurrentNumber(-Math.abs(currentNumber));
        }
    }

    // add new numbers to state
    const appendNumber = num => {
        if (equalPressed) {
            setCurrentNumber(`${num}`);
            setInput(`${num}`);
            setEqualPressed(false);
        } else if (currentNumber === '0') {
            setCurrentNumber(`${num}`);
            setInput(`${input}${num}`);
        } else {
            setCurrentNumber(`${currentNumber}${num}`);
            setInput(`${input}${num}`);
        }
    }

    // add operator to formula
    const appendOperator = op => {
        let newInput = undefined;

        if (equalPressed) {
            setEqualPressed(false);
        }

        if (input.endsWith('</span> ') || input.endsWith('-')) {  // check if operator already active
            if (op === '-') { // check if second minus operator - make negative
                setCurrentNumber('-');
                setInput(`${input}-`)
            } else { // replace other operators with new choice
                newInput = input.endsWith('-') ?
                    input.substring(0, input.length - 36) :
                    input.substring(0, input.length - 35);

                setInput(`${newInput} <span class="operator"> ${op} </span> `);
                setCurrentNumber('0'); 
            }       
        } else if (currentNumber === '0') { // check a number has been set first
            return;
        } else {
            setInput(`${input} <span class="operator"> ${op} </span> `);
            setCurrentNumber('0');  
        }
        setOperator(op);
    }

    // add decimal point to current number if not present
    const addDecimal = () => {
        if (!currentNumber.includes('.')) {
            currentNumber === '0' ? setInput(`${input}0.`) :
                setInput(`${input}.`);

            setCurrentNumber(`${currentNumber}.`);
        }
    }

    // calculate current sum in the input state
    const calculateSum = () => {
        setEqualPressed(true);
        let newInput = undefined;
        
        // remove operator if input ends in one
        if (input.endsWith('</span> ')) {
            newInput = input.substring(0, input.length - 35);
            setInput(newInput);
        }
        setCurrentNumber(safeEval(newInput));
    }

    // action response to button clicks
    const handleClick = (value, type) => {
        switch (type) {
            case 'reset':
                resetState();
                break;
            case 'negative':
                reverseNumber();
                break;
            case 'zero':
            case 'number':
                // do not allow number to start with zero
                if (type === 'zero' && currentNumber === '0') {
                    break;
                } else {
                    appendNumber(value);
                }
                break;
            case 'operator':
                appendOperator(value);
                break;
            case 'decimal':
                addDecimal();
                break;
            case 'equals':
                calculateSum();
                break;
            default:
                break;
        }
    }

    return (
        <button className={className} id={btn.id} onClick={() => handleClick(btn.label, btn.class)}>
            {btn.label}
        </button>
    );
}

export default Button;