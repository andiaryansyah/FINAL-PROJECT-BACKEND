const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { models } = require('../../storage/definers');

async function login(req, res) {
    try {
    const user = await models.user.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) res.status(401).json({ error: "unauthorized" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ error: "unauthorized" });

    const userId = user.id;
    const userEmail = user.email;
    const userName = user.name;
    const accessToken = jwt.sign({ userId, userEmail, userName }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED || 900
    });
    const refreshToken = jwt.sign({ userId, userEmail, userName }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRED || 604800
    });

    await models.auth.upsert({ user_id: userId, refresh_token: refreshToken }, {
        where: {
            user_id: userId
        }
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: false,
        maxAge: process.env.REFRESH_TOKEN_EXPIRED || 604800
    });
    res.json({ accessToken });
    }
    catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"})
    }
}


async function refreshAccessToken(req, res) {
    const { id, refreshToken } = req.body;
    if (!refreshToken || !id) return res.status(401).json({ error: "unauthorized" });
    var userAuth = await models.auth.findOne({
        where: {
            user_id: id,
            refresh_token: refreshToken
        }
    });
    if (!userAuth) return res.status(403).json({ error: "not allowed" });

    const user = await models.user.findOne({
        where: {
            id: id,
        }
    });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "not allowed" });

        const userId = user.id;
        const userEmail = user.email;
        const userName = user.name;
    const accessToken = jwt.sign({ userId, userEmail,userName }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        res.json({ accessToken });
    });
}

module.exports = {
    login,
    refreshAccessToken,
    Logout
};