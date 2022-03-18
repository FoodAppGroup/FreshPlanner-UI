import {UserInfoResponse} from './user-info-response';

export interface JwtResponse {
  token?: string;
  tokenType?: string;
  userInfo?: UserInfoResponse;
}
