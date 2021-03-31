import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CakeIcon from '@material-ui/icons/Cake';
import CheckIcon from '@material-ui/icons/Check';
import FaceIcon from '@material-ui/icons/Face';
import WcIcon from '@material-ui/icons/Wc';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Progress } from 'antd';
import React from 'react';
import "./style.scss";

function Profile(props) {
  const { student, schedule } = props;
  const speciality = (() => {
    let slice = student.studentCode.slice(0, 2);
    switch (slice) {
      case "AT": return "An toàn thông tin"
      case "CT": return "Công nghệ thông tin"
      case "DT": return "Điện tử viễn thông"
      default: return "-"
    }
  })()
  const progress = (() => {
    let passed = 0;
    schedule.forEach(item => {
      let date = item.day.split("/").map(i => +i);
      date = new Date(date[2], date[1] - 1, date[0]).getTime();
      const now = new Date().getTime();
      if (now - date > 0) passed++;
    })
    return ((passed / schedule.length) * 100).toFixed(0);
  })()

  return (
    <div className="Profile">
      <table>
        <tr>
          <th className="Profile_card-key"><FaceIcon /> Họ tên</th>
          <th className="Profile_card-value">{student.displayName}</th>
        </tr>
        <tr>
          <th className="Profile_card-key"><WcIcon /> Giới tính</th>
          <th className="Profile_card-value">{student.gender}</th>
        </tr>
        <tr>
          <th className="Profile_card-key"><CakeIcon /> Ngày sinh</th>
          <th className="Profile_card-value">{student.birthday}</th>
        </tr>
        <tr>
          <th className="Profile_card-key"><AssignmentIndIcon /> Mã sinh viên</th>
          <th className="Profile_card-value">{student.studentCode}</th>
        </tr>
        <tr>
          <th className="Profile_card-key"><WorkOutlineIcon /> Chuyên ngành</th>
          <th className="Profile_card-value">{speciality}</th>
        </tr>
        <tr>
          <th className="Profile_card-key"><CheckIcon /> Tiến độ chương trình</th>
          <th className="Profile_card-value">
            <Progress type="circle" percent={progress} strokeColor={"#1ED760"} />
          </th>
        </tr>
      </table>

    </div >
  );
}

export default Profile;