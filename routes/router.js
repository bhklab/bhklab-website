const express = require('express');
const router = express.Router();

// paths
const dataset = require('./api/data/dataset');
const member = require('./api/data/member');
const presentation = require('./api/data/presentation');
const project = require('./api/data/project');
const publication = require('./api/data/publication');
const social = require('./api/data/social');
const email = require('./api/mail/sendGrid');
const positions = require('./api/data/positions');
const research = require('./api/data/research');
const auth = require('./api/admin/auth');
const admin = require('./api/admin/admin');


// data routes
router.get('/data/datasets', dataset.getAll);
router.post('/data/datasets/deleteOne/:id', dataset.deleteOne);
router.get('/data/members', member.getAll);
router.get('/data/member/:token', member.getOne);
router.post('/data/members/deleteOne/:id', member.deleteOne);
router.get('/data/positions', positions.getAll);
router.post('/data/positions/deleteOne/:id', positions.deleteOne);
router.get('/data/presentations', presentation.getAll);
router.get('/data/projects', project.getAll);
router.get('/data/publications', publication.getAll);
router.post('/data/publications/deleteOne/:id', publication.deleteOne);
router.get('/data/researches', research.getAll);
router.get('/data/researches/:token', research.getOne);
router.post('/data/researches/deleteOne/:id', research.deleteOne);
router.get('/data/socials', social.getAll);
router.post('/data/socials/deleteOne/:id', social.deleteOne);

router.post('/mail/send', email.sendEmail );

// admin authentication and management
router.post('/admin/login', admin.submit);
router.get('/admin/logout', admin.logout);
router.get('/admin/session', auth.verifyToken, admin.getSession);
// router.post('/admin/signup', admin.signup);

module.exports = router;
