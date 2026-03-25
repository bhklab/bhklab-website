const express = require("express");
const router = express.Router();

// paths
const dataset = require("./api/data/dataset");
const member = require("./api/data/member");
const preprint = require("./api/data/preprint");
const presentation = require("./api/data/presentation");
const publication = require("./api/data/publication");
const project = require("./api/data/project");
const social = require("./api/data/social");
const email = require("./api/mail/sendGrid");
const positions = require("./api/data/positions");
const research = require("./api/data/research");
const auth = require("./api/admin/auth");
// const admin = require("./api/admin/admin");
const alumni = require("./api/data/alumni");
const socialsupdate = require("./api/data/socialsUpdate");
const collaborations = require("./api/data/collaborations");

// data routes
router.get("/data/datasets", dataset.getAll);
router.post(
  "/data/datasets/deleteOne/:id",
  auth.verifyToken,
  dataset.deleteOne,
);

router.get("/data/members", member.getAll);
router.get("/data/member/:token", member.getOne);
router.post("/data/members/deleteOne/:id", auth.verifyToken, member.deleteOne);

router.get("/data/alumni", alumni.getAll);

router.get("/data/positions", positions.getAll);
router.post(
  "/data/positions/deleteOne/:id",
  auth.verifyToken,
  positions.deleteOne,
);

router.get("/data/preprints", preprint.getAll);

router.get("/data/presentations", presentation.getAll);
router.post(
  "/data/presentations/deleteOne/:id",
  auth.verifyToken,
  presentation.deleteOne,
);

router.get("/data/publications", publication.getAll);
router.post(
  "/data/publications/deleteOne/:id",
  auth.verifyToken,
  publication.deleteOne,
);

router.get("/data/projects", project.getAll);

router.get("/data/researches", research.getAll);
router.get("/data/researches/:token", research.getOne);
router.post(
  "/data/researches/deleteOne/:id",
  auth.verifyToken,
  research.deleteOne,
);

router.get("/data/socials", social.getAll);
router.post("/data/socials/deleteOne/:id", social.deleteOne);
router.post("/data/socialsUpdate", socialsupdate.updateSocials);

router.get("/data/collaborations", collaborations.getAll);

router.post("/mail/send", email.sendEmail);

// admin authentication and management
// router.post("/admin/login", admin.submit);
// router.get("/admin/logout", auth.verifyToken, admin.logout);
// router.get("/admin/session", auth.verifyToken, admin.getSession);

module.exports = router;
