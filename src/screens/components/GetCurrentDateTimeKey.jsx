const getCurrentDateTimeKey = () => {
    const now = new Date();
    return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  };

  export default getCurrentDateTimeKey