/**
 * Script used to restore database data from backup data files.
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const fs = require("fs");

const Award = require("../models/award");
const Conference = require("../models/conference");
const Dataset = require("../models/dataset");
const Grant = require("../models/grant");
const Index = require("../models");
const Memberproject = require("../models/memberproject");
const Member = require("../models/member");
const News = require("../models/news");
const Otheraccom = require("../models/otheraccom");
const Poster = require("../models/poster");
const Position = require("../models/position");
const Project = require("../models/project");
const Presentation = require("../models/presentation");
const Publication = require("../models/publication");
const Research = require('../models/research');
const Social = require("../models/social");
const Supervision = require("../models/supervision");

const restore = async (file, Model) => {
    await Model.deleteMany();
    let data = fs.readFileSync(file);
    data = JSON.parse(data);
    data = data.map((item) => ({
        ...item,
        _id: mongoose.Types.ObjectId(item._id),
    }));
    await Model.insertMany(data);
};

(async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DEV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connection open");
        //
        // insert members
        await restore("./data/members.json", Member);
        console.log("members done");

        // insert news
        await restore("./data/news.json", News);
        console.log("news done");

        // insert awards
        await restore("./data/awards.json",Award );
        console.log("awards done");

        // insert conference
        await restore("./data/conferences.json", Conference);
        console.log("conference done");

        // insert poster
        await restore("./data/posters.json", Poster);
        console.log("poster done");

        //insert research
        await restore("./data/researches.json", Research);
        console.log("research done");

        // insert position
        await restore("./data/positions.json", Position);
        console.log("position done");

        // insert other accomplishments
        await restore("./data/otheraccoms.json", Otheraccom);
        console.log("otheraccoms done");

        // insert grants
        await restore("./data/grants.json", Grant);
        console.log("grants done");

        // insert datasets
        await restore("./data/datasets.json", Dataset);
        console.log("datasets done");

        // insert socials
        await restore("./data/socials.json", Social);
        console.log("socials done");

        // insert projects
        await restore("./data/projects.json", Project);
        console.log("projects done");

        // insert supervisions
        await restore("./data/supervisions.json", Supervision);
        console.log("supervisions done");

        // insert project indexes
        await restore("./data/indexes.json", Index);
        console.log("indexes done");

        // insert memberProject
        await restore("./data/memberprojects.json", Memberproject);
        console.log("memberprojects done");

        // // insert lab publications
        await restore("./data/publications.json", Publication);
        console.log("publications done");

        // // insert lab publications
        await restore("./data/presentations.json", Presentation);
        console.log("presentations done");


    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
        console.log("connection closed");
    }
})();
