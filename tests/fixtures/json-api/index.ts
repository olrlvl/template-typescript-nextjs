import nestjsUsersList from "./nestjs-users-list.json";
import nestjsUsersDetail from "./nestjs-users-detail.json";
import nestjsErrorValidation from "./nestjs-error-validation.json";
import djangoUsersList from "./django-users-list.json";
import djangoUsersDetail from "./django-users-detail.json";
import djangoErrorValidation from "./django-error-validation.json";

export const fixtures = {
  nestjs: {
    usersList: nestjsUsersList,
    usersDetail: nestjsUsersDetail,
    errorValidation: nestjsErrorValidation,
  },
  django: {
    usersList: djangoUsersList,
    usersDetail: djangoUsersDetail,
    errorValidation: djangoErrorValidation,
  },
} as const;
