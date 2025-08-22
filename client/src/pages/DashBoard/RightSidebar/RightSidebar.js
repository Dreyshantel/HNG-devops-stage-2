import React from "react";
import SideCalender from "../../../components/Calender/SideCalender";
import UpcomingEvents from "./UpcommingEvents/UpcomingEvents";
import PersonIcon from "@material-ui/icons/Person";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BookIcon from "@material-ui/icons/Book";
import { Typography } from "@material-ui/core";

const RightSidebar = () => {
  return (
    <div>
        <div className="mb-4 rounded shadow" style={{backgroundColor:"white",padding:"10px"}}>
      <Typography variant="h6" className="p-3">Upcoming Department Events</Typography>
      <Typography variant="body2" style={{ 
        color: '#666', 
        padding: '0 12px 12px 12px',
        fontStyle: 'italic',
        fontSize: '0.875rem'
      }}>
        Software Engineering Department Activities
      </Typography>

      <UpcomingEvents
        Icon={QuestionAnswer}
        title="Software Architecture Quiz"
        time="Tomorrow, 10:00 AM"
      />
      <UpcomingEvents
        Icon={AssignmentIcon}
        title="Web Development Workshop"
        time="Friday, 2:00 PM"
      />
      <UpcomingEvents
        Icon={BookIcon}
        title="Mobile App Development Seminar"
        time="Monday, 1:00 PM"
      />
      <UpcomingEvents
        Icon={QuestionAnswer}
        title="Data Structures Quiz"
        time="Wednesday, 11:00 AM"
      />
      <UpcomingEvents
        Icon={AssignmentIcon}
        title="Software Testing Workshop"
        time="Thursday, 3:00 PM"
      />
      </div>
      <SideCalender />
    </div>
  );
};

export default RightSidebar;
