import router from "../router";

const verifyToken = () => {
  if (!document.cookie.includes("auth") || isDateExpired(readToken().exp)) {
    router.push("/login");
  }
};

const readToken = () => {
  var token = document.cookie.split("=")[1];
  var tokenBody = token.split(".")[1];
  var tokenBodyParsed = JSON.parse(atob(tokenBody));
  return tokenBodyParsed;
};

const logout = () => {
  if (document.cookie.includes("auth")) {
    document.cookie = "";
    router.push("/login");
  }
};

const isDateExpired = (timestamp) => {
  const timestampInMilliseconds = timestamp * 1000;
  const currentDate = new Date();
  const providedDate = new Date(timestampInMilliseconds);
  return providedDate < currentDate;
};

const checkPermissions = (userRole: string, action: string): boolean => {
  // roles and their permissions
  const rolePermissions: Record<string, string[]> = {
    Admin: [
      "createRoom",
      "updateRoom",
      "deleteRoom",
      "createEquipment",
      "readEquipment",
      "updateEquipment",
      "deleteEquipment",
    ],
    User: [
      "readRoom",
      "createRecommendation",
      "readRecommendation",
      "updateRecommendation",
      "deleteRecommendation",
      "createGroup",
      "readGroup",
      "updateGroup",
      "deleteGroup",
      "createReservation",
      "readReservation",
      "updateReservation",
      "deleteReservation",
      "readProfile",
      "updateProfile",
    ],
  };

  // check if the action is allowed for the user's role
  const allowedActions = rolePermissions[userRole];
  if (allowedActions && allowedActions.includes(action)) {
    return true;
  } else {
    return false;
  }
};

export { verifyToken, logout, checkPermissions, readToken };
