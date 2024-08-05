import moment from "moment/moment";

export const formatDateTime = (
  dateTimeString: string | null,
  format: string = "DD MMM YYYY"
) => {
  //{{ moment(bookingDetail.time, "HH:mm:ss").format("h:mm a") }}
  return dateTimeString
    ? moment(dateTimeString, "YYYY-MM-DDTHH:mm:ss.SSSSSSZ").format(format)
    : "";
  // return dateTimeString ? moment(dateTimeString).local().format(format) : ''
};
