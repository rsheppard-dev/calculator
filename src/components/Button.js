const Button = ({ btn, input, setInput, currentNumber, setCurrentNumber, previousNumber, setPreviousNumber, operator, setOperator }) => {

    const className = `btn ${btn.class}`;

    // my safe version of the eval() function
    const safeEval = () => {
        const inputArray = input.split(' ');
        const numbers = [];
        const operators = [];
        console.log(inputArray);

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
    }

    // converts positive numbers to negative and vice-versa
    const reverseNumber = () => {
        const regex = new RegExp(currentNumber + '$');

        if (Math.sign(Number(currentNumber)) < 0) {
            setInput(input.replace(regex, Math.abs(currentNumber)));
            setCurrentNumber(Math.abs(currentNumber));
        } else {
            setInput(input.replace(regex, -Math.abs(currentNumber)));
            setCurrentNumber(-Math.abs(currentNumber));
        }
    }

    // add new numbers to state
    const appendNumber = num => {
        setInput(`${input}${num}`)
        setCurrentNumber(Number(`${currentNumber}${num}`).toString());
    }

    // add operator to formula
    const appendOperator = op => {
        if (currentNumber === '0') {
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
        if (input.endsWith('</span> ')) {
            const newInput = input.substring(0, input.length - 35);
            setInput(newInput);
        }

        setCurrentNumber(safeEval());
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
            case 'zero': // do not allow number to start with zero
                if (currentNumber === '0') {
                    break;
                }
            // eslint-disable-next-line
            case 'number':
                appendNumber(value);
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
                return currentNumber;
        }
    }

    return (
        <button className={className} id={btn.id} onClick={() => handleClick(btn.label, btn.class)}>
            {btn.label}
        </button>
    );
}

export default Button;