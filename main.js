let numberButtons = document.querySelectorAll("[data-number]")
let operationButtons = document.querySelectorAll("[data-operator]")
let equalsButton = document.querySelector("[data-equals]")
let deleteButton = document.querySelector("[data-delete]")
let allClearButton = document.querySelector("[data-all-clear]")
let previousOperandTextElement = document.querySelector("[data-previous-operand]")
let currentOperandTextElement = document.querySelector("[data-current-operand]")

class Calculator {
    constructor(previusOperandTextElement ,currentOperandTextElement) {
        this.previousOperandTextElement = previusOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString()

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = '';

        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0,})
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, - 1)
    }

    calculate() {
        let result;
        const _previusOperand = parseFloat(this.previusOperand)
        const _currentOperand = parseFloat(this.currentOperand)

        if(isNaN(_previusOperand) || isNaN(_currentOperand)) return

        switch (this.operation) {
            case '+':
                result = _previusOperand + _currentOperand
                break   
            case '-':
                result = _previusOperand - _currentOperand
                break
            case '%':
                result = _previusOperand / _currentOperand
                break
            case '*':
                result = _previusOperand * _currentOperand
                break
                default:
                    return   
        }

        this.currentOperand = result
        this.operation = undefined
        this.previusOperand = ''
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previusOperand !== '') {
            this.calculate()
        }

        this.operation = operation
        this.previusOperand = `${this.currentOperand}`
        this.currentOperand = ''   
    }

    appendNumber(number) {
        if(this.currentOperand.includes('.') && number === '.') return
         
        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }

    clear() {
        this.currentOperand = '';
        this.previusOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previusOperand)} ${this.operation || ''}`
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand)
    }    
}

let calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
)

for(const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
    })
}

for(const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText)
        calculator.updateDisplay()
    })
}

allClearButton.addEventListener("click", () => {
    calculator.clear(),
    calculator.updateDisplay()
})

equalsButton.addEventListener("click", () => {
    calculator.calculate(),
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()  
})
