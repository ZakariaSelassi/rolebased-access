
const bcrypt = require('bcrypt')

const validatePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash)
    return result
}

module.exports = validatePassword;