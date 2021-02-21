import DashBoardContent from "components/DashBoardContent";
import DashBoardHeader from "components/DashBoardHeader";
import DashBoardNavigation from "components/DashBoardNavigation";
import authenticateToken from "global/functions/authenticateToken";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_SCHEDULE, SET_STUDENT_PROFILE } from "store/slice";


function DashBoardPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = authenticateToken(token); // undefined or string
    if (decoded) {
      dispatch(SET_STUDENT_PROFILE({ studentProfile: decoded.studentProfile }));
      dispatch(SET_SCHEDULE({ schedule: decoded.schedule }));
    }
  }, [dispatch])
  return (
    <div className="DashBoardPage">
      <DashBoardNavigation />
      <DashBoardHeader />
      <DashBoardContent />
    </div>
  );
}

export default DashBoardPage;