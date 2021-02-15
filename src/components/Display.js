import ReactHTMLParser from 'react-html-parser';

const Display = ({input, currentNumber, operator}) => {
    return (
        <div className="display">
            <div className="sum" >{ReactHTMLParser(input)}</div>
            <div className="total">{operator && currentNumber === '0' ? operator : currentNumber}</div>
        </div>
    );
}

export default Display;