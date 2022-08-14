// DOM element selectors
const incrementBtn = document.getElementById('increment'),
    decrementBtn = document.getElementById('decrement'),
    counterCardWrapper = document.getElementById('counter-card-wrapper'),
    addCardBtn = document.getElementById('add-card-btn'),
    resetBtn = document.getElementById('reset')

// counter initial state
const initialState = [{ id: 1, countValue: 0 }]

// add card action creator
function addCard() {
    return {
        type: 'ADD_CARD'
    }
}

// increment action creator
function increment(id, value) {
    return {
        type: 'INCREMENT',
        payload: { id, value }
    }
}

// decrement action creator
function decrement(id, value) {
    return {
        type: 'DECREMENT',
        payload: { id, value }
    }
}

// decrement action creator
function reset() {
    return {
        type: 'RESET'
    }
}

// reducer function
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CARD':
            return [
                ...state,
                {
                    id: state[state.length - 1].id + 1,
                    countValue: 0
                }
            ]
            break
        case 'INCREMENT':
            const incrementState = [...state]
            incrementState.map((s) => {
                if (s.id == action.payload.id) {
                    const nc = s.countValue + action.payload.value
                    s.countValue = nc
                }
            })
            return incrementState
            break
        case 'DECREMENT':
            const decrementState = [...state]
            decrementState.map((s) => {
                if (s.id == action.payload.id) {
                    const nc = s.countValue - action.payload.value
                    s.countValue = nc
                }
            })
            return decrementState
        case 'RESET':
            const resetState = [...state]
            resetState.map((s) => {
                s.countValue = 0
            })
            return resetState
        default:
            return state
            break
    }
}

// redux store
const store = Redux.createStore(counterReducer)

// render user interface
function renderUI() {
    const state = store.getState()

    // clear
    counterCardWrapper.innerHTML = ''

    state.forEach((element) => {
        // HTML to append
        const counterCard = `<div class="p-4 mt-5 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow" id="${element.id}">
<div class="text-2xl font-semibold" id="count-value">
    ${element.countValue}
</div>
<div class="flex space-x-3">
    <button class="increment bg-indigo-400 text-white px-3 py-2 rounded shadow" id="increment">
        Increment
    </button>
    <button class="decrement bg-red-400 text-white px-3 py-2 rounded shadow">
        Decrement
    </button>
</div>
</div>`

        // add counter card
        counterCardWrapper.insertAdjacentHTML('beforeend', counterCard)
    })
    console.log(state)
}

// subscribe to redux store
store.subscribe(renderUI)

// add counter card
addCardBtn.addEventListener('click', () => {
    store.dispatch(addCard())
})

// increment/decrement count state
counterCardWrapper.addEventListener('click', (event) => {
    const id = event.target.parentElement.parentElement.id

    if (event.target.classList.contains('increment')) {
        store.dispatch(increment(id, Number(id) + 5))
    }

    if (event.target.classList.contains('decrement')) {
        store.dispatch(decrement(id, Number(id) + 2))
    }
})

// reset all count state
resetBtn.addEventListener('click', () => {
    store.dispatch(reset())
})
