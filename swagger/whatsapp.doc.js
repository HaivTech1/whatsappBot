const sendTextOnly = {
  tags: ['Send Text Only'],
  description: 'Login a the user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            sender: {
              type: 'String',
              description: 'sender',
              required: true,
              example: 'qedfsqqadad',
            },
            number: {
              type: 'String',
              description: 'Number whatsapp',
              required: true,
              example: '082165561175',
            },
            message: {
              type: 'String',
              description: 'Pesan whatsapp',
              required: true,
              example: 'Hallo Word',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              response: {
                _data: {
                  id: {
                    fromMe: true,
                    remote: {
                      server: 'c.us',
                      user: '6282165561175',
                      _serialized: '6282165561175@c.us',
                    },
                    id: '3EB00AFD24B77E29AEF8',
                    _serialized: 'true_6282165561175@c.us_3EB00AFD24B77E29AEF8',
                  },
                  body: 'heello word',
                  type: 'chat',
                  t: 1653406328,
                  from: {
                    server: 'c.us',
                    user: '6281260538973',
                    _serialized: '6281260538973@c.us',
                  },
                  to: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  self: 'out',
                  ack: 0,
                  isNewMsg: true,
                  star: false,
                  isFromTemplate: false,
                  mentionedJidList: [],
                  isVcardOverMmsDocument: false,
                  isForwarded: false,
                  hasReaction: false,
                  disappearingModeInitiator: 'chat',
                  productHeaderImageRejected: false,
                  lastPlaybackProgress: 0,
                  isDynamicReplyButtonsMsg: false,
                  isMdHistoryMsg: false,
                  requiresDirectConnection: null,
                  pttForwardedFeaturesEnabled: true,
                },
                id: {
                  fromMe: true,
                  remote: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  id: '3EB00AFD24B77E29AEF8',
                  _serialized: 'true_6282165561175@c.us_3EB00AFD24B77E29AEF8',
                },
                ack: 0,
                hasMedia: false,
                body: 'heello word',
                type: 'chat',
                timestamp: 1653406328,
                from: '6281260538973@c.us',
                to: '6282165561175@c.us',
                deviceType: 'web',
                isForwarded: false,
                forwardingScore: 0,
                isStarred: false,
                fromMe: true,
                hasQuotedMsg: false,
                vCards: [],
                mentionedIds: [],
                isGif: false,
              },
            },
          },
        },
      },
    },
    422: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 422,
              message:
                'Client Not Found Please Create Account Whats Up And Scan Barcode',
            },
          },
        },
      },
    },
  },
};
const sendMediaUrl = {
  tags: ['Send Media Url (jpeg-jpg-png)'],
  description: 'Send Media Url',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            sender: {
              type: 'String',
              description: 'Sender String',
              required: true,
              example: 'qedfsqqadad',
            },
            number: {
              type: 'String',
              description: 'Number whatsapp',
              required: true,
              example: '082165561175',
            },
            caption: {
              type: 'String',
              description: 'Pesan whatsapp',
              required: true,
              example: 'Hallo Word',
            },
            file: {
              type: 'String',
              description: 'Url jpeg,png,jpg',
              required: true,
              example:
                'https://i.pinimg.com/736x/62/50/66/6250661bcc56914d51c0b669d1cc6c54.jpg',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              response: {
                _data: {
                  id: {
                    fromMe: true,
                    remote: {
                      server: 'c.us',
                      user: '6282165561175',
                      _serialized: '6282165561175@c.us',
                    },
                    id: '3EB00AFD24B77E29AEF8',
                    _serialized: 'true_6282165561175@c.us_3EB00AFD24B77E29AEF8',
                  },
                  body: 'heello word',
                  type: 'chat',
                  t: 1653406328,
                  from: {
                    server: 'c.us',
                    user: '6281260538973',
                    _serialized: '6281260538973@c.us',
                  },
                  to: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  self: 'out',
                  ack: 0,
                  isNewMsg: true,
                  star: false,
                  isFromTemplate: false,
                  mentionedJidList: [],
                  isVcardOverMmsDocument: false,
                  isForwarded: false,
                  hasReaction: false,
                  disappearingModeInitiator: 'chat',
                  productHeaderImageRejected: false,
                  lastPlaybackProgress: 0,
                  isDynamicReplyButtonsMsg: false,
                  isMdHistoryMsg: false,
                  requiresDirectConnection: null,
                  pttForwardedFeaturesEnabled: true,
                },
                id: {
                  fromMe: true,
                  remote: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  id: '3EB00AFD24B77E29AEF8',
                  _serialized: 'true_6282165561175@c.us_3EB00AFD24B77E29AEF8',
                },
                ack: 0,
                hasMedia: false,
                body: 'heello word',
                type: 'chat',
                timestamp: 1653406328,
                from: '6281260538973@c.us',
                to: '6282165561175@c.us',
                deviceType: 'web',
                isForwarded: false,
                forwardingScore: 0,
                isStarred: false,
                fromMe: true,
                hasQuotedMsg: false,
                vCards: [],
                mentionedIds: [],
                isGif: false,
              },
            },
          },
        },
      },
    },
    422: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 422,
              message:
                'Client Not Found Please Create Account Whats Up And Scan Barcode',
            },
          },
        },
      },
    },
  },
};
const sendBroadcast = {
  tags: ['Send Broadcast'],
  description: 'Send Broadcast',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            sender: {
              type: 'String',
              description: 'Sender String',
              required: true,
              example: 'qedfsqqadad',
            },
            number: {
              type: 'String',
              description: 'Number whatsapp',
              required: true,
              example: '082165561175',
            },
            strArr: {
              type: 'String',
              description: 'Number whatsapp',
              required: true,
              example: '082165561175,082165561175',
            },
            message: {
              type: 'String',
              description: 'Pesan whatsapp',
              required: true,
              example: 'Hallo Word',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              response: {
                _data: {
                  id: {
                    fromMe: true,
                    remote: {
                      server: 'c.us',
                      user: '6282165561175',
                      _serialized: '6282165561175@c.us',
                    },
                    id: '3EB00AFD24B77E29AEF8',
                    _serialized: 'true_6282165561175@c.us_3EB00AFD24B77E29AEF8',
                  },
                  body: 'heello word',
                  type: 'chat',
                  t: 1653406328,
                  from: {
                    server: 'c.us',
                    user: '6281260538973',
                    _serialized: '6281260538973@c.us',
                  },
                  to: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  self: 'out',
                  ack: 0,
                  isNewMsg: true,
                  star: false,
                  isFromTemplate: false,
                  mentionedJidList: [],
                  isVcardOverMmsDocument: false,
                  isForwarded: false,
                  hasReaction: false,
                  disappearingModeInitiator: 'chat',
                  productHeaderImageRejected: false,
                  lastPlaybackProgress: 0,
                  isDynamicReplyButtonsMsg: false,
                  isMdHistoryMsg: false,
                  requiresDirectConnection: null,
                  pttForwardedFeaturesEnabled: true,
                },
                id: {
                  fromMe: true,
                  remote: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  id: '3EB00AFD24B77E29AEF8',
                  _serialized: 'true_6282165561175@c.us_3EB00AFD24B77E29AEF8',
                },
                ack: 0,
                hasMedia: false,
                body: 'heello word',
                type: 'chat',
                timestamp: 1653406328,
                from: '6281260538973@c.us',
                to: '6282165561175@c.us',
                deviceType: 'web',
                isForwarded: false,
                forwardingScore: 0,
                isStarred: false,
                fromMe: true,
                hasQuotedMsg: false,
                vCards: [],
                mentionedIds: [],
                isGif: false,
              },
            },
          },
        },
      },
    },
    422: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 422,
              message:
                'Client Not Found Please Create Account Whats Up And Scan Barcode',
            },
          },
        },
      },
    },
  },
};
const getImageWA = {
  tags: ['Get Image WA'],
  description: 'Get Image WA',
  parameters: [
    {
      name: 'number',
      in: 'path',
      description: 'number',
      type: 'string',
      example: '082165561175',
    },
    {
      name: 'clientId',
      in: 'path',
      description: 'clientId',
      type: 'string',
      example: 'qtzlraxn',
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: true,
              image:
                'https://pps.whatsapp.net/v/t61.24694-24/291540168_2293634667458857_7305090808010208061_n.jpg?ccb=11-4&oh=1ec0220e5db61508e26d4048972f4f3c&oe=62D1E8AC',
            },
          },
        },
      },
    },
  },
};
const isRegisteredUser = {
  tags: ['isRegisteredUser'],
  description: 'isRegisteredUser',
  parameters: [
    {
      name: 'number',
      in: 'path',
      description: 'number',
      type: 'string',
      example: '082165561175',
    },
    {
      name: 'clientId',
      in: 'path',
      description: 'clientId',
      type: 'string',
      example: 'qtzlraxn',
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: true,
              message: 'registered',
            },
          },
        },
      },
    },
  },
};

const sendLocation = {
  tags: ['Send Location'],
  description: 'Send Location',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            clientId: {
              type: 'String',
              description: 'ClientId',
              required: true,
              example: 'qedfsqqadad',
            },
            number: {
              type: 'String',
              description: 'Number ',
              required: true,
              example: '082165561175',
            },
            latitude: {
              type: 'String',
              description: 'latitude',
              required: true,
              example: '12.555904',
            },
            longitude: {
              type: 'String',
              description: 'longitude',
              required: true,
              example: '-87.535243',
            },
            description: {
              type: 'String',
              description: 'description',
              required: true,
              example: 'Hallo Word',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: {
                _data: {
                  id: {
                    fromMe: true,
                    remote: {
                      server: 'c.us',
                      user: '6282165561175',
                      _serialized: '6282165561175@c.us',
                    },
                    id: '3EB03E7E995805FCA8D6',
                    self: 'out',
                    _serialized:
                      'true_6282165561175@c.us_3EB03E7E995805FCA8D6_out',
                  },
                  body: '',
                  type: 'location',
                  t: 1656859375,
                  from: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  to: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  self: 'out',
                  ack: 0,
                  isNewMsg: true,
                  star: false,
                  loc: 'Hallo Word',
                  lat: 12.555904,
                  lng: -87.535243,
                  isFromTemplate: false,
                  mentionedJidList: [],
                  isVcardOverMmsDocument: false,
                  isForwarded: false,
                  hasReaction: false,
                  disappearingModeInitiator: 'chat',
                  productHeaderImageRejected: false,
                  lastPlaybackProgress: 0,
                  isDynamicReplyButtonsMsg: false,
                  isMdHistoryMsg: false,
                  requiresDirectConnection: null,
                  pttForwardedFeaturesEnabled: true,
                },
                id: {
                  fromMe: true,
                  remote: {
                    server: 'c.us',
                    user: '6282165561175',
                    _serialized: '6282165561175@c.us',
                  },
                  id: '3EB03E7E995805FCA8D6',
                  self: 'out',
                  _serialized:
                    'true_6282165561175@c.us_3EB03E7E995805FCA8D6_out',
                },
                ack: 0,
                hasMedia: false,
                body: '',
                type: 'location',
                timestamp: 1656859375,
                from: '6282165561175@c.us',
                to: '6282165561175@c.us',
                deviceType: 'web',
                isForwarded: false,
                forwardingScore: 0,
                isStarred: false,
                fromMe: true,
                hasQuotedMsg: false,
                location: {
                  latitude: 12.555904,
                  longitude: -87.535243,
                  description: 'Hallo Word',
                },
                vCards: [],
                mentionedIds: [],
                isGif: false,
              },
            },
          },
        },
      },
    },
    422: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 422,
              message:
                'Client Not Found Please Create Account Whats Up And Scan Barcode',
            },
          },
        },
      },
    },
  },
};
const userRouteDoc = {
  '/api-v1/send-message': {
    post: sendTextOnly,
  },
  '/api-v1/send-media-url': {
    post: sendMediaUrl,
  },
  '/api-v1/send-broadcast': {
    post: sendBroadcast,
  },
  '/api-v1/get-image/{number}/{clientId}': {
    patch: getImageWA,
  },
  '/api-v1/is-registered-user/{number}/{clientId}': {
    patch: isRegisteredUser,
  },
  '/api-v1/location': {
    post: sendLocation,
  },
};
module.exports = userRouteDoc;
