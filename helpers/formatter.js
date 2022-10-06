const fs = require('fs');
const SESSIONS_FILE = './kontak.json';

const phoneNumberFormatter = function (number) {
  // 1. Menghilangkan karakter selain angka
  let formatted = number.replace(/\D/g, '');

  // 2. Menghilangkan angka 0 di depan (prefix)
  //    Kemudian diganti dengan 62
  if (formatted.startsWith('0')) {
    formatted = '234' + formatted.substr(1);
  }

  if (!formatted.endsWith('@c.us')) {
    formatted += '@c.us';
  }

  return formatted;
};

const saveAccountData = (data) => {
  const file = data;
  const saveFile = JSON.stringify(file);
  fs.writeFileSync(SESSIONS_FILE, saveFile, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully!');
    }
  });
};

const getAccountData = () => {
  try {
    var data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf-8'));
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  phoneNumberFormatter,
  saveAccountData,
  getAccountData,
};
