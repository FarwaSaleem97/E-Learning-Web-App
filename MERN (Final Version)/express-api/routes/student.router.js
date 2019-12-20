const express = require('express');

function router(Course, Progress) {

    const studentRouter = express.Router();

    studentRouter.route('/courses').get((req, res) => {
        Course.find().sort({ "number": 1 }).exec((err, courses) => {
            if (err) {
                res.status(400).json({ message: `Following error was encountered: ${err}` });
            }
            else {
                res.status(200).json(courses);
            }
        });
    });

    studentRouter.route('/courses/watch/:id').get((req, res) => {
        let id = req.params.id;
        Course.findById(id, (err, course) => {
            if (err) {
                res.status(400).json({ message: `Following error was encountered: ${err}` });
            }
            else {
                res.status(200).json(course.url);
            }
        });
    });

    studentRouter.route('/markprogress').post((req, res) => {
        let progress = new Progress(req.body);
        progress.save().then(() => {
            res.status(200).json({ message: 'Course successfully marked as complete.' });
        }).catch((err) => {
            res.status(400).json({ message: err });
        });
    });

    studentRouter.route('/checkprogress').post((req, res) => {
        const studentID = req.body.studentID;
        const courseID = req.body.courseID;
        const query = Progress.findOne({studentID, courseID});
        query.exec((err, result) => {
            res.json({message: result});
        });
    });

    return studentRouter;

};

module.exports = router;