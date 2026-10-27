const Alumni = require("../../../database/models/alumni");

/*
 * API endpoint to return all alumni.
 */
const getAll = async (req, res) => {
  try {
    const alumniRecords = await Alumni.find().lean();

    const alumni = alumniRecords.map((alumnus) => {
      /*
       * Some older MongoDB records may not
       * contain all nested objects.
       *
       * Normalize them here so one incomplete
       * record cannot break the entire API.
       */
      const acknowledgements = alumnus.acknowledgements || {};

      const socials = alumnus.socials || {};

      const currentPosition = alumnus.currentPosition || {};

      return {
        _id: alumnus._id,

        name: alumnus.preferredName || alumnus.name || "",

        preferredName: alumnus.preferredName || "",

        position: alumnus.position || "",

        supervisor: alumnus.supervisor || "",

        bio: alumnus.bio || "",

        startAndEndYear: alumnus.startAndEndYear || "",

        acknowledgements: {
          awards: acknowledgements.awards || "",

          conferences: acknowledgements.conferences || "",

          posters: acknowledgements.posters || "",

          presentations: acknowledgements.presentations || "",

          publications: acknowledgements.publications || "",

          otherAccomplishments: acknowledgements.otherAccomplishments || "",
        },

        /*
         * Keep socials nested because the
         * updated frontend uses:
         *
         * alumnus.socials.linkedIn
         */
        socials: {
          twitter: socials.twitter || "",

          bluesky: socials.bluesky || "",

          linkedIn: socials.linkedIn || "",
        },

        /*
         * Keep these top-level fields too
         * for backward compatibility with
         * older frontend components.
         */
        twitter: socials.twitter || "",

        linkedIn: socials.linkedIn || "",

        image: alumnus.image || "",

        awardsPostBHK: alumnus.awardsPostBHK || "",

        currentPosition: {
          company: currentPosition.company || "",

          title: currentPosition.title || "",

          industry: currentPosition.industry || "",

          location: currentPosition.location || "",

          description: currentPosition.description || "",
        },
      };
    });

    return res.status(200).json({
      alumni,
    });
  } catch (error) {
    console.error("Error retrieving alumni:", error);

    return res.status(500).json({
      alumni: [],
      error: "Unable to retrieve alumni.",
    });
  }
};

module.exports = {
  getAll,
};
