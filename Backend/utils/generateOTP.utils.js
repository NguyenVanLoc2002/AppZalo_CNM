const otpGenerator = require("otp-generator");
const { TOTP } = require("totp-generator");
require("dotenv").config();

exports.generatorOTP = async () => {
  const otp = await otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialCharacters: false,
  });

  return otp;
};

exports.generatorTOTP = async () => {
  const totp = TOTP.generate(process.env.TOTP_SECRET,{
    digits: 6,
    period: 60
  });

  return totp;
};



