"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toast from "react-hot-toast";
import { initialDateRange } from "./PropertySidebarInput";

type CalendarProps = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  disabled?: boolean;
};

const Calendar = ({
  value,
  onChange,
  disabledDates,
  disabled,
}: CalendarProps) => {
  return (
    <div className="relative">
      <DateRange
        onChange={onChange}
        disabledDates={disabledDates}
        ranges={disabled ? [initialDateRange] : [value]}
        rangeColors={["#2f9e44"]}
        direction="vertical"
        minDate={new Date()}
      />
      {disabled && (
        <div className="absolute z-10 cursor-not-allowed top-0 right-0 left-0 bottom-0"></div>
      )}
    </div>
  );
};
export default Calendar;
