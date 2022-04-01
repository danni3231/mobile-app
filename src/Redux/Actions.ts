import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { visitor } from "../Types/visitor";

export type Action = { type: string; payload: any };

// Space actions

export const setSpaces = (spaces: space[]): Action => ({
  type: "@spaces/setSpaces",
  payload: spaces,
});

// Bookings actions

export const addBooking = (newBooking: booking): Action => ({
  type: "@bookings/addBooking",
  payload: newBooking,
});

export const setBookings = (bookings: booking[]): Action => ({
  type: "@bookings/setBookings",
  payload: bookings,
});

// Visits actions

export const addVisitor = (newVisitor: visitor): Action => ({
  type: "@visits/addVisitor",
  payload: newVisitor,
});

export const setVisits = (visits: visitor[]): Action => ({
  type: "@visits/setVisits",
  payload: visits,
});

// Users Actions

export const ADD_BOOKINGS = "@bookings/addBooking";
export const SET_BOOKINGS = "@bookings/setBookings";
export const SET_SPACES = "@spaces/setSpaces";
export const SET_VISITS = "@visits/setVisits";
export const ADD_VISITOR = "@visits/addVisitor";
