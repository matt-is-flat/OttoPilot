const launchChrome = require('@serverless-chrome/lambda')
const CDP = require('chrome-remote-interface')

const maxTimeout = 30000 // ms

const chromeOptions = {
  flags: [
    '--window-size=1280,1696',
    '--hide-scrollbars'
  ]
}

module.exports.execute = async function (event, context, callback) {
  var flowId = event.pathParameters.id;

  // Validate ID and check there is at least 1 stage to execute
  var stages = getAllStages(flowId);

  if (stages.length === 0) {
    callback(Error("Invalid flow ID"), { statusCode: 400 })
  }

  // Launch chrome
  var chrome = await launchChrome(chromeOptions)

  var startTime = new Date().getTime()
  var continueExecuting = true

  while (1) {
    continueExecuting = (new Date().getTime - startTime) < maxTimeout
    
    var nextStatement = getNextStatement()
    continueExecuting = !!nextStatement

    if (!continueExecuting) {
      console.log("Stopping")
      break
    }

    // Execute the statement
  }
  
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(version)
  })
}

function getNextStage() {

}

function getAllStages(flowId) {
  return [1,2,3]
}