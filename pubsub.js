// Pubsub pattern for handling events

let events = {
    events: {}, // Key: Event Name, value: List of functions related to event
    // Adding functions to events
    on: function(eventName, fn){
        // If event type exists, do nothing, otherwise create empty list as its value
        this.events[eventName]= this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function(eventName, fn){
        if(this.events[eventName]){
            // On the condition that event type handlers exist
            for(let event_handler_idx in this.events[eventName]){
                if(this.events[eventName][event_handler_idx] === fn){
                    this.events[eventName].splice(event_handler_idx, 1);
                    break;
                }
            }
        }
    },
    emit: function(eventName, data){
        if(this.events[eventName]){
            // On the condition that event type handlers exist
            this.events[eventName].forEach(fn => {
                fn(data);
            });
        }
    }
}