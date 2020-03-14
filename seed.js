/* Connection to Cassandra */
"use strict";
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['172.23.104.76']
});

function seedDB(){


client.connect()
.then(()=>client.execute("CREATE KEYSPACE kmd_rating WITH REPLICATION = {  'class' : 'NetworkTopologyStrategy',  'datacenter1' : 2 }"))
.then(()=>client.execute("USE kmd_rating"))

.then(()=>client.execute("CREATE TABLE admins (admin_username text, admin_password text, PRIMARY KEY (admin_username))"))
.then(()=>client.execute("CREATE TABLE students (student_id text, student_password text, PRIMARY KEY (student_id))"))
.then(()=>client.execute("CREATE TABLE courses (course_id text, course_name text, PRIMARY KEY (course_id))"))
.then(()=>client.execute("CREATE TABLE ratings (course_code text,course_name text,course_lecturer text,student_id text,student_email text, academic_year text, semester text, feedback text, rating int, PRIMARY KEY ((course_code, semester, academic_year),student_id))"))

.then(()=>client.execute("INSERT INTO admins(admin_username,admin_password) VALUES('admin','admin')"))

.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000001','student1')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000002','student2')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000003','student3')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000004','student4')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000005','student5')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000006','student6')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000007','student7')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000008','student8')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000009','student9')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000010','student10')"))
.then(()=>client.execute("INSERT INTO students (student_id, student_password) VALUES ('s000011','student11')"))

.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('CSSE001','Basic Computer System')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('CSSE002','Advance Computer System')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('INFS003','Basic Web System')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('INFS004','Advance Web System')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('NETK005','Basic Computer Network')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('NETK006','Advance Computer Network')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('CLOU007','Basic Cloud System')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('CLOU008','Advance Cloud System')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('CODE009','Basic Programming')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('CODE010','Advance Programming')"))
.then(()=>client.execute("INSERT INTO courses (course_id, course_name) VALUES ('CODE011','Programming in Large')"))

.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE011','Programming in Large','Mr.Joe','s000001','01@kmd.com','2017','1','Nice lecturer. Good content. But not enough tutor.',3)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CSSE002','Advance Computer System','Mr.BOB','s000001','01@kmd.com','2017','1','I do not recommand this course. It is too complex.',2)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE010','Advance Programming','Mr.T','s000001','01@kmd.com','2017','1','I like this course. Very Informative and well strucutre',4)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('INFS003','Basic Web System','Mr.Quagmire','s000001','01@kmd.com','2017','1','Love it. Everything is perfect.',5)"))

.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE011','Programming in Large','Mr.Joe','s000002','02@kmd.com','2017','1','Well structured course, but lecturer lack enthusiasm.',3)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CSSE002','Advance Computer System','Mr.BOB','s000002','02@kmd.com','2017','1','Good enought for me.',3)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE010','Advance Programming','Mr.T','s000002','02@kmd.com','2017','1','Too complex for me.',2)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('INFS003','Basic Web System','Mr.Quagmire','s000002','02@kmd.com','2017','1','Very easy to follow. Lecturer so nice.',4)"))

.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE011','Programming in Large','Mr.Joe','s000003','03@kmd.com','2017','1','Hate it everytime the lecturer wait for students to answer his stupid questions.',1)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CSSE002','Advance Computer System','Mr.BOB','s000003','03@kmd.com','2017','1','Good. I learnt alot.',4)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE010','Advance Programming','Mr.T','s000003','03@kmd.com','2017','1','Crazy perfect. I love it.',5)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('INFS003','Basic Web System','Mr.Quagmire','s000003','03@kmd.com','2017','1','Normal lecture. Advance assignemnt.',3)"))

.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE011','Programming in Large','Mr.Joe','s000004','04@kmd.com','2017','1','Not good enough.',2)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CSSE002','Advance Computer System','Mr.BOB','s000004','04@kmd.com','2017','1','Pretty Nice',5)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('CODE010','Advance Programming','Mr.T','s000004','04@kmd.com','2017','1','Normal',3)"))
.then(()=>client.execute("INSERT INTO ratings (course_code, course_name, course_lecturer, student_id, student_email, academic_year, semester, feedback,rating) VALUES ('INFS003','Basic Web System','Mr.Quagmire','s000004','04@kmd.com','2017','1','Perfect',5)"))

.then(()=> client.shutdown())
  .catch(function(err) {

      return client.shutdown();
  });
}
  module.exports=seedDB;