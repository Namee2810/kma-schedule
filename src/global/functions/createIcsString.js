import formatLessons from "./formatLesson";
const BEGIN_CALENDAR = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:KMA Schedule (kma.namee.site)\r\nMETHOD:PUBLISH\r\nCALSCALE:GREGORIAN\r\n";
const END_CALENDAR = "END:VCALENDAR"

var EVENTS = "";

const createIcsString = (schedule) => {
  let uid = 0;
  schedule.forEach(item => {
    let today = formatDate(new Date());
    let [from, to] = formatLessons(item.lesson), day = item.day.split("/");
    day = `${day[1]}/${day[0]}/${day[2]}`;
    let begin = formatDate(new Date(`${day} ${from.replace("h", ":")}`)), end = formatDate(new Date(`${day} ${to.replace("h", ":")}`)),
      summary = item.subjectName, location = item.room,
      description = `Lớp: ${item.className}\nTiết: ${item.room}\nGiáo viên: ${item.teacher}`;
    let event = `BEGIN:VEVENT\r\nUID:kma_schedule ${uid}\r\nDTSTAMP:${today}\r\nDTSTART:${begin}\r\nDTEND:${end}\r\nSUMMARY:${summary}\r\nLOCATION:${location}\r\nDESCRIPTION:${description}\r\nEND:VEVENT\r\n`
    EVENTS += event;
    uid++;
  });
  let ics = BEGIN_CALENDAR + EVENTS + END_CALENDAR;
  return ics;
}

const formatDate = (date) => {
  let year = ("0000" + (date.getFullYear().toString())).slice(-4);
  let month = ("00" + ((date.getMonth() + 1).toString())).slice(-2);
  let day = ("00" + ((date.getDate()).toString())).slice(-2);
  let hours = ("00" + (date.getHours().toString())).slice(-2);
  let minutes = ("00" + (date.getMinutes().toString())).slice(-2);
  let seconds = ("00" + (date.getSeconds().toString())).slice(-2);

  let time = 'T' + hours + minutes + seconds;

  date = year + month + day + time;
  return date;
}

export default createIcsString;