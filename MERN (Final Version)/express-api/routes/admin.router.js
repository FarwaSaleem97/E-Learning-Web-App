const express = require('express');

function router(Course) {

    const adminRouter = express.Router();

    adminRouter.route('/courses').get((req, res) => {
        Course.find((err, courses) => {
            if (err) {
                res.status(400).json({ message: `Following error was encountered: ${err}` });
            }
            else {
                res.status(200).json(courses);
            }
        }).sort({ "number": 1 });
    });

    adminRouter.route('/courses/preview/:id').get((req, res) => {
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

    adminRouter.route('/courses/create').post((req, res) => {
        let course = new Course(req.body);
        course.save().then(() => {
            res.status(200).json({ message: 'Course Saved' });
        }).catch((err) => {
            res.status(400).json({ message: 'Error Saving' });
        });
    });

    adminRouter.route('/courses/edit/:id').get((req, res) => {
        let id = req.params.id;
        Course.findById(id, (err, course) => {
            if (err) {
                res.status(400).json({ message: `Following error was encountered: ${err}` });
            }
            else {
                res.status(200).json(course);
            }
        });
    });

    adminRouter.route('/courses/edit/:id').put((req, res) => {
        let id = req.params.id;
        Course.findById(id, (err, course) => {
            if (err) {
                res.status(400).json({ message: `Following error was encountered: ${err}` });
            }
            else if (!course) {
                res.status(400).json({ message: 'Course not found.' });
            }
            else {
                course.number = req.body.number;
                course.title = req.body.title;
                course.description = req.body.description;
                course.path = req.body.path;
                course.type = req.body.type;
                course.url = req.body.url;
                course.demoURL = req.body.demoURL;
                course.lengthHours = req.body.lengthHours;
                course.lengthMinutes = req.body.lengthMinutes;
                course.save().then(()=> {
                    res.json({ message: 'Course Updated' });
                }).catch((err) => {
                    res.status(400).json({ message: `Following error was encountered: ${err}`});
                });
            }
        });
    });

    adminRouter.route('/courses/delete/:id').delete((req, res) => {
        let id = req.params.id;
        Course.findByIdAndRemove(id, { useFindAndModify: false },  (err) => {
            if (err) {
                res.status(400).json({ message: `Following error was encountered: ${err}` });
            }
            else {
                res.status(200).json({ message: 'Course Deleted' });
            }
        });
    });

    return adminRouter;

};

module.exports = router;