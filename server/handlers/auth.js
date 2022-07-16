const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { models } = require('../../storage/definers');

async function login(req, res) {
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
    const accessToken = jwt.sign({ userId, userEmail }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED || 900
    });
    const refreshToken = jwt.sign({ userId, userEmail }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRED || 604800
    });

    await models.auth.upsert({ user_id: userId, refresh_token: refreshToken }, {
        where: {
            user_id: userId
        }
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: process.env.REFRESH_TOKEN_EXPIRED || 604800
    });
    res.json({ accessToken });
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
        const accessToken = jwt.sign({ userId, userEmail }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        res.json({ accessToken });
    });
}

async function Logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await models.auth.findAll({ 
            where: {
                refresh_token: refreshToken 
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id;
        await user.destroy({refresh_token: null},{
            where: {
                id:userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}

module.exports = {
    login,
    refreshAccessToken,
};