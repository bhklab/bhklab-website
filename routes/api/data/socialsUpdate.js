const Social = require('../../../database/models/social');
const mongoose = require('mongoose');

const updateSocials = async (req, res) => {
    const { twitter, linkedin, bluesky, password } = req.body;

    // Check password against environment variable
    if (password !== process.env.SOCIALS_UPDATE_PASSWORD) {
        return res.status(401).json({ message: 'Incorrect password.' });
    }

    try {
        // Update twitter if non-empty
        if (twitter && twitter.trim()) {
            await Social.findOneAndUpdate(
                { platform: 'twitter' },
                { platform: 'twitter', url: twitter },
                { upsert: true, new: true }
            );
        }

        // Update linkedin if non-empty
        if (linkedin && linkedin.trim()) {
            await Social.findOneAndUpdate(
                { platform: 'linkedin' },
                { platform: 'linkedin', url: linkedin },
                { upsert: true, new: true }
            );
        }

        // Update bluesky if non-empty — validate and extract profile/post id
        if (bluesky && bluesky.trim()) {
            const trimmed = bluesky.trim();
            // expected: https://bsky.app/profile/<profile>/post/<postId>
            const bsRegex = /^https?:\/\/(?:www\.)?bsky\.app\/profile\/([^\/]+)\/post\/([^\/]+)\/?$/i;
            const match = trimmed.match(bsRegex);
            if (!match) {
                return res.status(400).json({ message: 'Invalid Bluesky URL format. Use: https://bsky.app/profile/{profile}/post/{postId}' });
            }

            const profile = match[1];
            const postId = match[2];

            await Social.findOneAndUpdate(
                { platform: 'bluesky' },
                { platform: 'bluesky', url: trimmed, credentials: profile, id: postId },
                { upsert: true, new: true }
            );
        }

        res.status(200).json({ message: 'Social media links updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating social media links.' });
    }
};

module.exports = { updateSocials };
