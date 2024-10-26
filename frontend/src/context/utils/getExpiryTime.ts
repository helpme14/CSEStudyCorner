// utils/getExpiryTime.ts
import {jwtDecode} from 'jwt-decode';
import { CustomJwtPayload } from '../types/AuthTypes';

export const getExpiryTime = (token: string): number | null => {
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  return decodedToken.exp ? decodedToken.exp * 1000 : null;
};