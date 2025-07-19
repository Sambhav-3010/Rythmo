const isListener = (req, res, next) => {
    if(req.user && req.user.userType === 'listener'){
        return next();
    }
    return res.status(403).json({ error: 'Access denied. Listener only.' });
}

module.exports = isListener;