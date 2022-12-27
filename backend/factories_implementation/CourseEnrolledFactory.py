from entities.CourseEnrolled import CourseEnrolled


def create_course_enrolled(data: dict) -> CourseEnrolled:
    student_id = data.get("student_id")
    course_id = data.get("course_id")
    is_finished = data.get("is_finished")
    return CourseEnrolled(
        course=course_id,
        student=student_id,
        is_finished=is_finished
    )
