const criteria = [
    "이 행동이 학생 자신이나 다른 사람을 위험하게 하는가?",
    "이 행동이 얼마나 자주 일어나는가?",
    "얼마나 오랜 시간 문제행동이 지속되었는가?",
    "이 행동의 변화가 더 높은 비율의 강화를 가져오는가?",
    "앞으로의 발달 및 독립적인 기술증진과 연관성이 있는가?",
    "목표행동의 변화가 다른 사람들로부터 부적절하거나 원하지 않는 관심을 줄일 수 있는가?",
    "이 행동의 변화가 또래나 선생님으로부터 더 많은 강화를 받을 수 있게 하는가?",
    "이 행동의 변화가 얼마나 성공적일 수 있는가?",
    "얼마나 많은 비용을 지불해야 하는가? (비용대비 효율성)"
];

const behaviors = ["행동1", "행동2", "행동3", "행동4"];

const container = document.getElementById("criteria-container");

behaviors.forEach(behavior => {
    const behaviorContainer = document.createElement("div");
    behaviorContainer.innerHTML = `<h3>${behavior}</h3>`;
    criteria.forEach((criterion, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <label>${criterion}</label>
            <select id="${behavior}-${index}">
                <option value="0">0=절대 그렇지 않다</option>
                <option value="1">1=거의 그렇지 않다</option>
                <option value="2">2=가끔 그렇다</option>
                <option value="3">3=자주 그렇다</option>
                <option value="4">4=항상 그렇다</option>
            </select>
        `;
        behaviorContainer.appendChild(div);
    });
    container.appendChild(behaviorContainer);
});

function calculatePriority() {
    const scores = {};
    behaviors.forEach(behavior => {
        scores[behavior] = 0;
        criteria.forEach((_, index) => {
            const score = parseInt(document.getElementById(`${behavior}-${index}`).value);
            scores[behavior] += score;
        });
    });

    const sortedBehaviors = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "";
    sortedBehaviors.forEach((behavior, i) => {
        const result = document.createElement("p");
        result.textContent = `${i + 1}순위: ${behavior} (총점: ${scores[behavior]}점)`;
        resultContainer.appendChild(result);
    });
}

function saveResults() {
    const name = document.getElementById("name").value;
    const behavior1 = document.getElementById("behavior1").value;
    const behavior2 = document.getElementById("behavior2").value;
    const behavior3 = document.getElementById("behavior3").value;
    const behavior4 = document.getElementById("behavior4").value;

    let resultText = `대상자의 이름: ${name}\n\n`;
    resultText += `행동1: ${behavior1}\n`;
    resultText += `행동2: ${behavior2}\n`;
    resultText += `행동3: ${behavior3}\n`;
    resultText += `행동4: ${behavior4}\n\n`;

    const resultContainer = document.getElementById("result-container");
    const results = resultContainer.querySelectorAll("p");
    results.forEach(result => {
        resultText += result.textContent + "\n";
    });

    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "우선순위_결과.txt";
    link.click();
}
