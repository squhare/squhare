let team1Score = 0;
let team2Score = 0;
let teamScores = [];
const team1Div = document.querySelector("#awwd-rd-team1");
const team2Div = document.querySelector("#awwd-rd-team2");
const team1ScoreDiv = document.querySelector("#awwd-rd-team1-score");
const team2ScoreDiv = document.querySelector("#awwd-rd-team2-score");
const teamScoresDiv = document.querySelector("#awwd-mh-scores");

function generateTeamScores() {
  let playerScore = [0, 0, 0, 0];

  for (let i = 0; i < 13; i++) {
    const score = Math.floor(Math.random() * 4);

    if (score > 1) {
      team2Score++;
    } else {
      team1Score++;
    }

    teamScores.push(score);

    playerScore[score]++;

    renderTeamScore(score, playerScore[score], i == 12);
  }

  team1ScoreDiv.innerHTML = team1Score;
  team2ScoreDiv.innerHTML = team2Score;

  teamScoresDiv.innerHTML += `<div>
            <span ${teamScores[12] < 2 ? 'class="about-text-accent"' : ""}>${team1Score}</span>
            <span ${teamScores[12] > 1 ? 'class="about-text-accent"' : ""}>${team2Score}</span>
          </div>`;

  const team1HistoryDiv = document.querySelector("#awwd-mh-team1");
  const team2HistoryDiv = document.querySelector("#awwd-mh-team2");

  if (teamScores[12] > 1) {
    team2Div.classList.add("about-text-accent");
    team2ScoreDiv.classList.add("about-text-accent");
    team2HistoryDiv.classList.add("about-text-accent");
  } else {
    team1Div.classList.add("about-text-accent");
    team1ScoreDiv.classList.add("about-text-accent");
    team1HistoryDiv.classList.add("about-text-accent");
  }
}

function renderTeamScore(index, score, recent) {
  let content = "";

  for (let i = 0; i < 4; i++) {
    content += `<span 
            ${i == index && recent ? 'class="about-text-accent"' : ""}>
            ${i == index ? score : ""}
            </span>`;
  }

  teamScoresDiv.innerHTML += `<div>${content}</div>`;
}

generateTeamScores();
