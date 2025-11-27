import { environment } from "../../../environments/environment";

const API_VERSION = 'v1';
const BASE_URL = `${environment.apiUrl}/api`;

export const API_ENDPOINTS_CONSTS = {

  AUTH: {
    LOGIN: `${BASE_URL}/authentications/login`,
    REGISTER: `${BASE_URL}/authentications/register`,
    LOGOUT: `${BASE_URL}/authentications/logout`,
    FORGOT_PASSWORD: `${BASE_URL}/authentications/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/authentications/reset-password`,
    VERIFY_EMAIL: `${BASE_URL}/authentications/verify-email`,
    RESEND_VERIFICATION: `${BASE_URL}/authentications/resend-verification`,
    CHANGE_PASSWORD: `${BASE_URL}/authentications/change-password`,
  },

  USERS: {
    ME: `${BASE_URL}/user/me`,
  },

  LMS: {

  },

  SIS: {

  },

  FILES: {
    UPLOAD: `${BASE_URL}/files/upload`,
    DOWNLOAD: (fileId: string) => `${BASE_URL}/files/${fileId}/download`,
    DELETE: (fileId: string) => `${BASE_URL}/files/${fileId}`,
  }
};

