import { fork } from 'child_process';
import MainProcessor from './main-processor';
import { ExceptionMessages } from './constants';
import Config from './config.json';

async function main() {
  let cleanup = () => {}

  if (Config.ENV !== 'DEV') {
    let browserlessProcess = fork('./build/index.js');
    cleanup = () => { browserlessProcess.kill() }
  }

  let mainProcessor = await MainProcessor.TryInitialise();

  if (!mainProcessor) {
    throw new Error(ExceptionMessages.MainProcessorInitFault);
  }

  while(await mainProcessor.Execute()) {
    await new Promise(r => setTimeout(r, 0))
  }

  cleanup()
}

var startTime = Date.now()

main().then(() => {
  var totalTime = Date.now() - startTime
  console.log(`Total execution time: ${totalTime}ms`)
  process.exit()
})