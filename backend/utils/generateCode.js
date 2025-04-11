// utils/generateCode.js

/**
 * توليد كود تحقق مكوّن من أرقام عشوائية
 * @param {number} length - عدد الأرقام في الكود (الافتراضي: 6)
 * @returns {string} كود تحقق مكوّن من أرقام
 */
function generateVerificationCode(length = 6) {
    const digits = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      code += digits[randomIndex];
    }
    return code;
  }
  
  module.exports = generateVerificationCode;