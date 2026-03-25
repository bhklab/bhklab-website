// /**
//  * Script used to restore database data from backup data files.
//  */

// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "../../.env") });
// const mongoose = require("mongoose");
// const fs = require("fs");

// const Award = require("../models/award");
// const Conference = require("../models/conference");
// const Dataset = require("../models/dataset");
// const Grant = require("../models/grant");
// const Index = require("../models");
// const Memberproject = require("../models/memberproject");
// const Member = require("../models/member");
// const News = require("../models/news");
// const Otheraccom = require("../models/otheraccom");
// const Poster = require("../models/poster");
// const Project = require("../models/project");
// const Presentation = require("../models/presentation");
// const Publication = require("../models/publication");
// const Research = require("../models/research");
// const Social = require("../models/social");
// const Supervision = require("../models/supervision");
// const bcrypt = require("bcrypt");

// // const restore = async (file, Model) => {
// //     await Model.deleteMany();
// //     let data = fs.readFileSync(file);
// //     data = JSON.parse(data);
// //     data = data.map((item) => ({
// //         ...item,
// //         _id: mongoose.Types.ObjectId(item._id),
// //     }));
// //     await Model.insertMany(data);
// // };

// // (async () => {
// //     try {
// //         await mongoose.connect(process.env.DEV, {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //         });
// //         console.log("connection open");
// //
// //         //
// //         let projects = await Project.find().populate('grant').lean();
// //
// //
// //         let result = []
// //         projects.map(item => {
// //             result.push({
// //                 title: item.title,
// //                 researchArea: item.researchArea,
// //                 status: item.status,
// //                 grant: item.grant? item.grant.name: "N/A",
// //                 grant_status: item.grant?item.grant.status: "N/A",
// //                 grant_deadline: item.grant?item.grant.deadline: "N/A"
// //             })
// //             }
// //         )
// //         console.log();
// //         fs.writeFileSync("./data/misc.json", JSON.stringify(result, null, 2));
// //
// //     } catch (err) {
// //         console.log(err);
// //     } finally {
// //         await mongoose.connection.close();
// //         console.log("connection closed");
// //     }
// // })();

// // (async () => {
// //     try {
// //         await mongoose.connect(process.env.DEV, {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //         });
// //         console.log("connection open");
// //
// //         //
// //         let member= await Member.find().lean();
// //
// //         let result = []
// //         member.map(item => {
// //             result.push({
// //                 ...item,
// //                 "slug": item.name.toLowerCase().split(" ").join("_")
// //             })
// //         })
// //
// //         fs.writeFileSync("./data/misc.json", JSON.stringify(result, null, 2));
// //
// //     } catch (err) {
// //         console.log(err);
// //     } finally {
// //         await mongoose.connection.close();
// //         console.log("connection closed");
// //     }
// // })();


// (async () => {
//     //manually encrypting password for
//     const saltRounds = 10; // set 10 based on documentation
//     const stringToEncrypt = "";
//     try {
//         const hashed = await bcrypt.hash(stringToEncrypt, saltRounds);
//         console.log(hashed)
//     } catch (err) {
//         console.log(err);
//     } finally {
//     }
// })();
