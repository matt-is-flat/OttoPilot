import Instruction from '../models/instruction';
import { Opcodes, SelectorTypes } from '../constants';

const instructions : Instruction[] = [
  {
    opcode: Opcodes.loadPage,
    parameters: {
      url: 'https://github.com/'
    }
  },
  {
    opcode: Opcodes.getText,
    parameters: {
      selectorType: SelectorTypes.xpath,
      selector: "/html/body/div[4]/main/div[1]/div/div/div[1]/h1"
    },
    resultStore: {
      variableName: "GithubSubtext"
    }
  },
  {
    opcode: Opcodes.printVariable,
    parameters: {
      variableName: "GithubSubtext"
    }
  }
]

export default instructions