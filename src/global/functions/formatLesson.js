function formatLessons(lessons, option) {
  lessons = lessons.split(",");
  let from, to;
  switch (lessons[0]) {
    case "1": {
      from = "07:00";
      break;
    }
    case "4": {
      from = "09:35";
      break;
    }
    case "7": {
      from = "12:30";
      break;
    }
    case "10": {
      from = "15:05";
      break;
    }
    case "13": {
      from = "18:00";
      break;
    }
    default: break;
  }
  switch (lessons[2]) {
    case "3": {
      to = "09:25";
      break;
    }
    case "6": {
      to = "12:00";
      break;
    }
    case "9": {
      to = "14:55";
      break;
    }
    case "12": {
      to = "17:30";
      break;
    }
    case "15": {
      to = "21:20";
      break;
    }

    default: break;
  }
  if (option === 1) return (`${from}→${to}`);
  else return [from, to];
};

export default formatLessons;