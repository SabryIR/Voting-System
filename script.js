// Initialize the poll as a Map: each option maps to a Set of voter IDs
const poll = new Map();

// Add an option to the poll
function addOption(option) {
  if (!option) {
    return 'Option cannot be empty.';
  }
  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }
  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}

// Cast a vote for an option
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }
  const voters = poll.get(option);
  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }
  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

// Display the poll results
function displayResults() {
  const lines = ['Poll Results:'];
  poll.forEach((voters, option) => {
    lines.push(`${option}: ${voters.size} votes`);
  });
  return lines.join('\n');
}

// Testing a couple of User Stories: at least three options and at least three votes
addOption('Turkey');
addOption('Morocco');
addOption('Spain');

vote('Turkey', 'user1');
vote('Turkey', 'user2');
vote('Morocco', 'user3');

console.log(displayResults());