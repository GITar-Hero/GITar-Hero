import CommandResolver from '../resolvers/CommandResolver';
import * as commandActions from '../actions/CommandActions';
import * as consoleActions from '../actions/ConsoleActions';
import TaskUtils from '../utils/TaskUtils';

export default ({ getState }) => (next) => (action) => {
  if (action.type === consoleActions.ENTER_COMMAND) {
    next(action);
    action = getNextAction(action, getState());
  }
  next(action);
};

function getNextAction (oldAction, state) {
  var currentStep = TaskUtils.getCurrentStep(state.tasks);
  var command = oldAction.payload.command;
  var isValid = CommandResolver.checkIsCommandAllowed(command, currentStep.commands);
  return isValid ? commandActions.newValidCommand(command, currentStep) : commandActions.newInvalidCommand(command);
}
