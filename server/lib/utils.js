const generateDate = () => {
     const date = new Date();
     let day = date.getDate();
     let month = date.getMonth() + 1;
     let year = date.getFullYear();
     let finalDate = `${day}/${month}/${year}`;
     return finalDate;
}

module.exports = generateDate