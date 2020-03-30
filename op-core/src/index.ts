import { fork } from 'child_process';
import MainProcessor from './models/main-processor';
import { ExceptionMessages } from './constants';
import Config from './config.json';

async function main() {
  let cleanup = () => {}

  if (Config.LAUNCH_CHROME) {
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

main().then(() => { process.exit() })