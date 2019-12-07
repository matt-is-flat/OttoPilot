import { fork } from 'child_process';
import MainProcessor from './main-processor';
import ExceptionMessages from './constants/exception-messages';

async function Main() {
  let cleanup = () => {}

  if (process.env.ENV !== 'DEV') {
    let browserlessProcess = fork('./build/index.js');
    cleanup = () => { browserlessProcess.kill() }
  }

  let mainProcessor = await MainProcessor.TryInitialise();

  if (mainProcessor) {
    while(mainProcessor.Execute()) {
      await new Promise(r => setTimeout(r, 0))
    }
  } else {
    throw new Error(ExceptionMessages.MainProcessorInitFault)
  }

  cleanup()
}

Main();