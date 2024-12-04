function parseFunction(funcStr) {
    return new Function('x', `return ${funcStr}`);
}

function drawAxes(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw marks
    for (let i = 0; i < width; i += 50) {
        ctx.moveTo(i, height / 2 - 5);
        ctx.lineTo(i, height / 2 + 5);
    }
    for (let i = 0; i < height; i += 50) {
        ctx.moveTo(width / 2 - 5, i);
        ctx.lineTo(width / 2 + 5, i);
    }
    ctx.stroke();
}

function transformGraph() {
    const parentFunctionStr = document.getElementById('parentFunction').value;
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const h = parseFloat(document.getElementById('h').value);
    const k = parseFloat(document.getElementById('k').value);

    const parentFunction = parseFunction(parentFunctionStr);

    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    drawAxes(ctx, canvas.width, canvas.height);

    // Draw transformed graph with animation
    let step = 0;
    const steps = 100;
    const interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw axes
        drawAxes(ctx, canvas.width, canvas.height);

        // Draw graph
        ctx.beginPath();
        ctx.strokeStyle = 'blue';

        for (let x = -canvas.width / 2; x < canvas.width / 2; x += 0.1) {
            const t = step / steps;
            const transformedX = x / 50;
            const y = a * parentFunction(b * (transformedX - h * t)) + k * t;
            const canvasX = x + canvas.width / 2;
            const canvasY = canvas.height / 2 - y * 50;

            if (x === -canvas.width / 2) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }

        ctx.stroke();

        step++;
        if (step > steps) {
            clearInterval(interval);
        }
    }, 20);
}