import http from 'k6/http';
import { check } from 'k6';

export  function adminModule(jwtToken) {
  console.log("Admin module Jwt:"+jwtToken);
  const res = http.get('https://httpbin.test.k6.io');
  check(res, {
    'Admin module response 200': (res) => res.status == 200,
  });
}