const { User } = require("../../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  loginValidation,
  registerValidation,
} = require("../middlewares/validation");

const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);

    if (error) {
      errorResponse(res, 400, error.details[0].message);
    }

    const { email, password } = req.body;

    const userExist = await User.findOne({
      where: { email },
    });

    if (!userExist) {
      errorResponse(res, 400, "Wrong email or password");
    }

    const validPass = await bcrypt.compare(password, userExist.password);

    if (!validPass) {
      errorResponse(res, 400, "Wrong email or password");
    }

    const token = jwt.sign(
      {
        id: userExist.id,
      },
      process.env.JWT_SECRET_KEY
    );

    successResponse(res, 200, "Login Success", {
      email: userExist.email,
      token,
    });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

const register = async (req, res, next) => {
  try {
    const { error } = registerValidation(req.body);

    if (error) {
      errorResponse(res, 400, error.details[0].message);
    }

    const { email, password, fullName } = req.body;

    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist) {
      errorResponse(res, 400, "Email already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createData = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: createData.id,
      },
      process.env.JWT_SECRET_KEY
    );

    successResponse(res, 201, "User successfully created", { email, token });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

const checkAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    const userExist = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!userExist) {
      errorResponse(res, 400, "Login failed because wrong user");
    }

    const token = jwt.sign(
      {
        id: userExist.id,
      },
      process.env.JWT_SECRET_KEY
    );

    successResponse(res, 200, "Login success", {
      email: userExist.email,
      token,
    });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

module.exports = {
  login,
  register,
  checkAuth,
};
