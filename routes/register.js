var _0x5867f2 = _0x4126;
function _0x1fd6() {
  var _0x5d3538 = [
    'render',
    'bcrypt',
    '1795038bEDHwD',
    'rollback',
    'backend/register',
    'commit',
    'log',
    'errors',
    'get',
    'catch',
    '505290eytvTP',
    'exports',
    'Correct\x20Email,\x20Email\x20Not\x20Found',
    'flash',
    '818Oyhpdt',
    'transaction',
    '48xsGJoL',
    '2021-05-08\x2000:00:00',
    'Successfully\x20Register',
    '3545992asQPuJ',
    'redirect',
    'username',
    '9gMelUm',
    'insert',
    '20uyfIOn',
    'transacting',
    'then',
    'express',
    '169673Cbfydq',
    '/register',
    '488350NvdVjp',
    'post',
    '132FshJUt',
    '20XoZWcJ',
    '426907nZlclI',
    'body',
    'user',
    'arashmil.jpg',
    'email',
    'required',
    '102TlvQTD',
  ];
  _0x1fd6 = function () {
    return _0x5d3538;
  };
  return _0x1fd6();
}
(function (_0x1701d4, _0x39608d) {
  var _0x228e3f = _0x4126,
    _0x525ad4 = _0x1701d4();
  while (!![]) {
    try {
      var _0x227a65 =
        (-parseInt(_0x228e3f(0xd3)) / 0x1) *
          (-parseInt(_0x228e3f(0xdd)) / 0x2) +
        parseInt(_0x228e3f(0xf0)) / 0x3 +
        (parseInt(_0x228e3f(0xe6)) / 0x4) * (parseInt(_0x228e3f(0xe3)) / 0x5) +
        (parseInt(_0x228e3f(0xed)) / 0x6) * (parseInt(_0x228e3f(0xe1)) / 0x7) +
        (parseInt(_0x228e3f(0xd8)) / 0x8) * (-parseInt(_0x228e3f(0xdb)) / 0x9) +
        (-parseInt(_0x228e3f(0xcf)) / 0xa) * (parseInt(_0x228e3f(0xe5)) / 0xb) +
        (-parseInt(_0x228e3f(0xd5)) / 0xc) * (parseInt(_0x228e3f(0xe7)) / 0xd);
      if (_0x227a65 === _0x39608d) break;
      else _0x525ad4['push'](_0x525ad4['shift']());
    } catch (_0xb3419a) {
      _0x525ad4['push'](_0x525ad4['shift']());
    }
  }
})(_0x1fd6, 0x4f962);
var express = require(_0x5867f2(0xe0)),
  router = express['Router'](),
  knex = require('../database');
const { Validator } = require('node-input-validator');
function _0x4126(_0x4177d5, _0x2e58bc) {
  var _0x1fd64d = _0x1fd6();
  return (
    (_0x4126 = function (_0x4126a9, _0x583a8c) {
      _0x4126a9 = _0x4126a9 - 0xcb;
      var _0x4fe5a9 = _0x1fd64d[_0x4126a9];
      return _0x4fe5a9;
    }),
    _0x4126(_0x4177d5, _0x2e58bc)
  );
}
var bcrypt = require(_0x5867f2(0xef)),
  fs = require('fs');
router[_0x5867f2(0xcd)]('/', function (_0x22b79b, _0x15dd21, _0x58c731) {
  var _0x1729ff = _0x5867f2;
  return _0x15dd21[_0x1729ff(0xee)](_0x1729ff(0xf2), {
    success: _0x22b79b['flash']('success'),
    errors: _0x22b79b[_0x1729ff(0xd2)](_0x1729ff(0xcc)),
  });
}),
  router[_0x5867f2(0xe4)](
    '/register',
    function (_0x348696, _0x32fc46, _0x9961ec) {
      var _0x2cc432 = _0x5867f2;
      const _0x175b65 = new Validator(_0x348696[_0x2cc432(0xe8)], {
        username: _0x2cc432(0xec),
        email: 'required|email',
        password: _0x2cc432(0xec),
      });
      _0x175b65['check']()[_0x2cc432(0xdf)]((_0x78f366) => {
        var _0x1611b6 = _0x2cc432;
        if (!_0x78f366)
          _0x348696['flash']('errors', _0x1611b6(0xd1)),
            _0x32fc46[_0x1611b6(0xd9)](_0x1611b6(0xe2));
        else {
          let _0x2dd967 = [
            {
              username: _0x348696['body'][_0x1611b6(0xda)],
              email: _0x348696['body'][_0x1611b6(0xeb)],
              password: bcrypt['hashSync'](
                _0x348696[_0x1611b6(0xe8)]['password'],
                0xa
              ),
              role: _0x1611b6(0xe9),
              devices: '3',
              quota: '10',
              created_at: _0x1611b6(0xd6),
              updated_at: _0x1611b6(0xd6),
              image: _0x1611b6(0xea),
            },
          ];
          console[_0x1611b6(0xcb)](_0x2dd967),
            knex[_0x1611b6(0xd4)](function (_0x334545) {
              var _0x11c697 = _0x1611b6;
              knex('tbl_users')
                [_0x11c697(0xde)](_0x334545)
                [_0x11c697(0xdc)](_0x2dd967)
                [_0x11c697(0xdf)]()
                [_0x11c697(0xdf)](_0x334545[_0x11c697(0xf3)])
                [_0x11c697(0xce)](_0x334545[_0x11c697(0xf1)]);
            })
              [_0x1611b6(0xdf)](function (_0x2aeea0) {
                var _0x12ac79 = _0x1611b6;
                _0x348696[_0x12ac79(0xd2)]('success', _0x12ac79(0xd7)),
                  _0x32fc46[_0x12ac79(0xd9)](_0x12ac79(0xe2));
              })
              [_0x1611b6(0xce)](function (_0x340e8d) {
                var _0x212c5e = _0x1611b6;
                _0x348696['flash'](_0x212c5e(0xcc), _0x340e8d),
                  _0x32fc46[_0x212c5e(0xd9)](_0x212c5e(0xe2));
              });
        }
      });
    }
  ),
  (module[_0x5867f2(0xd0)] = router);
