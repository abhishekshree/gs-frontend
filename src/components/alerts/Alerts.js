import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { showNotification } from "@mantine/notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { SERVER_ERROR } from "API/constants.js";

export const errorNotification = (title,imessage) => {
  let message = "";
  if (imessage === undefined) {
    message = SERVER_ERROR;
  } else {
    message = imessage;
  }

  showNotification({
    title,
    message,
    color: "red",
    icon: <CloseIcon />,
  });
};

export const pushNotification = (title, message) => {
  showNotification({
    title,
    message,
    color: "blue",
    icon: <NotificationsIcon />,
  });
};

export const successNotification = (title, message) => {
  showNotification({
    title,
    message,
    color: "green",
    icon: <CheckCircleIcon />,
  });
};
