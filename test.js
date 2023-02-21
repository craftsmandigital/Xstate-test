// added new state Soaping to the machine with the stately tool
// https://stately.ai/registry/editor/9a2446c2-b6b3-4deb-98cb-a818872efe48?machineId=f959d9e0-4959-458e-9ebf-725e9a55d2ac



const { Machine, interpret } = require('xstate');

const handWashMachine1 = Machine({
  id: "handwash",
  initial: "unwashed",
  states: {
    unwashed: {
      entry: "logEntry",
      on: {
        START_WASH: {
          target: "washing",
        },
      },
    },
    washing: {
      entry: "logEntry",
      on: {
        STOP_WASH: {
          target: "washed",
          actions: 'writeTrans', //string representing action
        },
        START_SOAPING: {
          target: "Soaping",
          actions: 'writeTrans', //string representing action
          // cond: "dirty",
        },
      },
    },
    washed: {
      entry: "logEntry",
      type: "final",
    },
    Soaping: {
      entry: "logEntry",
      on: {
        STOP_SOAPING: {
          target: "washing",
          actions: 'writeTrans', //string representing action
        },
      },
    },
  },
  // context: {},
  // predictableActionArguments: true,
  // preserveActionOrder: true,
},
  {
    actions: {
      logEntry: (context, event, meta) => {
        console.log(`Entering state: ${meta.state.value}`);
      },

      writeTrans: (context, event, meta) => {
        console.log(`going from one state to another in transition: ${event.type}`);
      }
    }
  });

const washService = interpret(handWashMachine1);
washService.start();
washService.send({ type: 'START_WASH' });
washService.send({ type: 'START_WASH' }); // wil not trigger
washService.send({ type: 'START_WASH' }); // wil not trigger
washService.send({ type: 'START_WASH' }); // wil not trigger
washService.send({ type: 'START_WASH' }); // wil not trigger
washService.send({ type: 'START_WASH' }); // wil not trigger
washService.send({ type: 'START_WASH' }); // wil not trigger
washService.send({ type: 'START_SOAPING' });
washService.send({ type: 'STOP_SOAPING' });
washService.send({ type: 'START_SOAPING' });
washService.send({ type: 'STOP_SOAPING' });
washService.send({ type: 'STOP_WASH' });
// console.log(washService.currentState);


console.log("Start antother simpler path");
washService.start();
washService.send({ type: 'START_WASH' });

washService.send({ type: 'STOP_WASH' });
