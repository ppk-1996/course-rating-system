/* Connection to Cassandra */
"use strict";
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
    contactPoints: ['172.23.104.76']
});
client.connect()
    .catch(function(err) {
        console.error('There was an error when connecting', err);
        return client.shutdown();
    });


/* ************************************************** */
/* Require packages, set up a few things */
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    seedDB=require("./seed");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(session({
    secret: "!@#$%^",
    resave: true,
    saveUninitialized: true
}))
app.use(function(req, res, next) {
    res.locals.currentuser = req.session.user;
    next();
});
app.use(express.static(__dirname + "/public"));
seedDB();
/* *************************************************** */
/* Landing */
app.get("/", function(req, res) {

    res.render("landing");
});

app.get("/profile/:id",function(req, res) {
     if (req.session.user) {
         client.execute("SELECT * FROM kmd_rating.ratings WHERE student_id='"+req.session.user+"' ALLOW FILTERING",function(err, result) {
             if(!err){
                  res.render("profile",{result:result})
             }else{
                 console.log(err);
             }
         })
       
    }
    else {
        res.redirect("/login")
    }
})
/* *************************************************** */
/* login 
1. Admin Login => if username and pass is from admin then open route for /addstudents, /addcourses 
2. Student Login => if from student then open route for /courses, /courses/:id get, /courses/:id post
*/
var triedLogin = false;
app.get("/login", function(req, res) {
    if (req.session.user == "admin") {
        res.redirect("/adminhome");
    }
    else {
        res.render("login", { triedLogin: triedLogin });
    }


})

app.post("/login", function(req, res) {

    client.execute("SELECT * FROM kmd_rating.admins WHERE admin_username='" + req.body.username + "'AND admin_password='" + req.body.password + "' ALLOW FILTERING",
        function(err, result) {
            if (!err) {

                if (result.rowLength == 1) {
                    req.session.user = "admin";
                    console.log(req.session.user)
                    res.redirect("/adminhome")
                }
                else {

                    client.execute("SELECT * FROM kmd_rating.students WHERE student_id='" + req.body.username + "'AND student_password='" + req.body.password + "'ALLOW FILTERING",
                        function(err, result) {
                            if (!err) {

                                if (result.rowLength == 1) {
                                    req.session.user = req.body.username;
                                    console.log(req.session.user)
                                    res.redirect("/courses")
                                }
                                else {
                                    triedLogin = true;
                                    res.redirect("/login");
                                }
                            }
                            else {
                                console.log(err);
                            }
                        }
                    )

                }
            }
            else {
                console.log(err);
            }
        })






})
app.get("/logout", function(req, res) {
    req.session.destroy();
    triedLogin = false;
    res.redirect("/login")
})

/* *************************************************** */
/* admin home page */
app.get("/adminhome", function(req, res) {
    if (req.session.user) {
        res.render("adminhome")
    }
    else {
        res.redirect("/login")
    }
})
/* *************************************************** */
/* student crud page */
var tried = false;
app.get("/studentcrud", function(req, res) {
    if (req.session.user) {

        client
            .execute("SELECT * FROM kmd_rating.students",
                function(err, result) {
                    if (!err) {

                        res.render("studentcrud", { result: result, tried: tried })
                    }
                    else {
                        console.log(err);
                    }
                })
    }
    else {
        res.redirect("/login")
    }
})

app.post("/studentcrud", function(req, res) {
    if (typeof(req.body.add_admin) != 'undefined') {

        var studentid = req.body.admin_username;
        var studentpass = req.body.admin_pass;

        client
            .execute("INSERT INTO kmd_rating.students (student_id,student_password) VALUES ('" + studentid + "','" + studentpass + "')",
                function(err, result) {

                    if (!err) {
                        tried = false;
                        res.redirect("/studentcrud")
                    }

                    else {
                        tried = true;
                        res.redirect("/studentcrud")

                    }
                })
    }

    if (typeof(req.body.update_admin) != 'undefined') {
        var studentid = req.body.admin_username;
        var studentpass = req.body.admin_new_pass;

        client
            .execute("UPDATE kmd_rating.students SET student_password='" + studentpass + "' WHERE student_id='" + studentid + "'",
                function(err, result) {

                    if (!err) {
                        tried = false;
                        res.redirect("/studentcrud")
                    }

                    else {
                        console.log(err);
                        tried = true;
                        res.redirect("/studentcrud")

                    }
                })
    }
    if (typeof(req.body.delete_admin) != 'undefined') {
        var studentid = req.body.admin_username;
        console.log(studentid)
        client
            .execute("DELETE FROM kmd_rating.students WHERE student_id='" + studentid + "'",
                function(err, result) {

                    if (!err) {
                        tried = false;
                        res.redirect("/studentcrud")
                    }

                    else {
                        tried = true;
                        res.redirect("/studentcrud")

                    }
                })
    }



})
/* *************************************************** */
/* course crud page */
var tried = false;
app.get("/coursecrud", function(req, res) {
    if (req.session.user) {

        client
            .execute("SELECT * FROM kmd_rating.courses",
                function(err, result) {
                    if (!err) {

                        res.render("coursecrud", { result: result, tried: tried })
                    }
                    else {
                        console.log(err);
                    }
                })
    }
    else {
        res.redirect("/login")
    }
})
app.post("/coursecrud", function(req, res) {
    if (typeof(req.body.add_admin) != 'undefined') {

        var courseid = req.body.admin_username;
        var coursename = req.body.admin_pass;

        client
            .execute("INSERT INTO kmd_rating.courses (course_id,course_name) VALUES ('" + courseid + "','" + coursename + "')",
                function(err, result) {

                    if (!err) {
                        tried = false;
                        res.redirect("/coursecrud")
                    }

                    else {
                        console.log(err);
                        tried = true;
                        res.redirect("/coursecrud")

                    }
                })
    }

    if (typeof(req.body.update_admin) != 'undefined') {
        var courseid = req.body.admin_username;
        var coursename = req.body.admin_new_pass;

        client
            .execute("UPDATE kmd_rating.courses SET course_name='" + coursename + "' WHERE course_id='" + courseid + "'",
                function(err, result) {

                    if (!err) {
                        tried = false;
                        res.redirect("/coursecrud")
                    }

                    else {
                        console.log(err);
                        tried = true;
                        res.redirect("/coursecrud")

                    }
                })
    }
    if (typeof(req.body.delete_admin) != 'undefined') {
        var courseid = req.body.admin_username;
        client
            .execute("DELETE FROM kmd_rating.courses WHERE course_id='" + courseid + "' IF EXISTS; ",
                function(err, result) {

                    if (!err) {
                        tried = false;
                        res.redirect("/coursecrud")
                    }

                    else {
                        console.log(err);
                        tried = true;
                        res.redirect("/coursecrud")

                    }
                })
    }



})
/* *************************************************** */
app.get("/courses", function(req, res) {



    if (req.session.user) {
        //select from search
        if (typeof(req.query.q) != "undefined") {

            client.execute("SELECT * FROM kmd_rating.courses WHERE course_id='" + req.query.q + "'", function(err, result) {
                if (!err) {

                    res.render("courses", { result: result })
                }
                else {
                    res.redirect("/courses")
                    console.log(err);
                }
            })

        }
        else { //Select from all

            client.execute("SELECT * FROM kmd_rating.courses LIMIT 500", function(err, result) {
                if (!err) {

                    res.render("courses", { result: result })
                }
                else {
                    res.redirect("/courses")
                    console.log(err);
                }

            })

        }

    }
    else {
        res.redirect("/login")
    }

})

var triedFeedback=false;
app.get("/courses/:id",function(req, res) {
    if(req.session.user){
           var courseid=req.params.id;
           var semester;
           var academicyear;
           var studentid;
           client.execute("SELECT * FROM kmd_rating.courses WHERE course_id='"+courseid+"'",function(err, result) {
               if(!err){
                   res.render("rate",{result:result,
                       
                       triedFeedback:triedFeedback
                   })
               }else{
                   
               }
              
           })
    }else{
        res.redirect("/login")
    }

})
app.post("/courses/:id",function(req, res) {
  var courseid= req.params.id, 
  semester=req.body.semester, 
  academicyear=req.body.academicyear, 
  studentid=req.session.user, 
  courselecturer=req.body.lecturer, 
  coursename=req.body.coursename, 
  feedback=req.body.feedback, 
  rating=req.body.rating, 
  studentemail=req.body.studentemail;
  
  client.execute("INSERT INTO kmd_rating.ratings (course_code, semester, academic_year, student_id, course_lecturer, course_name, feedback, rating, student_email) VALUES ('"+courseid+"','"+semester+"','"+academicyear+"','"+studentid+"','"+courselecturer+"','"+coursename+"','"+feedback+"',"+rating+",'"+studentemail+"')",function(err, result) {
      if(!err){
          console.log(result);
          res.redirect("/thankyou")
      }
      else{
          triedFeedback=true;
          res.redirect("/courses/"+courseid)
          console.log(err);
      }
  })
})

app.get("/thankyou",function(req, res) {
    res.render("thankyou")
})
/* *************************************************** */
app.listen(80, process.env.IP, function() {
    console.log("Server has Started!!!");
});
