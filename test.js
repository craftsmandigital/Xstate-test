
const { Machine, interpret } = require('xstate');

const handWashMachine1 = Machine({
  id: 'handwash',
  initial: 'unwashed',
  states: {
    unwashed: {
      entry: 'logEntry',
      on: {
        START_WASH: 'washing'
      }
    },
    washing: {

      entry: 'logEntry',
      on: {
        STOP_WASH: 'washed'
      }
    },
    washed: {

      entry: 'logEntry',
      type: 'final'
    }
  }
},
{
  actions: {
    logEntry: (context, event, meta) => {
      console.log(`Entering state: ${meta.state.value}`);
    }
  }
});

const washService = interpret(handWashMachine1);
washService.start();
washService.send({type: 'STOP_WASH'});
washService.send({type: 'START_WASH'});
washService.send({type: 'STOP_WASH'});
washService.send({type: 'STOP_WASH'});
// console.log(washService.currentState);
