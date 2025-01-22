const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).send("Logged out")
}
module.exports = logout