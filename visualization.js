// Set up the SVG and dimensions
const width = 800;
const height = 400;
const barWidth = 20;
const barSpacing = 2;
const numBars = Math.floor(width / (barWidth + barSpacing));
const data = Array.from({ length: numBars }, () => Math.floor(Math.random() * height));

const svg = d3.select("#visualization").append("svg")
    .attr("width", width)
    .attr("height", height);

// Draw bars
function drawBars(data) {
    svg.selectAll("*").remove(); // Clear previous bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => i * (barWidth + barSpacing))
        .attr("y", d => height - d)
        .attr("width", barWidth)
        .attr("height", d => d)
        .transition()
        .duration(500);
}

// Bubble Sort algorithm
async function bubbleSort(data) {
    let len = data.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                drawBars(data);
                await new Promise(resolve => setTimeout(resolve, 100)); // Delay
            }
        }
    }
    drawBars(data);
}

// Selection Sort algorithm
async function selectionSort(data) {
    let len = data.length;
    for (let i = 0; i < len - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < len; j++) {
            if (data[j] < data[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [data[i], data[minIdx]] = [data[minIdx], data[i]];
            drawBars(data);
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay
        }
    }
    drawBars(data);
}

// Insertion Sort algorithm
async function insertionSort(data) {
    let len = data.length;
    for (let i = 1; i < len; i++) {
        let key = data[i];
        let j = i - 1;
        while (j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j--;
            drawBars(data);
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay
        }
        data[j + 1] = key;
        drawBars(data);
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay
    }
    drawBars(data);
}

// Start sorting based on selected algorithm
async function startSorting() {
    const algorithm = document.getElementById("algorithm").value;
    const newData = Array.from(data); // Copy data
    if (algorithm === "bubble") {
        await bubbleSort(newData);
    } else if (algorithm === "selection") {
        await selectionSort(newData);
    } else if (algorithm === "insertion") {
        await insertionSort(newData);
    }
}
