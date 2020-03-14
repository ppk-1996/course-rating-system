s4523895-kmdapp.uqcloud.net
KMD course rating app

Give feedback and ratings about your courses in KMD.
---------------------
Features
    Admin can do CRUD operations on students and courses.
    Students can give rating and feedback on courses.
    Average Rating of the courses can be check in Zeppelin

Login Info Example
    Admin = usernmae: admin, password: admin
    Student = username: s00001, password: student1

Technology Used
    Docker for virtualization
    Node and EJS for web app
    Cassandra for database
   

DB Name
    rate_course
    
Tables 
    Admins
    Students
    Courses
    Ratings

Columns
    Admins: admin_username , admin_password
    Students: student_user, student_password
    Courses: course_code, course_name
    Rating: course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback, rating


	    
