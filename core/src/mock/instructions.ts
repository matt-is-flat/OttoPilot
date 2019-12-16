import Instruction from '../models/instruction';
import { SelectorTypes } from '../constants';
import { Opcodes } from '../../../common/constants';

const instructions : Instruction[] = [
  // {
  //   opcode: Opcodes.loadPage,
  //   parameters: {
  //     url: 'https://github.com/'
  //   }
  // },
  // {
  //   opcode: Opcodes.getText,
  //   parameters: {
  //     selectorType: SelectorTypes.xpath,
  //     selector: "/html/body/div[4]/main/div[1]/div/div/div[1]/h1"
  //   },
  //   resultStore: {
  //     variableName: "GithubSubtext"
  //   }
  // },
  // {
  //   opcode: Opcodes.printVariable,
  //   parameters: {
  //     variableName: "GithubSubtext"
  //   }
  // }
  {
    opcode: Opcodes.loadPage,
    parameters: {
      url: 'https://hertechpath.org/'
    }
  },
  {
    opcode: Opcodes.getText,
    parameters: {
      selectorType: SelectorTypes.xpath,
      selector: "//*[@id=\"app\"]/div[7]/main/div/div/section[1]/div/div[2]/div/h1"
    },
    resultStore: {
      variableName: "Title"
    }
  },
  {
    opcode: Opcodes.printVariable,
    parameters: {
      variableName: "Title"
    }
  }
]

export default instructions