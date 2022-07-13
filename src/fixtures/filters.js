import moment from "moment";

export const userFilters = {
  text: "",
  contactNumber: "",
  emailId: "",
  currentPlanId: "", // using dropdown
  userAccountStatus: "active", //active or inactive
  isDue: null,
  sortBy: "dueDateAsc",
  startDate: moment().startOf("month").valueOf(),
  endDate: moment().endOf("month").valueOf(),
};

export const planFilters = {
  text: "",
  price: 0,
  planStatus: "active",
  validityPeriod: 0,
  startDate: moment().startOf("month").valueOf(),
  endDate: moment().endOf("month").valueOf(),
  sortBy: "priceAsc",
};
