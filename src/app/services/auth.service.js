const userRepository = require('../repositories/user.repository');
const passwordUtil = require('../utils/password.util');
const tokenUtil = require('../utils/token.util');
const ApiError = require('../../core/errors/api-error');

module.exports = {
  async register(data) {
    const exists = await userRepository.findByEmail(data.email);
    if (exists) throw new ApiError('EMAIL_IN_USE', 409);

    data.password = await passwordUtil.hash(data.password);

    const user = await userRepository.create(data);
    return user;
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new ApiError('INVALID_CREDENTIALS', 401);

    const match = await passwordUtil.compare(password, user.password);
    if (!match) throw new ApiError('INVALID_CREDENTIALS', 401);

    return tokenUtil.generateTokens({ id: user._id, email });
  }
};
