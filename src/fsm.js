class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error;
        this.config = config;
        this.state = this.config.initial;
        this.currentState = [];
        this.redoCurrentState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
        
        this.currentState.push(this.state);
        this.redoCurrentState = [];
        this.state = state;
        } else {
            throw new Error;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    
    trigger(event) {
        let state = this.getState();
        if (this.config.states[state] && this.config.states[state].transitions[event]) {
            this.changeState(this.config.states[state].transitions[event]);
        }
        else throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let states = Object.keys(this.config.states);
      if (!event) return states;
      let evented = states.filter(elem => Object.keys(this.config.states[elem].transitions).indexOf(event) > -1);
      return evented;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.currentState.length == 0) {
            return false;
        } else {
            let state = this.currentState.pop();
            this.redoCurrentState.push(this.state);
            this.state = state;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoCurrentState.length == 0) return false;
        else {
            let state = this.redoCurrentState.pop(); 
            this.currentState.push(this.state);
            this.state =  state;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = this.config.initial;
        this.currentState = [];
        this.undoCurrentState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
