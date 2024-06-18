#include <stdio.h>

// Function to determine letter grade based on marks
char determineGrade(int marks) {
    if (marks >= 80 && marks <= 100) {
        return 'A';
    } else if (marks >= 70 && marks <= 79) {
        return 'B';
    } else if (marks >= 60 && marks <= 69) {
        return 'C';
    } else if (marks >= 50 && marks <= 59) {
        return 'D';
    } else {
        return 'F';
    }
}

// Function to convert letter grade to grade points
float gradePoints(char grade) {
    switch (grade) {
        case 'A': return 4.0;
        case 'B': return 3.0;
        case 'C': return 2.0;
        case 'D': return 1.0;
        case 'F': return 0.0;
        default: return 0.0;
    }
}

// Function to calculate GPA
float calculateGPA(int num_courses, int credits[], char grades[]) {
    int total_credits = 0;
    float total_points = 0.0;

    for (int i = 0; i < num_courses; i++) {
        total_credits += credits[i];
        total_points += credits[i] * gradePoints(grades[i]);
    }

    return total_credits > 0 ? total_points / total_credits : 0;
}

int main() {
    FILE *file = fopen("input.txt", "r");
    if (!file) {
        fprintf(stderr, "Could not open input.txt\n");
        return 1;
    }

    int num_courses;
    fscanf(file, "%d", &num_courses);

    int credits[num_courses];
    int marks[num_courses];
    char grades[num_courses];

    for (int i = 0; i < num_courses; i++) {
        fscanf(file, "%d %d", &credits[i], &marks[i]);
        grades[i] = determineGrade(marks[i]);
    }

    fclose(file);

    float gpa = calculateGPA(num_courses, credits, grades);
    printf("%.2f\n", gpa);

    return 0;
}
