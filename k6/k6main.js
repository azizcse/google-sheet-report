import http from 'k6/http';
import { check } from 'k6';
import {accountModule} from "./AccountModule.js"
import {adminModule} from "./AdminModule.js"

export default function () {
  
  const res = http.get('https://httpbin.test.k6.io');
  check(res, {
    'Main file response 200': (res) => res.status == 200,
  });

  accountModule();
  adminModule();
}