
import { TinyEmitter } from 'tiny-emitter/index';
import { Log, Constants } from '@/components/util';

let emitter = new TinyEmitter();

export const EventTrigger = {

    trigger: (eventName: string, data?: any, delay: boolean = true) => {
        setTimeout(
            () => {
                Log.info('Emitting Event: ' + eventName);
                emitter.emit(eventName, data);
            }, 
            
            delay ? Constants.defaultEventTriggerTimeout : 0
        );
    },

};

export default {
    emitter,
    EventTrigger
};
