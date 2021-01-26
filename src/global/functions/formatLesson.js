function formatLessons(lessons, option) {
  lessons = lessons.split(",");
  let from, to;
  switch (lessons[0]) {
    case "1": {
      from = "7h";
      break;
    }
    case "4": {
      from = "9h35";
      break;
    }
    case "7": {
      from = "12h30";
      break;
    }
    case "10": {
      from = "15h05";
      break;
    }
    case "13": {
      from = "18h";
      break;
    }
    default: break;
  }
  switch (lessons[2]) {
    case "3": {
      to = "9h25";
      break;
    }
    case "6": {
      to = "12h";
      break;
    }
    case "9": {
      to = "14h55";
      break;
    }
    case "12": {
      to = "17h30";
      break;
    }
    case "15": {
      to = "21h20";
      break;
    }

    default: break;
  }
  if (option === 1) return (`${from}=>${to}`);
  else return [from, to];
};

export default formatLessons;