const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const PORT = 4000;

const Course = require('./models/course.model');
const Progress = require('./models/progress.model');

const adminRouter = require('./routes/admin.router')(Course);
const studentRouter = require('./routes/student.router')(Course, Progress);

const jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://stacklearner-test.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:4000',
  issuer: 'https://stacklearner-test.auth0.com/',
  algorithms: ['RS256']
});

function checkRole(role) {
    return function(req, res, next) {
        const assignedRoles = req.user["http://localhost:3000/roles"];
        if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
        return next();
        } else {
        return res.status(401).send("Insufficient role");
        }
    };
}

mongoose.connect('mongodb+srv://admin123:admin123@mydbs-x7zm0.mongodb.net/test?retryWrites=true&w=majority', {  useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Server successfully connected to MongoDB');
});

app.use(cors());
app.use(bodyParser.json());

app.use('/admin', jwtCheck, checkRole('admin'), adminRouter);
app.use('/student', jwtCheck, studentRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



