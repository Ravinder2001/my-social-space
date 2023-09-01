import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { makeStyles, Theme } from "@material-ui/core/styles";
import moment from "moment";
const useStyles = makeStyles((theme: Theme) => ({
  dateTimePicker: {
    width: 220,
    fontSize: "10px",
  },
}));
function DateAndTimePicker() {
  const [myDate, setmyDate] = useState();
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDateTimePicker
        // key={`dateTime-${tz}`}
        // className={classes.dateTimePicker}
        label="Start Time"
        value={myDate}
        format="YYYY-MM-DD hh:mm A"
        onChange={() => {}}
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateAndTimePicker;
