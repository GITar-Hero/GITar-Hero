import _ from 'lodash';

function calculateWeight (tagsMap, taskTags) {
  return _.reduce(taskTags, (sum, taskTag) => {
    return tagsMap[taskTag] ? sum + countTaskTagWeight(tagsMap[taskTag].ratio) : sum;
  }, 1) * 100;
}

function calculateTagRatio (probes, valid) {
  return (valid || 0) / probes;
}

function countTaskTagWeight (ratio) {
  return Math.pow(1 / (ratio || 1), 2);
}

function calculateTaskTime (minTaskTime, defaultTaskTime, tasksCount) {
  let time = defaultTaskTime - tasksCount * 5;
  return time > minTaskTime ? time : minTaskTime;
}

function calculateTaskReward (task, elapsedTime) {
  var timeLeft = task.time - elapsedTime;
  return timeLeft > 0 ? Math.ceil((timeLeft / task.time) * task.reward) : 0;
}

export default {
  calculateWeight,
  calculateTagRatio,
  calculateTaskTime,
  calculateTaskReward
};
