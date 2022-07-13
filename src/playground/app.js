import moment from "moment";
import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";
import { users, plans } from "../fixtures/data";
import { userFilters, planFilters } from "../fixtures/filters";
import {
  getTotalPaymentReceivedToLastUsage,
  getUserFullName,
} from "../store/utility/utility";
//actions

//user actions
//ADD_USER
const addUser = ({
  firstName = "", // required
  middleName = "",
  lastName = "",
  emailId = "", // required
  contactNumber = "", // required
  address = "", // required
  status = "inactive", // required
  usages = [],
  createdAt = moment().valueOf(),
} = {}) => ({
  type: "ADD_USER",
  user: {
    id: uuid(),
    firstName: firstName.toLowerCase(),
    middleName: middleName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    emailId: emailId.toLowerCase(),
    contactNumber,
    address,
    status,
    usages,
    createdAt,
  },
});

//EDIT_USER
const editUser = ({ id = "", updates = {} } = {}) => {
  let userUpdates = {};

  if (updates.hasOwnProperty("firstName"))
    userUpdates = {
      ...userUpdates,
      firstName: updates.firstName.toLowerCase(),
    };
  if (updates.hasOwnProperty("middleName")) {
    userUpdates = {
      ...userUpdates,
      middleName: updates.middleName.toLowerCase(),
    };
  }
  if (updates.hasOwnProperty("lastName"))
    userUpdates = {
      ...userUpdates,
      lastName: updates.lastName.toLowerCase(),
    };
  if (updates.hasOwnProperty("emailId"))
    userUpdates = {
      ...userUpdates,
      emailId: updates.emailId.toLowerCase(),
    };
  if (updates.hasOwnProperty("status"))
    userUpdates = {
      ...userUpdates,
      status: updates.status.toLowerCase(),
    };

  return {
    type: "EDIT_USER",
    id,
    updates: { ...updates, ...userUpdates },
  };
};

//REMOVE_USER
const removeUser = ({ id = "" }) => ({
  type: "REMOVE_USER",
  id,
});
//ADD_USAGE
const addUsage = ({
  userId = "",
  planId = "", //required
  paymentDetails = [],
}) => {
  let userPaymentDetails = [];
  if (paymentDetails.length) {
    userPaymentDetails = paymentDetails.map((paymentDetail) => {
      if (paymentDetail.hasOwnProperty("paymentMethod")) {
        return {
          ...paymentDetail,
          paymentMethod: paymentDetail.paymentMethod.toLowerCase(),
        };
      } else return paymentDetail;
    });
  }

  return {
    type: "ADD_USAGE",
    userId,
    usage: {
      id: uuid(),
      planId,
      startedAt: moment().valueOf(),
      paymentDetails: userPaymentDetails,
    },
  };
};

//EDIT_USAGE // editUsage not allowed
//REMOVE_USAGE // removeUsage not allowed

// ADD_PAYMENT
const addPayment = ({ userId = "", usageId = "", paymentDetail = {} }) => {
  let userPaymentDetail = {};
  if (paymentDetail.hasOwnProperty("paymentMethod")) {
    userPaymentDetail = {
      ...paymentDetail,
      paymentMethod: paymentDetail.paymentMethod.toLowerCase(),
    };
  } else {
    // payment must have to have paymentMethod
  }

  return {
    type: "ADD_PAYMENT",
    userId,
    usageId,
    paymentDetail: {
      ...userPaymentDetail,
      id: uuid(),
      paidAt: moment().valueOf(),
    },
  };
};

// ----------- reducers ------------
// user reducer
// const userReducerDefaultState = new Array();
const userReducerDefaultState = new Array(...users);
const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.user];
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id === action.id) {
          return { ...user, ...action.updates };
        } else {
          return user;
        }
      });
    case "REMOVE_USER":
      return state.filter(({ id }) => id !== action.id);

    case "ADD_USAGE":
      return state.map((user) => {
        if (user.id === action.userId) {
          /* 
          TODO - add feature of override recharge, means additional usage addition
           even if current usage plan is not completed yet, override existing usage
           and somehow mark it as completed and add new one as current plan.
          */
          return { ...user, usages: user.usages.concat(action.usage) };
        } else return user;
      });

    //EDIT_USAGE is not allowed
    // case "EDIT_USAGE": return state;

    // REMOVE_USAGE is not allowed
    // case "REMOVE_USAGE": return state;

    case "ADD_PAYMENT":
      return state.map((user) => {
        if (user.id === action.userId) {
          const updatedUsages = user.usages.map((usage) => {
            if (usage.id === action.usageId) {
              return {
                ...usage,
                paymentDetails: usage.paymentDetails.concat(
                  action.paymentDetail
                ),
              };
            } else return usage;
          });

          return { ...user, usages: updatedUsages };
        } else return user;
      });

    default:
      return state;
  }
};

//#TODO
// +userFilter actions
// SET_USER_TEXT_FILTER
const setUserTextFilter = ({ text = "" } = {}) => ({
  type: "SET_USER_TEXT_FILTER",
  text,
});

// setContactNumberFilter
const setContactNumberFilter = ({ contactNumber = "" } = {}) => ({
  type: "SET_CONTACT_NUMBER_FILTER",
  contactNumber,
});

// setEmailIdFilter
const setEmailIdFilter = ({ emailId = "" } = {}) => ({
  type: "SET_EMAIL_ID_FILTER",
  emailId,
});

// setCurrentPlanIdFilter
const setCurrentPlanIdFilter = ({ currentPlanId = "" } = {}) => ({
  type: "SET_CURRENT_PLAN_ID_FILTER",
  currentPlanId,
});

// setUserAccountStatusFilter
const setUserAccountStatusFilter = ({ userAccountStatus = "" } = {}) => ({
  type: "SET_USER_ACCOUNT_STATUS_FILTER",
  userAccountStatus,
});

// setIsDueFilter
const setIsDueFilter = ({ isDue = null } = {}) => ({
  type: "SET_IS_DUE_FILTER",
  isDue,
});

// setSortBy
const setSortByFilter = ({ sortBy = "" }) => ({
  type: "SET_SORT_BY_FILTER",
  sortBy,
});

// setUserStartDateFilter
const setUserStartDateFilter = ({
  startDate = moment().startOf("month").valueOf(),
}) => ({
  type: "SET_USER_START_DATE_FILTER",
  startDate,
});

// setUserEndDateFilter
const setUserEndDateFilter = ({
  endDate = moment().endOf("month").valueOf(),
}) => ({
  type: "SET_USER_END_DATE_FILTER",
  endDate,
});

// -userFilter actions

// userFilter Reducer
const userFilterReducerDefaultState = {
  text: "",
  contactNumber: "",
  emailId: "",
  currentPlanId: "", // using dropdown
  userAccountStatus: "", //active or inactive
  isDue: null,
  sortBy: "dueDateAsc",
  startDate: moment().startOf("month").valueOf(),
  endDate: moment().endOf("month").valueOf(),
};
const userFilterReducer = (state = userFilterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_USER_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SET_CONTACT_NUMBER_FILTER":
      return { ...state, contactNumber: action.contactNumber };
    case "SET_EMAIL_ID_FILTER":
      return { ...state, emailId: action.emailId };
    case "SET_CURRENT_PLAN_ID_FILTER":
      return { ...state, currentPlanId: action.currentPlanId };
    case "SET_USER_ACCOUNT_STATUS_FILTER":
      return { ...state, userAccountStatus: action.userAccountStatus };
    case "SET_IS_DUE_FILTER":
      return { ...state, isDue: action.isDue };
    case "SET_USER_START_DATE_FILTER":
      return { ...state, startDate: action.startDate };
    case "SET_USER_END_DATE_FILTER":
      return { ...state, endDate: action.endDate };
    case "SET_SORT_BY_FILTER":
      return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};
const getVisibleUsers = (users, plans, userFilters) => {
  const {
    text = "",
    emailId = "",
    contactNumber = "",
    currentPlanId = "",
    userAccountStatus = "",
    isDue = true,
    sortBy = "dueDateAsc",
    startDate = moment().startOf("month").valueOf(),
    endDate = moment().endOf("month").valueOf(),
  } = { ...userFilters };

  return users
    .filter((user) => {
      const {
        totalPaymentReceived,
        dueAmount,
        currentPlan,
        currentPlanDueDate,
        userInDue,
      } = getTotalPaymentReceivedToLastUsage(user, plans);

      // textMatch
      const textMatch = getUserFullName(user)
        .fullName.toLowerCase()
        .includes(text.toLowerCase());

      // emailIdMatch
      const emailIdMatch = user.emailId
        .toLowerCase()
        .includes(emailId.toLowerCase());

      // contactNumberMatch
      const contactNumberMatch = user.contactNumber.includes(contactNumber);

      // currentPlanIdMatch
      const currentPlanIdMatch = currentPlan.id
        .toLowerCase()
        .includes(currentPlanId.toLowerCase());

      // userAccountStatusMatch
      const userAccountStatusMatch = !!userAccountStatus
        ? user.status.toLowerCase() === userAccountStatus.toLowerCase()
        : true;

      // isDueMatch
      /*
       initialize isDueMatch as true, because if no dues for a user, 
       then don't exclude this user, have to include this user so mark match as true
      */
      let isDueMatch = true;
      if (isDue !== null) {
        //if user has any due or not
        if (isDue === true) {
          isDueMatch = userInDue === true ? true : false;
        } else {
          isDueMatch = userInDue === false ? true : false;
        }
      } else {
        isDueMatch = true;
      }

      // +startDateMatch and endDateMatch with user due date
      let startDateMatch = false,
        endDateMatch = false;
      // calculation of userPlanDueDate
      // let userPlanDueDate = null;
      if (isDue !== null) {
        startDateMatch = currentPlanDueDate >= startDate;
        endDateMatch = currentPlanDueDate <= endDate;
      } else {
        // get all either having due or no-dues
        startDateMatch = true;
        endDateMatch = true;
      }

      return (
        textMatch &&
        contactNumberMatch &&
        emailIdMatch &&
        currentPlanIdMatch &&
        userAccountStatusMatch &&
        isDueMatch &&
        startDateMatch &&
        endDateMatch
      );
    })
    .sort((firstUser, secondUser) => {
      if (sortBy.includes("text")) {
        const { fullName: firstUserFullName } = getUserFullName(firstUser);
        const { fullName: secondUserFullName } = getUserFullName(secondUser);

        return sortBy === "textAsc"
          ? firstUserFullName.toLowerCase() > secondUserFullName.toLowerCase()
          : firstUserFullName.toLowerCase() < secondUserFullName.toLowerCase();
      } else if (sortBy.includes("dueAmount")) {
        const { dueAmount: firstUserDueAmount } =
          getTotalPaymentReceivedToLastUsage(firstUser, plans);
        const { dueAmount: secondUserDueAmount } =
          getTotalPaymentReceivedToLastUsage(secondUser, plans);

        return sortBy === "dueAmountAsc"
          ? firstUserDueAmount - secondUserDueAmount
          : secondUserDueAmount - firstUserDueAmount;
      } else if (sortBy.includes("dueDate")) {
        const { currentPlanDueDate: firstUserCurrentPlanDueDate } =
          getTotalPaymentReceivedToLastUsage(firstUser, plans);
        const { currentPlanDueDate: secondUserCurrentPlanDueDate } =
          getTotalPaymentReceivedToLastUsage(secondUser, plans);

        return sortBy === "dueDateAsc"
          ? firstUserCurrentPlanDueDate - secondUserCurrentPlanDueDate
          : secondUserCurrentPlanDueDate - firstUserCurrentPlanDueDate;
      } else {
        // console.log(`sortBy variable = ${sortBy} didn't match with any filter`);
        return 0;
      }
    });
};

//#TODO
//plan actions
// ADD_PLAN
const addPlan = ({
  title = "Plan Name Not Decided Yet",
  price = 0,
  status = "inactive",
  description = "A good plan for an average income family",
  validityPeriod = 0,
} = {}) => ({
  type: "ADD_PLAN",
  plan: {
    id: uuid(),
    title,
    price,
    status,
    description,
    validityPeriod,
    createdAt: moment().valueOf(),
  },
});

// EDIT_PLAN
const editPlan = ({ id = "", updates = {} } = {}) => ({
  type: "EDIT_PLAN",
  id,
  updates,
});

// REMOVE_PLAN
const removePlan = ({ id = "" } = {}) => ({
  type: "REMOVE_PLAN",
  id,
});

// TODO
// plan reducer
// const planReducerDefaultState = [];
const planReducerDefaultState = [...plans];
const planReducer = (state = planReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PLAN":
      return [...state, action.plan];
    case "EDIT_PLAN":
      return state.map((plan) => {
        if (plan.id === action.id) {
          return { ...plan, ...action.updates };
        } else {
          return plan;
        }
      });
    case "REMOVE_PLAN":
      return state.filter(({ id }) => id === action.id);
    default:
      return state;
  }
};

// planFilters actions
// SET_PLAN_TEXT_FILTER
const setPlanTextFilter = ({ text = "" } = {}) => ({
  type: "SET_PLAN_TEXT_FILTER",
  text,
});

// SET_PRICE_FILTER
const setPriceFilter = ({ price = 0 } = {}) => ({
  type: "SET_PRICE_FILTER",
  price,
});

// SET_PLAN_STATUS_FILTER
const setPlanStatusFilter = ({ planStatus = "active" } = {}) => ({
  type: "SET_PLAN_STATUS_FILTER",
  planStatus,
});

// SET_VALIDITY_PERIOD_FILTER
const setValidityPeriodFilter = ({ validityPeriod = 0 } = {}) => ({
  type: "SET_VALIDITY_PERIOD_FILTER",
  validityPeriod,
});

// setPlanStartDateFilter
const setPlanStartDateFilter = ({
  startDate = moment().startOf("month").valueOf(),
} = {}) => ({
  type: "SET_PLAN_START_DATE_FILTER",
  startDate,
});

// setPlanEndDateFilter
const setPlanEndDateFilter = ({
  endDate = moment().endOf("month").valueOf(),
} = {}) => ({
  type: "SET_PLAN_END_DATE_FILTER",
  endDate,
});

// setPlanSortByFilter
const setPlanSortByFilter = ({ sortBy = "price" }) => ({
  type: "SET_PLAN_SORT_BY_FILTER",
  sortBy,
});

// TODO
// planFilterReducer
// const planFilterReducerDefaultState = {};
const planFilterReducerDefaultState = {
  text: "",
  price: 0,
  planStatus: "active",
  validityPeriod: 0,
  startDate: moment().startOf("month").valueOf(),
  endDate: moment().endOf("month").valueOf(),
  sortBy: "priceAsc",
};
const planFilterReducer = (state = planFilterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_PLAN_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SET_PRICE_FILTER":
      return { ...state, price: action.price };
    case "SET_PLAN_STATUS_FILTER":
      return { ...state, planStatus: action.planStatus };
    case "SET_VALIDITY_PERIOD_FILTER":
      return { ...state, validityPeriod: action.validityPeriod };
    case "SET_PLAN_START_DATE_FILTER":
      return { ...state, startDate: action.startDate };
    case "SET_PLAN_END_DATE_FILTER":
      return { ...state, endDate: action.endDate };
    case "SET_PLAN_SORT_BY_FILTER":
      return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};

// TODO
// getSelectedPlans
const getSelectedPlans = (plans, planFilters) => {
  const {
    text = "",
    price = 0,
    planStatus = "active",
    validityPeriod = 0,
    startDate = moment().startOf("month").valueOf(),
    endDate = moment().endOf("month").valueOf(),
    sortBy = "priceAsc",
  } = { ...planFilters };

  return plans
    .filter((plan) => {
      // textMatch
      const textMatch = plan.title.toLowerCase().includes(text);

      // priceMatch
      const priceMatch = plan.price >= price;

      // planStatusMatch
      const planStatusMatch = !!planStatus
        ? plan.status.toLowerCase() === planStatus.toLowerCase()
        : true;

      // validityPeriodMatch
      const validityPeriodMatch = plan.validityPeriod >= validityPeriod;

      // startDateMatch
      const startDateMatch =
        planStatus === "" ? true : plan.createdAt >= startDate;

      // endDateMatch
      const endDateMatch = planStatus === "" ? true : plan.createdAt <= endDate;

      return (
        textMatch &&
        priceMatch &&
        planStatusMatch &&
        validityPeriodMatch &&
        startDateMatch &&
        endDateMatch
      );
    })
    .sort((first, second) => {
      if (sortBy.includes("text")) {
        return sortBy === "textAsc"
          ? first.title.toLowerCase() > second.title.toLowerCase()
          : first.title.toLowerCase() < second.title.toLowerCase();
      } else if (sortBy.includes("price")) {
        return sortBy === "priceAsc"
          ? first.price - second.price
          : second.price - first.price;
      } else if (sortBy.includes("validityPeriod")) {
        return sortBy === "validityPeriodAsc"
          ? first.validityPeriod - second.validityPeriod
          : second.validityPeriod - first.validityPeriod;
      }
    });
};

// store creation
const store = createStore(
  combineReducers({
    users: userReducer,
    plans: planReducer,
    userFilters: userFilterReducer,
    planFilters: planFilterReducer,
  })
);
store.getState();
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const selectedPlans = getSelectedPlans(state.plans, state.planFilters);
  console.log("start.plans", state.plans);
  console.log(
    "selectedPlans",
    selectedPlans,
    "\nplanFilters",
    state.planFilters
  );
});

// const firstUser = store.dispatch(
//   addUser({
//     firstName: "Anju",
//     address: "MMMUT",
//     contactNumber: "8354820950",
//     emailId: "anju@gmail.com",
//   })
// );
// const secondUser = store.dispatch(
//   addUser({
//     firstName: "Ravi",
//     address: "Varanasi",
//     contactNumber: "987654321",
//     emailId: "ravi@ncr.com",
//   })
// );
// // // console.log("returned", firstUser);
// const updatedFirstUser = store.dispatch(
//   editUser({
//     id: "1",
//     updates: {
//       firstName: "Aradhana",
//       middleName: "b1",
//       lastName: "Singh",
//       emailId: "Aradhana@gmail.com",
//       address: "MMMEC Gorakhpur",
//       status: "Active",
//     },
//   })
// );
// store.dispatch(removeUser({ id: "1" }));

// const firstUsage = store.dispatch(
//   addUsage({
//     userId: "4",
//     planId: "3",
//     paymentDetails: [
//       {
//         id: uuid(),
//         paidAmount: 8000,
//         paymentMethod: "Credit Card",
//         paymentReferenceId: "a1",
//         paidAt: moment("2020-07-23").valueOf(),
//       },
//     ],
//   })
// );

// const secondUsage = store.dispatch(
//   addUsage({
//     userId: "3",
//     planId: "3",
//     paymentDetails: [
//       {
//         id: uuid(),
//         paidAmount: 3000,
//         paymentMethod: "On-Line",
//         paymentReferenceId: "a1",
//         paidAt: moment("2020-08-23").valueOf(),
//       },
//       {
//         id: uuid(),
//         paidAmount: 2000,
//         paymentMethod: "OCash",
//         paymentReferenceId: "",
//         paidAt: moment("2020-08-02").valueOf(),
//       },
//       {
//         id: uuid(),
//         paidAmount: 5000,
//         paymentMethod: "On-Line",
//         paymentReferenceId: "a1",
//         paidAt: moment("2020-09-22").valueOf(),
//       },
//     ],
//   })
// );
// const thirdUsage = store.dispatch(
//   addUsage({
//     userId: "2",
//     planId: "3",
//     paymentDetails: [],
//   })
// );
// console.log(thirdUsage);

// const firstPayment = store.dispatch(
//   addPayment({
//     userId: "2",
//     usageId: thirdUsage.usage.id,
//     paymentDetail: {
//       paidAmount: 9900,
//       paymentMethod: "onLine",
//       paymentReferenceId: "adf1",
//     },
//   })
// );
// console.log(firstPayment);

// const secondPayment = store.dispatch(
//   addPayment({
//     userId: "2",
//     usageId: thirdUsage.usage.id,
//     paymentDetail: {
//       paidAmount: 9900,
//       paymentMethod: "CASH",
//       paymentReferenceId: "adASDFASDF1",
//     },
//   })
// );
// console.log(secondPayment);

// store.dispatch(setUserTextFilter({ text: "" }));
// store.dispatch(setContactNumberFilter({ contactNumber: "" }));
// store.dispatch(setEmailIdFilter({ emailId: "" }));
// store.dispatch(setCurrentPlanIdFilter({ currentPlanId: "" }));
// store.dispatch(setUserAccountStatusFilter({ userAccountStatus: "" }));
// store.dispatch(setIsDueFilter({ isDue: true }));

// // store.dispatch(setUserStartDateFilter({ startDate: moment(0).valueOf() }));
// store.dispatch(setUserEndDateFilter({ endDate: moment("2022-01-01").valueOf() }));

// // store.dispatch(setSortByFilter({ sortBy: "textAsc" }));
// // store.dispatch(setSortByFilter({ sortBy: "dueAmountAsc" }));
// store.dispatch(setSortByFilter({ sortBy: "dueDateAsc" }));

const firstPlan = store.dispatch(addPlan({}));
const secondPlan = store.dispatch(
  addPlan({
    title: "Gonna Decide Soon",
    price: 100 * 100,
    status: "active",
    description: "Best Plan Ever",
    validityPeriod: 0,
  })
);
const editedFirstPlan = store.dispatch(
  editPlan({
    id: secondPlan.plan.id,
    updates: {
      title: "Updated Title",
      price: 1500 * 100,
      status: "active",
      description: "Gonna end soon",
      validityPeriod: 120 * 24 * 3600 * 1000,
    },
  })
);

// store.dispatch(setPlanEndDateFilter({endDate: }));
store.dispatch(setPlanSortByFilter({ sortBy: "priceDesc" }));
// store.dispatch(setPlanStartDateFilter({ startDate: moment(0).valueOf() }));
store.dispatch(setPlanStatusFilter({ planStatus: "" }));
