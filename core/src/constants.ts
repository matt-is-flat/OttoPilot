// Exceptio messages
export const ExceptionMessages = {
  MainProcessorInitFault: "Could not create the main processor",
  InvalidNumberOfPages: "Invalid number of pages returned"
}

// Registration types for the IOC container
export const Registrations = {
  Browser: "Browser",
  IInstructionRetriever: "IInstructionRetriever",
  IProcessorFactory: "IProcessorFactory",
  IProcessor: "IProcessor",
  IMainProcessor: "IMainProcessor",
  IDataStorage: "IDataStorage"
}

// Instruction opcodes
export const Opcodes = {
  loadPage: "LOADPAGE",
  getText: "GETTEXT",
  printVariable: "PRINTVAR"
}

export const SelectorTypes = {
  id: "id",
  class: "class",
  xpath: "xpath"
}