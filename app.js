const maps = [
    "Woods",
    "The Lab",
    "Ground Zero",
    "Streets of Tarkov",
    "Factory",
    "Customs",
    "Reserve",
    "Lighthouse",
    "Interchange",
    "The Labyrinth",
    "Shoreline",
    "Terminal"
];

const spinButton = document.getElementById("spin-button");
const resultDisplay = document.getElementById("result");
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let spinning = false;

function drawWheel() {
    const numMaps = maps.length;
    const angle = (2 * Math.PI) / numMaps;

    for (let i = 0; i < numMaps; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, i * angle, (i + 1) * angle);
        ctx.fillStyle = `hsl(${(i / numMaps) * 360}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    const spinDuration = 3000; // 3 seconds
    const spinAngle = Math.random() * 360 + 720; // Random angle + 2 full spins
    const startTime = performance.now();

    function animateSpin(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        const currentAngle = spinAngle * progress;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((currentAngle * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            const selectedMapIndex = Math.floor((spinAngle % 360) / (360 / maps.length));
            resultDisplay.textContent = `Selected Map: ${maps[selectedMapIndex]}`;
            spinning = false;
        }
    }

    requestAnimationFrame(animateSpin);
}

spinButton.addEventListener("click", spinWheel);
drawWheel();