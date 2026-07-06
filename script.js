// Grade Configuration (Standard 10.0 Scale Mapping)
const gradeScale = {
    "S": 10.0,
    "A": 9.0,
    "B": 8.0,
    "C": 7.0,
    "D": 6.0,
    "E": 5.0,
    "F": 0.0
};

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    // Attempt to load from localStorage, fall back to 3 rows if empty
    if (!loadState()) {
        for (let i = 0; i < 3; i++) {
            addSubjectRow();
        }
    }

    // Set up event listeners for inputs
    document.getElementById('add-course-btn').addEventListener('click', () => {
        addSubjectRow();
        calculateAll();
    });
    document.getElementById('calculate-btn').addEventListener('click', calculateAll);
    
    document.getElementById('prev-credits').addEventListener('input', calculateAll);
    document.getElementById('prev-cgpa').addEventListener('input', calculateAll);
    document.getElementById('future-credits').addEventListener('input', calculateAll);
    document.getElementById('target-gpa').addEventListener('input', calculateAll);
});

function addSubjectRow(name = "", credits = "", gradeVal = "") {
    const container = document.getElementById('subjects-container');
    const row = document.createElement('div');
    row.className = 'subject-row';
    
    let gradeOptions = `<option value="">Grade</option>`;
    for (let grade in gradeScale) {
        const selected = gradeScale[grade].toString() === gradeVal.toString() ? 'selected' : '';
        gradeOptions += `<option value="${gradeScale[grade]}" ${selected}>${grade}</option>`;
    }

    row.innerHTML = `
        <input type="text" class="row-name" placeholder="Course Name (Optional)" value="${name}">
        <input type="number" class="row-credits" min="0" placeholder="Credits" value="${credits}">
        <select class="row-grade">
            ${gradeOptions}
        </select>
        <button type="button" class="btn btn-danger remove-btn">✕</button>
    `;

    const selectEl = row.querySelector('.row-grade');
    
    // Function to dynamically update the data attribute for CSS styling
    const updateGradeTier = () => {
        const text = selectEl.options[selectEl.selectedIndex].text;
        if (["S", "A"].includes(text)) selectEl.dataset.tier = "excellent";
        else if (["B", "C"].includes(text)) selectEl.dataset.tier = "good";
        else if (["D", "E"].includes(text)) selectEl.dataset.tier = "satisfactory";
        else if (text === "F") selectEl.dataset.tier = "fail";
        else delete selectEl.dataset.tier;
    };

    // Initialize Tier Style
    updateGradeTier();

    row.querySelector('.row-credits').addEventListener('input', calculateAll);
    selectEl.addEventListener('change', () => {
        updateGradeTier();
        calculateAll();
    });
    
    row.querySelector('.remove-btn').addEventListener('click', () => {
        row.remove();
        calculateAll();
    });

    container.appendChild(row);
}

function pulse(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.remove('updated');
        void element.offsetWidth; // Trigger DOM reflow to restart transition
        element.classList.add('updated');
    }
}

function saveState() {
    const state = {
        prevCredits: document.getElementById('prev-credits').value,
        prevCgpa: document.getElementById('prev-cgpa').value,
        futureCredits: document.getElementById('future-credits').value,
        targetGpa: document.getElementById('target-gpa').value,
        courses: []
    };

    const rows = document.querySelectorAll('.subject-row');
    rows.forEach(row => {
        state.courses.push({
            name: row.querySelector('.row-name').value,
            credits: row.querySelector('.row-credits').value,
            grade: row.querySelector('.row-grade').value
        });
    });

    localStorage.setItem('gpaHubState', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('gpaHubState');
    if (!saved) return false;

    try {
        const state = JSON.parse(saved);
        document.getElementById('prev-credits').value = state.prevCredits || 0;
        document.getElementById('prev-cgpa').value = state.prevCgpa || 0.00;
        document.getElementById('future-credits').value = state.futureCredits || 0;
        document.getElementById('target-gpa').value = state.targetGpa || 0.00;

        const container = document.getElementById('subjects-container');
        container.innerHTML = ''; // Clear defaults

        if (state.courses && state.courses.length > 0) {
            state.courses.forEach(c => addSubjectRow(c.name, c.credits, c.grade));
        } else {
            return false;
        }
        calculateAll();
        return true;
    } catch (e) {
        console.error("Error breaking down localStorage structure:", e);
        return false;
    }
}

function calculateAll() {
    // --- Validation Checks ---
    const prevCreditsInput = document.getElementById('prev-credits');
    const futureCreditsInput = document.getElementById('future-credits');

    let hasErrors = false;

    if (parseFloat(prevCreditsInput.value) < 0) {
        prevCreditsInput.classList.add('input-error');
        hasErrors = true;
    } else {
        prevCreditsInput.classList.remove('input-error');
    }

    if (parseFloat(futureCreditsInput.value) < 0) {
        futureCreditsInput.classList.add('input-error');
        hasErrors = true;
    } else {
        futureCreditsInput.classList.remove('input-error');
    }

    // --- 1. Base Variables ---
    const prevCredits = parseFloat(prevCreditsInput.value) || 0;
    let prevCgpa = parseFloat(document.getElementById('prev-cgpa').value) || 0;
    if (prevCgpa > 10) prevCgpa = 10;

    const prevHonorPoints = prevCredits > 0 ? prevCredits * prevCgpa : 0;

    // --- 2. Current Semester Calculation ---
    const creditInputs = document.querySelectorAll('.row-credits');
    const gradeSelects = document.querySelectorAll('.row-grade');

    let currentSemCredits = 0;
    let currentSemHonorPoints = 0;

    for (let i = 0; i < creditInputs.length; i++) {
        const cInput = creditInputs[i];
        const credits = parseFloat(cInput.value) || 0;
        const gradeValue = gradeSelects[i].value;

        if (credits < 0) {
            cInput.classList.add('input-error');
            hasErrors = true;
        } else {
            cInput.classList.remove('input-error');
        }

        if (credits > 0 && gradeValue !== "") {
            currentSemCredits += credits;
            currentSemHonorPoints += (credits * parseFloat(gradeValue));
        }
    }

    // Update Semester Display
    const semGpa = currentSemCredits > 0 ? (currentSemHonorPoints / currentSemCredits) : 0;
    document.getElementById('semester-gpa-display').innerText = semGpa.toFixed(2);
    document.getElementById('sem-credits-stat').innerText = currentSemCredits;

    // --- 3. Cumulative Running CGPA ---
    const totalRunningCredits = prevCredits + currentSemCredits;
    const totalRunningHonorPoints = prevHonorPoints + currentSemHonorPoints;
    const runningCgpa = totalRunningCredits > 0 ? (totalRunningHonorPoints / totalRunningCredits) : 0;

    document.getElementById('running-cgpa-display').innerText = runningCgpa.toFixed(2);
    document.getElementById('total-credits-stat').innerText = totalRunningCredits;

    // --- 4. What-If Graduation Simulation ---
    const futureCredits = parseFloat(futureCreditsInput.value) || 0;
    let targetGpa = parseFloat(document.getElementById('target-gpa').value) || 0;
    if (targetGpa > 10) targetGpa = 10;

    const totalGraduationCredits = totalRunningCredits + futureCredits;
    const totalGraduationHonorPoints = totalRunningHonorPoints + (futureCredits * targetGpa);
    const projectedCgpa = totalGraduationCredits > 0 ? (totalGraduationHonorPoints / totalGraduationCredits) : 0;

    document.getElementById('simulated-cgpa-display').innerText = projectedCgpa.toFixed(2);

    // Fire UI feedback pulses
    pulse('semester-gpa-display');
    pulse('running-cgpa-display');
    pulse('simulated-cgpa-display');

    // Run Persistence
    saveState();
}