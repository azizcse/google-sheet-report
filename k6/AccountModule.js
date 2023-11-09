import http from 'k6/http';
import { check } from 'k6';

export  function accountModule() {
  const res = http.get('https://httpbin.test.k6.io');
  check(res, {
    'Account module response 200': (res) => res.status == 200,
  });
}