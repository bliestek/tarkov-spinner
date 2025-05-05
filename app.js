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
let currentRotation = 0;

function drawWheel() {
    const numMaps = maps.length;
    const angle = (2 * Math.PI) / numMaps;

    for (let i = 0; i < numMaps; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, i * angle, (i + 1) * angle);
        ctx.fillStyle = `hsl(${(i / numMaps) * 360}, 100%, 50%)`;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add map names
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * angle + angle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.fillText(maps[i], canvas.width / 2 - 10, 5);
        ctx.restore();
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
        const easeOut = 1 - Math.pow(1 - progress, 3); // Ease-out effect
        const currentAngle = currentRotation + spinAngle * easeOut;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((currentAngle * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel();
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            currentRotation = currentAngle % 360; // Save the final rotation
            const selectedMapIndex = Math.floor((360 - currentRotation) / (360 / maps.length)) % maps.length;
            resultDisplay.textContent = `Selected Map: ${maps[selectedMapIndex]}`;
            spinning = false;
        }
    }

    requestAnimationFrame(animateSpin);
}

spinButton.addEventListener("click", spinWheel);
drawWheel();