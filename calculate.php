<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $type = $data['type'];

    if ($type === 'GPA') {
        $courses = $data['courses'];
        $num_courses = count($courses);

        // Create the input file for the C program
        $input_file = fopen('input.txt', 'w');
        fwrite($input_file, "$num_courses\n");
        foreach ($courses as $course) {
            fwrite($input_file, "{$course['credits']} {$course['marks']}\n");
        }
        fclose($input_file);

        // Execute the C program and capture the output
        $output = shell_exec('./gpa_calculator');
        $gpa = floatval($output);
        echo json_encode(['gpa' => $gpa]);

    } elseif ($type === 'CGPA') {
        $previousSemesters = $data['previousSemesters'];
        $currentCourses = $data['currentCourses'];

        $previous_total_grade_points = 0;
        $previous_total_credits = 0;

        foreach ($previousSemesters as $semester) {
            $previous_total_grade_points += $semester['gpa'] * $semester['credits'];
            $previous_total_credits += $semester['credits'];
        }

        $num_courses = count($currentCourses);

        // Create the input file for the C program
        $input_file = fopen('input.txt', 'w');
        fwrite($input_file, "$num_courses\n");
        foreach ($currentCourses as $course) {
            fwrite($input_file, "{$course['credits']} {$course['marks']}\n");
        }
        fclose($input_file);

        // Execute the C program and capture the output
        $output = shell_exec('./gpa_calculator');
        $current_gpa = floatval($output);
        $current_total_grade_points = $current_gpa * $num_courses;

        $new_total_grade_points = $previous_total_grade_points + $current_total_grade_points;
        $new_total_credits = $previous_total_credits + $num_courses;

        $cgpa = $new_total_grade_points / $new_total_credits;
        echo json_encode(['cgpa' => $cgpa]);
    }
}
?>
