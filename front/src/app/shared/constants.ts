export class AppConstants {
  public static readonly OK = 'OK';
  public static readonly CLOSE = 'C';
  public static readonly YES = "Y";
  public static readonly ADMIN = "Administrator";
  public static readonly OWNER = "Owner";
  public static readonly EMPLOYEE = "Employee";
  public static readonly USER = "User";
  public static readonly MODAL_CONTENT = 'modalCont';
  public static readonly MODAL_CONTENT_DEL = 'modalContDel';
  public static readonly CURRENT_USER = "currentUser";
  public static readonly LOGGED_IN = "isLoggedIn";
  public static readonly CLOSEST_PARKINGS = "closestParkingAreas";
  public static readonly FOUND_PARKINGS = "dashFoundParkingAreas";
  public static readonly CURRENT_LAT = "currentLatitude";
  public static readonly CURRENT_LNG = "currentLongitude";
  public static readonly ADMIN_ROLE = "ROLE_ADMIN";
  public static readonly USER_ROLE = "ROLE_USER";
  public static readonly OWNER_ROLE = "ROLE_OWNER";
  public static readonly EMPLOYEE_ROLE = "ROLE_EMPLOYEE";
  public static readonly ERROR_TITLE = "Error";
  public static readonly ERROR_TEXT = "An unexpected error occurred. Please try again!";
  public static readonly CONFIRM_TITLE = "Confirmation";
  public static readonly SUCCESS_TITLE = "Success";
  public static readonly DELETE_REQ_CONFIRM_TEXT = "Are you sure you want to delete this owner request?";
  public static readonly DELETE_MSG_CONFIRM_TEXT = "Are you sure you want to delete this user message?";
  public static readonly DELETE_REQ_TEXT = "You have successfully deleted this owner request!";
  public static readonly DELETE_MSG_TEXT = "You have successfully deleted this user message!";
  public static readonly OWNER_ACTIV_TEXT = "You have successfully approved this owner request!";
  public static readonly ADMIN_CREATE_TEXT = "You have successfully added a new Administrator!";
  public static readonly DELETE_USER_CONFIRM_TEXT = "Are you sure you want to permanently delete this user's account?";
  public static readonly DELETE_USER_TEXT = "You have successfully deleted the user's account!";
  public static readonly OWNER_REQUEST_TEXT = "You have successfully sent your owner registration request!";
  public static readonly UPDATE_LOT_VACANT_TEXT = "You have successfully set the lot as vacant!";
  public static readonly UPDATE_LOT_OCCUPIED_TEXT = "You have successfully set the lot as occupied!";
  public static readonly ADD_EMPLOYEE_TEXT = "You have successfully registered a new employee!";
  public static readonly ADD_PARKING_TEXT = "You have successfully added a new parking area!";
  public static readonly NOT_PERMITTED_TITLE = "Not Permitted";
  public static readonly NOT_PERMITTED_TEXT = "You have to be logged in to make a reservation!";
  public static readonly INVALID_EQUAL_TIME = "Your arrival time cannot be the same as your leaving time!";
  public static readonly INVALID_PAST_TIME_TEXT = "You cannot set a time in the past for your reservation!";
  public static readonly INVALID_LEAVE_TIME_TEXT = "Your leaving time cannot be before your start time!";
  public static readonly RESERVATION_TEXT = "You have successfully reserved lot number ";
  public static readonly EDIT_PARKING_TEXT = "You have successfully updated the parking area!";
  public static readonly ADD_LOTS_TEXT = "You have successfully added ";
  public static readonly REMOVE_LOTS_TEXT = "You have successfully removed ";
  public static readonly DELETE_PARKING_CONFIRM_TEXT = "Are you sure you want to permanently delete this parking area?";
  public static readonly DELETE_PARKING_TEXT = "You have successfully deleted the parking area!";
  public static readonly ASSIGN_EMPLOYEE_TEXT = "You have successfully assigned the employee to this parking area!";
  public static readonly REMOVE_EMPLOYEE_TEXT = "You have successfully removed the employee from this parking area!";
  public static readonly CANCEL_RESERVATION_CONFIRM_TEXT = "Are you sure you want to cancel this reservation?";
  public static readonly CANCEL_RESERVATION_TEXT = "You have successfully cancelled the reservation!";
  public static readonly EDIT_PROFILE_TEXT = "You have successfully edited your profile!";
  public static readonly EDIT_EMPLOYEE_PROFILE_TEXT = "You have successfully edited this employee's information!";
  public static readonly DELETE_MY_ACCOUNT_CONFIRM_TEXT = "Are you sure you want to permanently delete your account?";
  public static readonly DELETE_USER_ACCOUNT_CONFIRM_TEXT = "Are you sure you want to permanently delete this user's account?";
  public static readonly DELETE_MY_ACCOUNT_TEXT = "You have successfully deleted your account!";
  public static readonly DELETE_USER_ACCOUNT_TEXT = "You have successfully deleted the user's account!";
  public static readonly INVALID_PHOTO_TITLE = "Invalid Photo Format";
  public static readonly INVALID_PHOTO_TEXT = "The format of the file you have chosen is invalid. Please choose an image file!";
  public static readonly PHOTO_UPLOAD_TEXT = "You have successfully uploaded your photo!";
  public static readonly LOGIN_FAIL = 'Invalid username or password.';
  public static readonly SIGNUP_TEXT = "You have successfully signed up! You can now log in with your credentials.";
  public static readonly DELETE_NOTIF_SUCCESS_TEXT = "You have successfully deleted the notification!";
  public static readonly CHANGE_PASSWORD_SUCCESS_TEXT = "You have successfully changed your password! You can now log in with your new credentials.";
  public static readonly SEND_MESSAGE_SUCCESS_TEXT = "You have successfully sent your message! As soon as your message is acknowledged you will receive an e-mail regarding your concerns!";
  public static readonly INVALID_NAME = "The name should have between 3 and 64 characters!";
  public static readonly INVALID_FIRST_NAME = "The first name should have between 3 and 64 characters!";
  public static readonly INVALID_LAST_NAME = "The last name should have between 3 and 64 characters!";
  public static readonly INVALID_USERNAME = "The username should have between 3 and 64 characters!";
  public static readonly INVALID_PASSWORD = "The password should have between 3 and 64 characters!";
  public static readonly INVALID_EMAIL = "The e-mail address is invalid!";
  public static readonly INVALID_REASON = "Your contact reason should have between 3 and 64 characters!";
  public static readonly INVALID_MESSAGE = "Your message should have at least 10 characters!";
  public static readonly INVALID_PARKING_NAME = "The parking name should have between 1 and 64 characters!";
  public static readonly INVALID_PARKING_LOTS = "The number of lots cannot be empty!";
  public static readonly INVALID_PARKING_LOCATION = "The location name should have between 1 and 64 characters!";
  public static readonly INVALID_PARKING_CITY = "The city should have between 1 and 64 characters!";
  public static readonly INVALID_PARKING_STREET = "The street should have between 1 and 64 characters!";
  public static readonly INVALID_PARKING_NUMBER = "The number should have between 1 and 64 characters!";
  public static readonly INVALID_LATITUDE = "The latitude cannot be empty!";
  public static readonly INVALID_LONGITUDE = "The longitude cannot be empty!";
  public static readonly PRISTINE_FORM = "You have not completed any fields!";
  public static readonly NO_RESERVATION_SERVER_MESSAGE = "Reservation not possible!";
  public static readonly NO_RESERVATION_TITLE = "Reservation Not Possible";
  public static readonly NO_RESERVATION_TEXT = "No lots are available in your chosen time period. Please try another parking area!";
  public static readonly TYPE_REQUEST = "OWNER_REQUEST";
  public static readonly TYPE_MESSAGE = "USER_MESSAGE";
  public static readonly TYPE_CANCEL = "CANCELLED_RESERVATION";
}
