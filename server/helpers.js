function getIdParam(req) {
    const id = req.params.id;
    if (/^\d+$/.test(id)) {
        return Number.parseInt(id, 10);
    }
    throw new TypeError(`Invalid ':id' param: "${id}"`);
}

function getUserIdParam(req) {
    const id = req.params.userId;
    if (/^\d+$/.test(id)) {
        return Number.parseInt(id, 10);
    }
    throw new TypeError(`Invalid ':userId' param: "${id}"`);
}

function checkError(handler) {
    return function (req, res, next) {
        handler(req, res).catch(next)
    };
}

module.exports = { getIdParam, getUserIdParam, checkError };