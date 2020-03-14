s4523895-kmdapp.uqcloud.net
KMD course rating app

Give feedback and ratings about your courses in KMD.
---------------------
<h2>Features</h2>
    Admin can do CRUD operations on students and courses.
    Students can give rating and feedback on courses.
    Average Rating of the courses can be check in Zeppelin

<h2>Login Info Example</h2>
    Admin = usernmae: admin, password: admin
    Student = username: s00001, password: student1

<h2>Technology Used</h2>
    Docker for virtualization
    Node and EJS for web app
    Cassandra for database
   
<h2>Database Information</h2>
<h3>DB Name</h3>
    rate_course
    
<h3>Tables</h3> 
    Admins
    Students
    Courses
    Ratings

<h3>Columns</h3>
    Admins: admin_username , admin_password
    Students: student_user, student_password
    Courses: course_code, course_name
    Rating: course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback, rating


	    
