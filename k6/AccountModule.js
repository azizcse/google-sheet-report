import http from 'k6/http';
import { check } from 'k6';

export  function accountModule(jwtToken) {
  console.log("Account module jwt: "+jwtToken)
  const res = http.get('https://httpbin.test.k6.io');
  check(res, {
    'Account module response 200': (res) => res.status == 200,
  });
}