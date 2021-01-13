import { HttpMethod } from './http-method';

export interface RequestOptions {
  method?: HttpMethod;
  body?: any;
}
