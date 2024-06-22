document.querySelectorAll('input[name="calculationType"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
        if (event.target.value === 'GPA') {
            document.getElementById('gpa-section').style.display = 'block';
            document.getElementById('cgpa-section').style.display = 'none';
        } else {
            document.getElementById('gpa-section').style.display = 'none';
            document.getElementById('cgpa-section').style.display = 'block';
        }
    });
});

function addCourse(isCGPA = false) {
    const container = isCGPA ? document.getElementById('cgpa-courses') : document.getElementById('gpa-courses');
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';
    courseDiv.innerHTML = `
        <input type="text" placeholder="Course Code">
        <input type="number" placeholder="Unit Credit">
        <input type="number" placeholder="Score">
    `;
    container.appendChild(courseDiv);
}

function addSemester() {
    const container = document.getElementById('previous-semesters');
    const semesterDiv = document.createElement('div');
    semesterDiv.className = 'semester';
    semesterDiv.innerHTML = `
        <input type="number" placeholder="GPA">
        <input type="number" placeholder="Total Credits">
    `;
    container.appendChild(semesterDiv);
}

function proceedToCurrent() {
    document.getElementById('current-semester').style.display = 'block';
}

function gatherCourses(isCGPA = false) {
    const container = isCGPA ? document.getElementById('cgpa-courses') : document.getElementById('gpa-courses');
    const courses = container.querySelectorAll('.course');
    let courseDetails = [];

    courses.forEach(course => {
        const inputs = course.querySelectorAll('input');
        const courseCode = inputs[0].value;
        const credits = parseInt(inputs[1].value);
        const marks = parseInt(inputs[2].value);
        courseDetails.push({ courseCode, credits, marks });
    });

    return courseDetails;
}

function gatherSemesters() {
    const container = document.getElementById('previous-semesters');
    const semesters = container.querySelectorAll('.semester');
    let semesterDetails = [];

    semesters.forEach(semester => {
        const inputs = semester.querySelectorAll('input');
        const gpa = parseFloat(inputs[0].value);
        const credits = parseInt(inputs[1].value);
        semesterDetails.push({ gpa, credits });
    });

    return semesterDetails;
}

function calculateGPA() {
    const courses = gatherCourses();
    fetch('calculate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'GPA', courses }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('gpa-result').textContent = `GPA: ${data.gpa.toFixed(2)}`;
    })
    .catch(error => console.error('Error:', error));
}

function calculateCGPA() {
    const previousSemesters = gatherSemesters();
    const currentCourses = gatherCourses(true);
    fetch('calculate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'CGPA', previousSemesters, currentCourses }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('cgpa-result').textContent = `CGPA: ${data.cgpa.toFixed(2)}`;
    })
    .catch(error => console.error('Error:', error));
}
