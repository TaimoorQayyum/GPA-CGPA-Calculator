document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and tab contents
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding tab content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // GPA Calculator
    const gpaForm = document.getElementById('gpa-form');
    const coursesList = document.getElementById('courses-list');
    const gpaResult = document.getElementById('gpa-result');
    const gpaValue = document.getElementById('gpa-value');
    const totalCredits = document.getElementById('total-credits');
    const totalPoints = document.getElementById('total-points');
    const clearGpaButton = document.getElementById('clear-gpa');
    
    let courses = [];
    
    gpaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const courseName = document.getElementById('course-name').value;
        const creditHours = parseFloat(document.getElementById('credit-hours').value);
        const grade = parseFloat(document.getElementById('grade').value);
        const gradeText = document.getElementById('grade').options[document.getElementById('grade').selectedIndex].text;
        
        const course = {
            name: courseName,
            credits: creditHours,
            grade: grade,
            gradeText: gradeText,
            points: creditHours * grade
        };
        
        courses.push(course);
        updateCoursesTable();
        calculateGPA();
        
        // Reset form
        document.getElementById('course-name').value = '';
        document.getElementById('credit-hours').value = '3';
        document.getElementById('grade').value = '';
        
        // Focus on course name field for next entry
        document.getElementById('course-name').focus();
    });
    
    clearGpaButton.addEventListener('click', function() {
        courses = [];
        updateCoursesTable();
        gpaResult.style.display = 'none';
    });
    
    function updateCoursesTable() {
        coursesList.innerHTML = '';
        
        if (courses.length === 0) {
            document.getElementById('courses-table-container').style.display = 'none';
            return;
        }
        
        document.getElementById('courses-table-container').style.display = 'block';
        
        courses.forEach((course, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.credits}</td>
                <td>${course.gradeText}</td>
                <td>${course.points.toFixed(2)}</td>
                <td class="action-cell">
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            
            coursesList.appendChild(row);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                courses.splice(index, 1);
                updateCoursesTable();
                calculateGPA();
            });
        });
    }
    
    function calculateGPA() {
        if (courses.length === 0) {
            gpaResult.style.display = 'none';
            return;
        }
        
        let totalCreditHours = 0;
        let totalGradePoints = 0;
        
        courses.forEach(course => {
            totalCreditHours += course.credits;
            totalGradePoints += course.points;
        });
        
        const gpa = totalGradePoints / totalCreditHours;
        
        gpaValue.textContent = gpa.toFixed(2);
        totalCredits.textContent = totalCreditHours;
        totalPoints.textContent = totalGradePoints.toFixed(2);
        
        gpaResult.style.display = 'block';
    }
    
    // CGPA Calculator
    const cgpaForm = document.getElementById('cgpa-form');
    const semestersContainer = document.getElementById('semesters-container');
    const cgpaResult = document.getElementById('cgpa-result');
    const cgpaValue = document.getElementById('cgpa-value');
    const cumulativeCredits = document.getElementById('cumulative-credits');
    const clearCgpaButton = document.getElementById('clear-cgpa');
    
    let semesters = [];
    
    cgpaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const semesterName = document.getElementById('semester-name').value;
        const semesterCredits = parseFloat(document.getElementById('semester-credits').value);
        const semesterGpa = parseFloat(document.getElementById('semester-gpa').value);
        
        const semester = {
            name: semesterName,
            credits: semesterCredits,
            gpa: semesterGpa,
            points: semesterCredits * semesterGpa
        };
        
        semesters.push(semester);
        updateSemesters();
        calculateCGPA();
        
        // Reset form
        document.getElementById('semester-name').value = '';
        document.getElementById('semester-credits').value = '';
        document.getElementById('semester-gpa').value = '';
        
        // Focus on semester name field for next entry
        document.getElementById('semester-name').focus();
    });
    
    clearCgpaButton.addEventListener('click', function() {
        semesters = [];
        updateSemesters();
        cgpaResult.style.display = 'none';
    });
    
    function updateSemesters() {
        semestersContainer.innerHTML = '';
        
        if (semesters.length === 0) {
            return;
        }
        
        semesters.forEach((semester, index) => {
            const semesterDiv = document.createElement('div');
            semesterDiv.className = 'semester-container card';
            
            semesterDiv.innerHTML = `
                <div class="semester-header">
                    <span class="semester-title">${semester.name}</span>
                    <span class="semester-gpa">GPA: ${semester.gpa.toFixed(2)}</span>
                </div>
                <p>Credit Hours: ${semester.credits}</p>
                <p>Grade Points: ${semester.points.toFixed(2)}</p>
                <button class="delete-btn" data-index="${index}">Delete Semester</button>
            `;
            
            semestersContainer.appendChild(semesterDiv);
        });
        
        // Add event listeners to delete buttons
        semestersContainer.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                semesters.splice(index, 1);
                updateSemesters();
                calculateCGPA();
            });
        });
    }
    
    function calculateCGPA() {
        if (semesters.length === 0) {
            cgpaResult.style.display = 'none';
            return;
        }
        
        let totalCreditHours = 0;
        let totalGradePoints = 0;
        
        semesters.forEach(semester => {
            totalCreditHours += semester.credits;
            totalGradePoints += semester.points;
        });
        
        const cgpa = totalGradePoints / totalCreditHours;
        
        cgpaValue.textContent = cgpa.toFixed(2);
        cumulativeCredits.textContent = totalCreditHours;
        
        cgpaResult.style.display = 'block';
    }
});

