import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { Dispatch, SetStateAction } from "react";
import { Moment } from "moment";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const useStyles = makeStyles((theme: Theme) => ({
  dateTimePicker: {
    width: 220,
    fontSize: "10px",
  },
}));

type Props = {
  value: Moment;
  setTime: Dispatch<SetStateAction<Moment>>;
};

function DateAndTimePicker(props: Props) {
  const { value, setTime } = props;
  const classes = useStyles();

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date !== null) {
      setTime(date as Moment);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDateTimePicker
        className={classes.dateTimePicker}
        label="Start Time"
        value={value}
        format="YYYY-MM-DD hh:mm A"
        onChange={handleDateChange}
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateAndTimePicker;
