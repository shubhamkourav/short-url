
const mongoose = require('mongoose');
const generateShortCode = require('../../utils/util');
const Shorten = mongoose.model('Shorten');

exports.create = async (req, res) => {
    const { url } = req.body;
    try {
        const existingShorten = await Shorten.findOne({ url });
        if (existingShorten) {
            return res.status(200).json(existingShorten);
        }

        const shortCode = generateShortCode();
        const newShorten = await Shorten.create({ url, shortCode });

        res.status(201).json(newShorten);
    } catch (error) {
        res.status(500).json({ error: "Failed to create shorten URL" });
    }
}

exports.get = async (req, res) => {
    const { shortCode } = req.params;
    const mode = req.query.mode;
    try {
        const shorten = await Shorten.findOne({ shortCode });
        if (!shorten) {
            return res.status(404).json({ error: "Shorten URL not found" });
        }
        if (mode && mode === 'edit') {
            return res.status(200).json(shorten);
        } else {
            shorten.views++;
            await shorten.save();
            res.redirect(shorten.url);
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to redirect to original URL" });
    }
}

exports.update = async (req, res) => {
    const { shortCode } = req.params;
    const { url } = req.body;
    try {
        const shorten = await Shorten.findOneAndUpdate({ shortCode }, { url }, { new: true });
        console.log("🚀 ~ exports.update= ~ shorten:", shorten)
        if (!shorten) {
            return res.status(404).json({ error: "Shorten URL not found" });
        }
        res.status(200).json(shorten);
    } catch (error) {
        res.status(500).json({ error: "Failed to update shorten URL" });
    }
}

exports.remove = async (req, res) => {
    const { shortCode } = req.params;
    try {
        const shorten = await Shorten.findOneAndDelete({ shortCode });
        if (!shorten) {
            return res.status(404).json({ error: "Shorten URL not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete shorten URL" });
    }
}
// pagination with list api sorting and calculate pages
exports.list = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = '-views' } = req.query;

        // Convert pagination and sorting parameters
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const data = await Shorten.find().sort(sort).skip((pageNumber - 1) * limitNumber).limit(limitNumber);

        const counts = await Shorten.countDocuments();
        const pages = Math.ceil(counts / limitNumber);

        res.json({
            total: counts,
            page: pageNumber,
            limit: limitNumber,
            pages,
            data
        });
        // Build search criteria
    } catch (error) {
        res.status(500).json({ error: "Failed to list shorten URLs" });
    }
}

exports.search = async (req, res) => {
    try {
        const { searchTerm } = req.query;

        const data = await Shorten.find({
            $text: { $search: searchTerm }
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to search shorten URLs" });
    }
}