export interface loginFacebookReponseInterface {
  authResponse: {
    accessToken: string;
    data_access_expiration_time: number;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
  status: string;
}

export interface loginServerReponseInterface {
  status: {
    code: number;
    message: string;
  };
  user: {
    createdDatetime: string;
    email: string;
    id: number;
    loginType: string;
    name: string;
    password: string;
    updatedDatetime: string;
    uuid: string;
  };
}
