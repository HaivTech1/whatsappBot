var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs-locals');
const schedule = require('node-schedule');
var session = require('express-session');
var bodyParser = require('body-parser');

const { body, validationResult } = require('express-validator');
const { phoneNumberFormatter } = require('./helpers/formatter');
const knex = require('./database');
const {
  Client,
  MessageMedia,
  LocalAuth,
  Location,
  Buttons,
  List,
  ClientInfo,
  MessageAck,
  Contact,
  GroupNotification,
  Label,
  Call,
} = require('whatsapp-web.js');

const fs = require('fs');
const fileUpload = require('express-fileupload');
const importExcel = require('convert-excel-to-json');
const axios = require('axios');
var flash = require('connect-flash');

const WwebjsSender = require('@deathabyss/wwebjs-sender');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger/documentation.js');

const Cookies = require('js-cookie');
const log4js = require('log4js');
log4js.configure({
  appenders: { everything: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['everything'], level: 'ALL' } },
});

const loggers = log4js.getLogger();
// const del = require('del');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var listmessageRouter = require('./routes/listmessage');
var listgroupsRouter = require('./routes/listgroups');
var sendwaRouter = require('./routes/sendwa');
var docapiRouter = require('./routes/docapi');

var broadcastwaRouter = require('./routes/broadcastwa');
var scheduleRouter = require('./routes/schedule');
var kontakRouter = require('./routes/kontak');
var replyRouter = require('./routes/reply');
var aboutRouter = require('./routes/about');
var configurationRouter = require('./routes/configuration');
var liveChatsRouter = require('./routes/liveChats');
var conversationsRouter = require('./routes/conversations');
var menuRouter = require('./routes/menu');

var registerRouter = require('./routes/register');
const { response } = require('express');

var app = express();
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 6000 },
  })
);
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(fileUpload());

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
// Route Home
app.use('/home', indexRouter);
app.use('/home/list-menu', indexRouter);
app.use('/home/count-message-outbox', indexRouter);
app.use('/home/get-quota', indexRouter);
app.use('/home/get-devices', indexRouter);
app.use('/home/get-use-devices', indexRouter);

// Route Menu
app.use('/menu', menuRouter);
app.use('/menu/add-menu', menuRouter);
app.use('/menu/data-menu', menuRouter);
app.use('/menu/update-menu', menuRouter);
app.use('/menu/delete-menu/:id', menuRouter);
app.use('/menu/edit-menu/:id', menuRouter);

// Route Users
app.use('/users', usersRouter);
app.use('/users/add-users', usersRouter);
app.use('/users/data-users', usersRouter);
app.use('/users/update-users', usersRouter);
app.use('/users/delete-users', usersRouter);
app.use('/users/email-users', usersRouter);
app.use('/users/edit-users', usersRouter);
app.use('/users/reset-password', usersRouter);
app.use('/users/logs', usersRouter);
app.use('/users/profile', usersRouter);

// Route Login
app.use('/login', loginRouter);
app.use('/auth', loginRouter);
app.use('/logout', loginRouter);

// Route Doc Api
app.use('/docs-api', docapiRouter);

// Route List Message
app.use('/message', listmessageRouter);
app.use('/message/listMessage', listmessageRouter);

// Route List groups
app.use('/listgroups', listgroupsRouter);
app.use('/listgroups/listGroups', listgroupsRouter);

// Route Send Wa
app.use('/sendwa', sendwaRouter);
app.use('/sendwa/send-message', sendwaRouter);
app.use('/sendwa/listSender', sendwaRouter);
app.use('/sendwa/version', sendwaRouter);
app.use('/broadcast', broadcastwaRouter);
app.use('/broadcast/send-broadcastwa', broadcastwaRouter);

// Route List schedule
app.use('/schedule', scheduleRouter);
app.use('/schedule/listSchedule', scheduleRouter);
app.use('/schedule/create', scheduleRouter);
app.use('/schedule/edit', scheduleRouter);
app.use('/schedule/update/:id', scheduleRouter);
app.use('/schedule/delete/:id', scheduleRouter);

app.use('/kontak', kontakRouter);
app.use('/kontak/listKontak', kontakRouter);
app.use('/kontak/create', kontakRouter);
app.use('/schedule/edit', scheduleRouter);
app.use('/kontak/update/:id', kontakRouter);
app.use('/kontak/delete/:id', kontakRouter);
app.use('/kontak/contacts', kontakRouter);

app.use('/reply', replyRouter);
app.use('/reply/listReply', replyRouter);
app.use('/reply/create', replyRouter);
app.use('/reply/update/:id', replyRouter);
app.use('/reply/delete/:id', replyRouter);
app.use('/reply/contacts', replyRouter);

app.use('/register', registerRouter);
app.use('/register/register', registerRouter);
app.use('/about', aboutRouter);
app.use('/configuration', configurationRouter);
app.use('/register/delete/:id', registerRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use('/inbox', liveChatsRouter);
app.use('/conversations', conversationsRouter);

var sockIO = require('socket.io')();
app.sockIO = sockIO;

const sessions = [];
const SESSIONS_FILE = './whatsapp-sessions.json';

const createSessionsFileIfNotExists = function () {
  if (!fs.existsSync(SESSIONS_FILE)) {
    try {
      fs.writeFileSync(SESSIONS_FILE, JSON.stringify([]));
      console.log('Sessions file created successfully.');
      loggers.debug('Sessions file created successfully');
    } catch (err) {
      console.log('Failed to create sessions file: ', err);
      loggers.debug('Failed to create sessions file: ', err);
    }
  }
};
createSessionsFileIfNotExists();

const setSessionsFile = function (sessions) {
  fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions), function (err) {
    if (err) {
      console.log(err);
    }
  });
};

const getSessionsFile = function () {
  var List = JSON.parse(fs.readFileSync(SESSIONS_FILE)).filter(function (
    entry
  ) {
    return entry;
  });
  return List;
  // return JSON.parse(fs.readFileSync(SESSIONS_FILE));
};

const createSession = function (id, userid, description) {
  let check = knex
    .transaction(function (trx) {
      knex('tbl_wa')
        .where({
          idwa: id,
        })
        .select('*')
        .then()
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(function (resp) {
      if (resp.length) {
        loggers.info('Session ' + id + ' Already exist!');
      } else {
        let Datapost = [
          {
            userid: userid,
            description: description,
            file: `session/session-${id}`,
            idwa: id,
          },
        ];

        knex
          .transaction(function (trx) {
            knex('tbl_wa')
              .transacting(trx)
              .insert(Datapost)
              .then()
              .then(trx.commit)
              .catch(trx.rollback);
          })
          .then(function (resp) {
            console.log(resp);
            loggers.debug('session Inserted successfully: ' + resp);
          })
          .catch(function (err) {
            console.log(err);
            loggers.debug('Error Creating session : ' + err);
          });
        loggers.debug('Session Created: ' + id);
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  const SESSION_FILE_PATH = `./session/session-${id}`;

  const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu',
      ],
    },
    authStrategy: new LocalAuth({
      clientId: id,
      dataPath: './session',
    }),
  });

  client.on('message_ack', async (msg, ack) => {
    if (ack == -1) {
      console.log('ACK_ERROR');
    } else if (ack == 0) {
      console.log('ACK_PENDING');
    } else if (ack == 1) {
      console.log('ACK_SERVER');
    } else if (ack == 2) {
      console.log('ACK_DEVICE');
    } else if (ack == 3) {
      console.log('ACK_READ');
    } else if (ack == 4) {
      console.log('ACK_PLAYED');
    }
  });

  client.on('change_state', async (newState) => {
    if (newState === 'CONFLICT') {
      console.log('CONFLICT detected');
    }
    if (newState === 'DEPRECATED_VERSION') {
      console.log('DEPRECATED VERSION detected');
    }
    if (newState === 'OPENING') {
      console.log('OPENING detected');
    }
    if (newState === 'PAIRING') {
      console.log('PAIRING detected');
    }
    if (newState === 'PROXYBLOCK') {
      console.log('PROXYBLOCK detected');
    }
    if (newState === 'SMB_TOS_BLOCK') {
      console.log('SMB_TOS_BLOCK detected');
    }
    if (newState === 'TIMEOUT') {
      console.log('TIMEOUT detected');
    }
    if (newState === 'TOS_BLOCK') {
      console.log('TOS_BLOCK detected');
    }
    if (newState === 'UNLAUNCED') {
      console.log('UNLAUNCED detected');
    }
    if (newState === 'UNPAIRED') {
      console.log('UNPAIRED detected');
    }
    if (newState === 'UNPAIRED_IDLE') {
      console.log('UNPAIRED_IDLE detected');
    }
  });

  client.on('message', async (msg) => {
    console.log('MESSAGE type', msg.type, msg.from);

    try {
      var reply = JSON.parse(fs.readFileSync('./reply.json', 'utf8'));

      reply.forEach((item, i) => {
        if (msg.body.toLowerCase() == item.body.toLowerCase()) {
          client.sendMessage(msg.from, item.reply);
        }
      });

      if (msg.body === '!command') {
        if (msg.body == '!command') {
          const { from } = msg;
          const chat = await msg.getChat();

          let someEmbed = new WwebjsSender.MessageEmbed()
            .sizeEmbed(24)
            .setTitle('What is your name?')
            .setDescription('Please type your name.')
            .setFooter('Question')
            .setTimestamp();

          let anotherEmbed = new WwebjsSender.MessageEmbed()
            .sizeEmbed(24)
            .setTitle('What is your age?')
            .setDescription('Please type your age.')
            .setFooter('Question')
            .setTimestamp();

          let collect = new WwebjsSender.Collector({
            client: client,
            chat: chat,
            time: 1000,
            number: from,
            max: [20, 3],
            question: ['What is your name?', 'What is your age?'],
            embed: [someEmbed, anotherEmbed],
          });

          collect.on('message', async (msg) => {
            let body = msg.body;
            console.log(body);
          });

          await collect.initialize();

          let resultMessageQuestion = await collect.messageQuestionCollcetor();
          let resultEmbedQuestion = await collect.embedQuestionCollector();

          console.log(resultMessageQuestion, resultEmbedQuestion);
        }
      }

      if (msg.body === '!groups') {
        client.getChats().then((chats) => {
          const groups = chats.filter((chat) => chat.isGroup);
          if (groups.length == 0) {
            msg.reply('You have no groups yet.');
          } else {
            let replyMsg = '*YOUR GROUPS*\n\n';
            groups.forEach((group, i) => {
              replyMsg +=
                '_You can use the group id to send a message to the group._';
              msg.reply(replyMsg);
            });
          }
        });
      } else if (msg.body === '!list') {
        let locations = [
          {
            title: 'Available properties in colony',
            rows: [
              {
                title: 'Register with HaivTech',
                description: 'desc',
              },
              {
                title: 'Register with Colony',
              },
            ],
          },
        ];

        let list = new List(
          'List body',
          'Available Properties',
          locations,
          'Available properties in colony',
          'footer'
        );

        client.sendMessage(msg.from, list);
      } else if (msg.body === '!info') {
        let info = client.info;

        client.sendMessage(
          msg.from,
          `
        *Connection info*
        User name: ${info.pushname}
        My number: ${info.wid.user}
        Platform: ${info.platform}
        `
        );
      } else if (msg.body === '!location') {
        msg.reply(
          new Location(37, 422, -122.084, 'Googleplex\nGoogle Headquarters')
        );
        client.sendMessage(
          msg.from,
          `
        *Connection info*
        User name: ${info.pushname}
        My number: ${info.wid.user}
        Platform: ${info.platform}
        `
        );
      } else if (msg.location) {
        msg.reply(msg.location);
      } else if (msg.body === '!buttons') {
        let button = new Buttons(
          'Button body',
          [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }],
          'title',
          'footer'
        );

        client.sendMessage(msg.from, button);
      } else if (msg.body === '!properties') {
        const LOCATION_FILE = './location.json';
        const data = () => {
          try {
            var data = JSON.parse(fs.readFileSync(LOCATION_FILE, 'utf-8'));
            return data;
          } catch (error) {
            console.log(error);
          }
        };

        console.log(data);
        let locations = [
          {
            title: 'Select your preferred location',
            rows: [
              {
                title: 'Register with HaivTech',
                description: 'desc',
              },
              {
                title: 'Register with Colony',
                description: 'desc',
              },
            ],
          },
        ];

        let list = new List(
          'We have a collection of available properties that can suit your taste. Feel at home!',
          'Available Properties',
          locations,
          'Available properties in colony',
          'footer'
        );

        client.sendMessage(msg.from, list);
      }

      if (msg.type === 'list_response') {
        msg.reply(`You've selected ${msg.body}`);
      }
    } catch (error) {
      console.log(error);
    }
  });

  client.initialize();

  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    var QRCode = require('qrcode');
    QRCode.toDataURL(qr, function (err, url) {
      sockIO.emit('qr', { id: id, src: url });
      sockIO.emit('message', {
        id: id,
        text: 'QR Code received, scan please!',
      });
      loggers.info('message', {
        id: id,
        text: 'QR Code received, scan please!',
      });
    });
  });

  client.on('ready', () => {
    sockIO.emit('ready', { id: id, description: description });
    sockIO.emit('message', { id: id, text: 'Whatsapp is ready!' });
    loggers.info('message', {
      id: id,
      text: 'Whatsapp is ready!',
    });
    const savedSessions = getSessionsFile();
    const sessionIndex = savedSessions.findIndex((sess) => sess.id == id);
    savedSessions[sessionIndex].ready = true;
    setSessionsFile(savedSessions);
  });

  client.on('authenticated', (session) => {
    sockIO.emit('authenticated', { id: id });
    sockIO.emit('message', { id: id, text: 'Whatsapp is authenticated!' });
    // fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    //   if (err) {
    //     console.error(err);
    //   }
    // });
  });

  client.on('auth_failure', function () {
    sockIO.emit('message', { id: id, text: 'Auth failure, restarting...' });
    loggers.debug('message Auth failure, restarting...');
  });

  schedule.scheduleJob('*/1 * * * *', async function () {
    client.on('disconnected', (reason) => {
      console.log(reason);
    });
  });

  client.on('delete-session', (data) => {
    console.log(data);
  });

  client.on('disconnected', (reason) => {
    sockIO.emit('message', { id: id, text: 'Whatsapp is disconnected!' });
    loggers.info('Whatsapp is disconnected! ' + reason);
    client.destroy();
    client.initialize();

    // Menghapus pada file sessions
    const savedSessions = getSessionsFile();
    const sessionIndex = savedSessions.findIndex((sess) => sess.id == id);
    savedSessions.splice(sessionIndex, 1);
    setSessionsFile(savedSessions);
    sockIO.emit('remove-session', id);

    setTimeout(async () => {
      fs.rmSync(`./session/session-${id}`, { recursive: true, force: true });
    }, 3000);
  });

  sessions.push({
    id: id,
    userid: userid,
    description: description,
    client: client,
  });

  const savedSessions = getSessionsFile();
  const sessionIndex = savedSessions.findIndex((sess) => sess.id == id);
  if (sessionIndex == -1) {
    savedSessions.push({
      id: id,
      userid: userid,
      description: description,
      ready: false,
    });
    setSessionsFile(savedSessions);
  }
};

const init = function (socket) {
  const savedSessions = getSessionsFile();
  if (savedSessions.length > 0) {
    if (socket) {
      socket.emit('init', savedSessions);
    } else {
      savedSessions.forEach((sess) => {
        createSession(sess.id, sess.userid, sess.description);
      });
    }
  }
};
init();

sockIO.on('connection', function (sockIO) {
  try {
    init(sockIO);
  } catch (error) {
    console.log(error);
  }
  sockIO.on('create-session', function (data) {
    loggers.debug('New session: ' + data.id);
    createSession(data.id, data.userid, data.description);
  });
});

app.get('/log', (req, res) => {
  res.sendFile(path.join(__dirname + '/logs.log'));
});

//send text message to group
app.post(
  '/send-group-text-message',
  [
    body('sender').notEmpty(),
    body('group').notEmpty(),
    body('caption').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 422,
        message: errors.mapped(),
      });
    }

    const sender = req.body.sender;
    const group = req.body.group;
    const caption = req.body.caption;

    // console.log(group, sender, caption);

    if (!sessions.find((sess) => sess.id == sender)) {
      return res.status(422).json({
        status: 422,
        message:
          'Client Not Found Please Create Whatsapp Account And Scan Barcode',
      });
    }

    const SESSION_FILE_PATHS = `./session/session-${sender}`;
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      return res.status(422).json({
        status: 422,
        message: 'Please Scan Barcode Now In App',
      });
    }

    const client = sessions.find((sess) => sess.id == sender).client;
    const groupToSend = await findGroupByName(client, group);

    if (!groupToSend) {
      loggers.info(
        'url:/api-v1/send-group-text-message message: No group found with the name:' +
          groupToSend
      );
      return res.status(422).json({
        status: 422,
        message: 'No group found with the name:' + groupToSend,
      });
    }

    const chatId = groupToSend.id._serialized;

    // const locationList = new List(
    //   'A list of available property will be sent to you!',
    //   'Please select a location!',
    //   [
    //     {
    //       title: 'Products list',
    //       rows: [
    //         { id: 'laje', title: 'Laje' },
    //         { id: 'adeyemi', title: 'Adeyemi' },
    //         { id: 'odoshida', title: 'Odoshida' },
    //       ],
    //     },
    //   ],
    //   'Please select a location!'
    // );

    client
      .sendMessage(chatId, caption)
      .then((response) => {
        loggers.debug(
          'url:/send-group-message message: Success send Groups: ' + chatId
        );
      })
      .catch((err) => {
        loggers.debug(
          'url:/send-group-message message: Error send Groups: ' + err
        );
        // res.status(500).json({
        //   status: true,
        //   response: err,
        // });
        req.flash('Error', 'There was a problem sending message!');
      });

    req.flash('success', 'Sent Whatsapp message successfully!');
    res.redirect('/listgroups');
  }
);

// API Send media message To Group
app.post(
  '/send-group-media-message',
  [
    body('sender').notEmpty(),
    body('group').notEmpty(),
    body('caption').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });

    if (!errors.isEmpty()) {
      loggers.info(
        'url:/api-v1/send-group-media-message message: ' + errors.mapped()
      );
      return res.status(422).json({
        status: 422,
        message: errors.mapped(),
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      loggers.info('url:/send-group-media message: No files were uploaded');
      req.flash('errors', 'No files were uploaded.');
      res.redirect('/listgroups');
    }

    const sender = req.body.sender;
    const groupName = req.body.group;
    const caption = req.body.caption;

    // cek akun barcode
    if (!sessions.find((sess) => sess.id == sender)) {
      return res.status(422).json({
        status: 422,
        message:
          'Client Not Found Please Create Whatsapp Account And Scan Barcode',
      });
    }
    const SESSION_FILE_PATHS = `./session/session-${sender}`;
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      loggers.info(
        'url:/api-v1/send-group-message message: Please Scan Barcode Now In App'
      );
      return res.status(422).json({
        status: 422,
        message: 'Please Scan Barcode Now In App',
      });
    }

    const client = sessions.find((sess) => sess.id == sender).client;
    const groupToSend = await findGroupByName(client, groupName);
    const chatId = groupToSend.id._serialized;

    if (!chatId) {
      if (!groupToSend) {
        loggers.info(
          'url:/api-v1/send-group-message message: No group found with the name:' +
            groupName
        );
        return res.status(422).json({
          status: 422,
          message: 'No group found with the name:' + groupName,
        });
      }
    }

    const file = req.files.file;
    const media = new MessageMedia(
      file.mimetype,
      file.data.toString('base64'),
      file.name
    );

    var result = await getValidasiQuota(req.session.email);

    if (result == true) {
      client
        .sendMessage(chatId, media, {
          caption: caption,
        })
        .then((response) => {
          loggers.debug(
            'url:/api-v1/send-group-message message: Success send Groups:' +
              chatId
          );
          // res.status(200).json({
          //   status: true,
          //   response: response,
          // });
        })
        .catch((err) => {
          loggers.debug(
            'url:/api-v1/send-group-message message: Error send Groups:' + err
          );
          // res.status(500).json({
          //   status: true,
          //   response: err,
          // });
        });
    }

    req.flash('success', 'Sent Whatsapp message successfully');
    res.redirect('/listgroups');
  }
);

app.post('/send-broadcast-excel', (req, res) => {
  let file = req.files.filename;
  let filename = file.name;
  let listNumber = [];
  const sender = req.body.sender;
  const message = req.body.message;
  let data_bn = new Date();

  let seconds = data_bn.getSeconds();
  file.mv('./public/excel/' + filename, (err) => {
    if (err) {
      return res.status(422).json({
        status: 422,
        message: err,
      });
    } else {
      let result = importExcel({
        sourceFile: './public/excel/' + filename,
        header: { row: 1 },
        sheets: ['Sheet1'],
      });

      console.log(result.Sheet1);

      for (let i = 0; i < result.Sheet1.length; i++) {
        listNumber.push(result.Sheet1[i].A);
      }

      listNumber.forEach((item, i) => {
        setTimeout(async () => {
          let kontak = phoneNumberFormatter(item);
          const client = sessions.find((sess) => sess.id == sender).client;
          const isRegisteredNumber = await client.isRegisteredUser(kontak);
          console.log(isRegisteredNumber);
          if (!isRegisteredNumber) {
            loggers.info('Not Registered Whatsapp');
            console.log(i + ' not register - ' + item + ' - ' + seconds);
            sockIO.emit('broadcastwa', {
              id: i,
              text: item + 'not register',
              type: 'warning',
            });
          }

          if (isRegisteredNumber) {
            client
              .sendMessage(kontak, message)
              .then((response) => {
                loggers.info(response);
                console.log(i + ' success - ' + item + ' - ' + seconds);
                sockIO.emit('broadcastwa', {
                  id: i,
                  text: item + 'success',
                  type: 'success',
                });
              })
              .catch((err) => {
                loggers.error(err);
                console.log(i + ' error - ' + item + ' - ' + seconds);
                sockIO.emit('broadcastwa', {
                  id: i,
                  text: item + 'error',
                  type: 'error',
                });
              });
          }
        }, i * 15000);
      });

      req.flash('Success', 'Broadcasting whatsapp message!');
      res.redirect('/broadcast');
    }
  });
});

// Send broadcast
app.post(
  '/api-v1/send-broadcast',
  [
    body('sender').notEmpty(),
    body('number').notEmpty(),
    body('message').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 422,
        message: errors.mapped(),
      });
    }
    const sender = req.body.sender;
    const message = req.body.message;
    const listNumber = req.body.number.split(',');

    // console.log(listNumber.length);

    if (!sessions.find((sess) => sess.id == sender)) {
      loggers.info(
        'url:/api-v1/send-broadcast Client Not Found Please Create Whatsapp Account And Scan Barcode'
      );
      return res.status(422).json({
        status: 422,
        message:
          'Client Not Found Please Create Whatsapp Account And Scan Barcode',
      });
    }

    const SESSION_FILE_PATHS = `./session/session-${sender}`;
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      return res.status(422).json({
        status: 422,
        message: 'Please Scan Barcode Now In App',
      });
    }

    let date_ob = new Date();
    let seconds = date_ob.getSeconds();

    listNumber.forEach((item, i) => {
      setTimeout(async () => {
        let kontak = phoneNumberFormatter(item);
        const client = sessions.find((sess) => sess.id == sender).client;
        const isRegisteredNumber = await client.isRegisteredUser(kontak);

        if (!isRegisteredNumber) {
          loggers.info('Not registered Whatsapp');
          console.log(i + ' not registered - ' + item + ' - ' + seconds);
          sockIO.emit('broadcastwa', {
            id: i,
            text: item + ' not registered',
            type: 'warning',
          });
        }

        if (isRegisteredNumber) {
          client
            .sendMessage(kontak, message)
            .then((response) => {
              loggers.info(response);
              console.log(i + ' success - ' + item + ' - ' + seconds);
              sockIO.emit('broadcastwa', {
                id: i,
                text: item + ' success',
                type: 'success',
              });
            })
            .catch((err) => {
              loggers.info(err);
              console.log(i + ' error - ' + item + ' - ' + seconds);
              sockIO.emit('broadcastwa', {
                id: i,
                text: item + ' error',
                type: 'error',
              });
            });
        }
      }, i * 15000);
    });

    req.flash('Success', 'Broadcasting whatsapp message!');
    res.redirect('/broadcast');
  }
);

// API Send message
app.post(
  '/api-v1/send-message',
  [
    body('sender').notEmpty(),
    body('number').notEmpty(),
    body('message').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 422,
        message: errors.mapped(),
      });
    }
    const sender = req.body.sender;
    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;

    if (!sessions.find((sess) => sess.id == sender)) {
      return res.status(422).json({
        status: 422,
        message:
          'Client Not Found Please Create Whatsapp Account And Scan Barcode',
      });
    }

    const SESSION_FILE_PATHS = `./session/session-${sender}`;
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      return res.status(422).json({
        status: 422,
        message: 'Please Scan Barcode Now In App',
      });
    }

    const client = sessions.find((sess) => sess.id == sender).client;
    const isRegisteredNumber = await client.isRegisteredUser(number);
    // cek kalau nomor hp terdaftar di wa
    if (!isRegisteredNumber) {
      loggers.info(
        'url:/api-v1/send-message message: The number is not registered'
      );
      return res.status(422).json({
        status: 422,
        message: 'The number is not registered',
      });
    }

    if (isRegisteredNumber) {
      var result = await getValidasiQuota(req.session.email);
      if (result) {
        client
          .sendMessage(number, message)
          .then((response) => {
            let Datapost = [
              {
                sender: sender,
                number: number,
                message: message,
                desc: 'message',
                status: 'terkirim',
              },
            ];
            knex
              .transaction(function (trx) {
                knex('tbl_message')
                  .transacting(trx)
                  .insert(Datapost)
                  .then()
                  .then(trx.commit)
                  .catch(trx.rollback);
              })
              .then(function (resp) {
                console.log(resp);
                res.status(200).json({
                  status: 200,
                  response: response,
                });
              })
              .catch(function (err) {
                loggers.error('url:/api-v1/send-message message: ' + err);
                console.log(err);
                res.status(500).json({
                  status: 500,
                  response: err,
                });
              });
          })
          .catch((err) => {
            loggers.error('url:/api-v1/send-message message: ' + err);
            res.status(500).json({
              status: 500,
              message: err,
            });
          });
      }
    }
  }
);

// API Send media
app.post(
  '/api-v1/send-media',
  [
    body('sender').notEmpty(),
    body('number').notEmpty(),
    body('caption').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      loggers.info(
        'url:/send-media message: ' + Object.values(errors.mapped())
      );
      req.flash('errors', Object.values(errors.mapped()));
      res.redirect('/sendwa');
      // return res.status(202).json({
      //   status: 202,
      //   message: errors.mapped(),
      // });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      loggers.info('url:/send-media message: No files were uploaded');
      req.flash('errors', 'No files were uploaded.');
      res.redirect('/sendwa');
      // return res.status(400).json({
      //   status: 400,
      //   message: 'No files were uploaded.',
      // });
    }
    const sender = req.body.sender;
    const caption = req.body.caption;
    const number = phoneNumberFormatter(req.body.number);
    // cek akun barcode
    if (!sessions.find((sess) => sess.id == sender)) {
      loggers.info(
        'url:/send-media message: Client Not Found Please Create Whatsapp Account And Scan Barcode'
      );
      req.flash(
        'errors',
        'Client Not Found Please Create Whatsapp Account And Scan Barcode.'
      );
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,
      //   message:
      //     'Client Not Found Please Create Whatsapp Account And Scan Barcode',
      // });
    }
    const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;
    // cek kalau belum scan barcode
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      loggers.info(
        'url:/send-media message: Client Not Found Please Create Whatsapp Account And Scan Barcode'
      );
      req.flash(
        'errors',
        'Client Not Found Please Create Whatsapp Account And Scan Barcode.'
      );
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,
      //   message: 'Please Scan Barcode Now In App',
      // });
    }

    const client = sessions.find((sess) => sess.id == sender).client;
    const isRegisteredNumber = await client.isRegisteredUser(number);
    if (!isRegisteredNumber) {
      loggers.info(
        'url:/api-v1/send-media-url message: The number is not registered'
      );
      return res.status(201).json({
        status: 201,
        message: 'The number is not registered',
      });
    }

    if (isRegisteredNumber) {
      var result = await getValidasiQuota(req.session.email);
      if (result == true) {
        const file = req.files.file;
        const media = new MessageMedia(
          file.mimetype,
          file.data.toString('base64'),
          file.name
        );
        client
          .sendMessage(number, media, {
            caption: caption,
          })
          .then((response) => {
            loggers.debug('url:/send-media message: success send wa ' + number);
            let Datapost = [
              {
                sender: sender,
                number: number,
                message: caption,
                desc: 'media',
                status: 'terkirim',
                userid: req.session.email,
              },
            ];
            knex
              .transaction(function (trx) {
                knex('tbl_message')
                  .transacting(trx)
                  .insert(Datapost)
                  .then()
                  .then(trx.commit)
                  .catch(trx.rollback);
              })
              .then(function (resp) {
                loggers.info(
                  'url:/send-media message: Insert Send Wa Media Successfully'
                );
                req.flash('success', 'Insert Send Wa Media Successfully.');
                res.redirect('/sendwa');
                console.log(resp);
                // res.status(200).json({
                //   status: 200,
                //   response: response,
                // });
              })
              .catch(function (err) {
                console.log(err);
                loggers.error('url:/send-media message: ' + err);
                req.flash('errors', err);
                res.redirect('/sendwa');
                // res.status(500).json({
                //   status: 500,
                //   response: err,
                // });
              });
          })
          .catch((err) => {
            loggers.info('url:/send-media message: ' + err);
            req.flash('errors', err);
            res.redirect('/sendwa');
            // res.status(500).json({
            //   status: 500,
            //   message: err,
            // });
          });
      } else {
        req.flash('errors', 'Quota Message exeeded.');
        res.redirect('/sendwa');
      }
    }
  }
);

// Form Send message
app.post(
  '/send-message',
  [
    body('sender').notEmpty(),
    body('number').notEmpty(),
    body('message').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      req.flash('errors', Object.values(errors.mapped()));
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,`
      //   message: errors.mapped()
      // });
    }
    const sender = req.body.sender;
    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;
    // cek akun barcode
    if (!sessions.find((sess) => sess.id == sender)) {
      req.flash(
        'errors',
        'Client Not Found Please Create Whatsapp Account And Scan Barcode'
      );
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,
      //   message: 'Client Not Found Please Create Whatsapp Account And Scan Barcode'
      // });
    }
    const SESSION_FILE_PATHS = `./session/session-${sender}`;
    // cek kalau belum scan barcode
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      req.flash('errors', 'Please Scan Barcode Now In App');
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,
      //   message: 'Please Scan Barcode Now In App'
      // });
    }
    const client = sessions.find((sess) => sess.id == sender).client;
    const isRegisteredNumber = await client.isRegisteredUser(number);
    // cek kalau nomor hp terdaftar di wa
    if (!isRegisteredNumber) {
      loggers.info('url:/send-media message: The number is not registered');
      req.flash('errors', 'The number is not registered');
      res.redirect('/sendwa');

      // return res.status(422).json({
      //   status: 422,
      //   message: 'The number is not registered'
      // });
    }
    if (isRegisteredNumber) {
      client
        .sendMessage(number, message)
        .then((response) => {
          let Datapost = [
            {
              sender: sender,
              number: number,
              message: message,
              desc: 'message',
              status: 'terkirim',
            },
          ];
          loggers.debug('url:/send-media message: success send ' + number);

          knex
            .transaction(function (trx) {
              knex('tbl_message')
                .transacting(trx)
                .insert(Datapost)
                .then()
                .then(trx.commit)
                .catch(trx.rollback);
            })
            .then(function (resp) {
              loggers.debug(
                'url:/send-media message: Sent Wa successfully ' + resp
              );

              req.flash('success', 'Message sent Successfully');
              res.redirect('/sendwa');
            })
            .catch(function (err) {
              console.log(err);
              loggers.error(
                'url:/send-media message: Failed to insert Wa ' + err
              );
            });
        })
        .catch((err) => {
          req.flash('errors', err);
          res.redirect('/sendwa');
          loggers.fatal('url:/send-media message: errors ' + err);
          // res.status(500).json({
          //   status: 500,
          //   message: err
          // });
        });
    }
  }
);

// Form Send media
app.post(
  '/send-media',
  [
    body('sender').notEmpty(),
    body('number').notEmpty(),
    body('caption').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      req.flash('errors', Object.values(errors.mapped()));
      res.redirect('/sendwa');

      // return res.status(202).json({
      //   status: 202,
      //   message: errors.mapped()
      // });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      loggers.info('url:/send-media message: No files were uploaded ');
      req.flash('errors', 'No files were uploaded.');
      res.redirect('/sendwa');

      // return res.status(400).json({
      //   status: 400,
      //   message: 'No files were uploaded.'
      // });
    }
    const sender = req.body.sender;
    const caption = req.body.caption;
    const number = phoneNumberFormatter(req.body.number);
    // cek akun barcode
    if (!sessions.find((sess) => sess.id == sender)) {
      loggers.info(
        'url:/send-media message: Client Not Found Please Create Whatsapp Account And Scan Barcode '
      );
      req.flash(
        'errors',
        'Client Not Found Please Create Whatsapp Account And Scan Barcode'
      );
      res.redirect('/sendwa');

      // return res.status(422).json({
      //   status: 422,
      //   message: 'Client Not Found Please Create Whatsapp Account And Scan Barcode'
      // });
    }
    const SESSION_FILE_PATHS = `./session/session-${sender}`;
    // cek kalau belum scan barcode
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      req.flash('errors', 'Please Scan Barcode Now In App');
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,
      //   message: 'Please Scan Barcode Now In App'
      // });
    }
    const client = sessions.find((sess) => sess.id == sender).client;
    const isRegisteredNumber = await client.isRegisteredUser(number);
    if (!isRegisteredNumber) {
      loggers.info('url:/send-media message: The number is not registered');
      req.flash('errors', 'The number is not registered');
      res.redirect('/sendwa');
      // return res.status(201).json({
      //   status: 201,
      //   message: 'The number is not registered'
      // });
    }

    if (isRegisteredNumber) {
      const file = req.files.file;
      const media = new MessageMedia(
        file.mimetype,
        file.data.toString('base64'),
        file.name
      );
      client
        .sendMessage(number, media, {
          caption: caption,
        })
        .then((response) => {
          loggers.debug('url:/send-media message: Success send wa ' + number);

          let Datapost = [
            {
              sender: sender,
              number: number,
              message: caption,
              desc: 'media',
              status: 'terkirim',
            },
          ];
          knex
            .transaction(function (trx) {
              knex('tbl_message')
                .transacting(trx)
                .insert(Datapost)
                .then()
                .then(trx.commit)
                .catch(trx.rollback);
            })
            .then(function (resp) {
              loggers.debug('url:/send-media message: Success send wa ');
              console.log(resp);
              req.flash('success', 'Message Media sent Successfully!');
              res.redirect('/sendwa');
            })
            .catch(function (err) {
              console.log(err);
              loggers.debug('url:/send-media message: ' + err);
              req.flash('errors', err);
              res.redirect('/sendwa');
              // res.status(500).json({
              //   status: 500,
              //   response: err
              // });
            });
        })
        .catch((err) => {
          loggers.debug('url:/send-media message: ' + err);
          req.flash('errors', err);
          res.redirect('/sendwa');
          // res.status(500).json({
          //   status: 500,
          //   message: err
          // });
        });
    }
  }
);

// API Send media URL
app.post(
  '/api-v1/send-media-url',
  [
    body('sender').notEmpty(),
    body('number').notEmpty(),
    body('caption').notEmpty(),
    body('file').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });

    if (!errors.isEmpty()) {
      loggers.info(
        'url:/send-media message: ' + Object.values(errors.mapped())
      );
      req.flash('errors', Object.values(errors.mapped()));
      res.redirect('/sendwa');
      // return res.status(202).json({
      //   status: 202,
      //   message: errors.mapped(),
      // });
    }

    const sender = req.body.sender;
    const caption = req.body.caption;
    const number = phoneNumberFormatter(req.body.number);

    if (!sessions.find((sess) => sess.id == sender)) {
      loggers.info(
        'url:/send-media message: Client Not Found Please Create Whatsapp Account And Scan Barcode'
      );
      req.flash(
        'errors',
        'Client Not Found Please Create Whatsapp Account And Scan Barcode.'
      );
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,
      //   message:
      //     'Client Not Found Please Create Whatsapp Account And Scan Barcode',
      // });
    }

    const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      loggers.info(
        'url:/send-media message: Client Not Found Please Create Whatsapp Account And Scan Barcode'
      );
      req.flash(
        'errors',
        'Client Not Found Please Create Whatsapp Account And Scan Barcode.'
      );
      res.redirect('/sendwa');
      // return res.status(422).json({
      //   status: 422,
      //   message: 'Please Scan Barcode Now In App',
      // });
    }
    const client = sessions.find((sess) => sess.id == sender).client;
    const isRegisteredNumber = await client.isRegisteredUser(number);
    if (!isRegisteredNumber) {
      loggers.info(
        'url:/api-v1/send-media-url message: The number is not registered'
      );
      return res.status(201).json({
        status: 201,
        message: 'The number is not registered',
      });
    }

    if (isRegisteredNumber) {
      var result = await getValidasiQuota(req.session.email);
      if (result == true) {
        const fileUrl = req.files.file;
        let mimetype;
        const attachment = await axios
          .get(fileUrl, {
            responseType: 'arraybuffer',
          })
          .then((response) => {
            mimetype = response.headers['content-type'];
            return response.data.toString('base64');
          });

        const media = new MessageMedia(mimetype, attachment, 'Media');
        client
          .sendMessage(number, media, {
            caption: caption,
          })
          .then((response) => {
            loggers.debug(
              'url:/send-media message: Message sent successfully! ' + number
            );
            let Datapost = [
              {
                sender: sender,
                number: number,
                message: caption,
                desc: 'media',
                status: 'terkirim',
                userid: req.session.email,
              },
            ];
            knex
              .transaction(function (trx) {
                knex('tbl_message')
                  .transacting(trx)
                  .insert(Datapost)
                  .then()
                  .then(trx.commit)
                  .catch(trx.rollback);
              })
              .then(function (resp) {
                loggers.info(
                  'url:/send-media message: Media Message sent Successfully!'
                );
                req.flash('success', 'Media Message sent Successfully!');
                res.redirect('/sendwa');
                console.log(resp);
                // res.status(200).json({
                //   status: 200,
                //   response: response,
                // });
              })
              .catch(function (err) {
                console.log(err);
                loggers.error('url:/send-media message: ' + err);
                req.flash('errors', err);
                res.redirect('/sendwa');
                // res.status(500).json({
                //   status: 500,
                //   response: err,
                // });
              });
          })
          .catch((err) => {
            loggers.info('url:/send-media message: ' + err);
            req.flash('errors', err);
            res.redirect('/sendwa');
            // res.status(500).json({
            //   status: 500,
            //   message: err,
            // });
          });
      } else {
        req.flash('errors', 'Quota Message exeede!');
        res.redirect('/sendwa');
      }
    }
  }
);

const findGroupByName = async function (client, name) {
  // console.log(client);
  const groupToSend = await client.getChats().then((chats) => {
    return chats.find(
      (chat) => chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
    );
  });
  return groupToSend;
};

// API Send Group message Url
app.post(
  '/api-v1/send-group-message-media-url',
  [
    body('id').custom((value, { req }) => {
      if (!value && !req.body.name) {
        throw new Error(`Invalid value, you can use 'id' or 'name'`);
      }
      return true;
    }),

    body('sender').notEmpty(),
    body('caption').notEmpty(),
    body('file').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });
    if (!errors.isEmpty()) {
      loggers.info(
        'url:/api-v1/send-group-message message: ' + errors.mapped()
      );
      return res.status(422).json({
        status: 422,
        message: errors.mapped(),
      });
    }
    const chatId = req.body.id;
    const sender = req.body.sender;
    const groupName = req.body.name;
    const caption = req.body.caption;

    // cek akun barcode
    if (!sessions.find((sess) => sess.id == sender)) {
      return res.status(422).json({
        status: 422,
        message:
          'Client Not Found Please Create Whatsapp Account And Scan Barcode',
      });
    }
    const SESSION_FILE_PATHS = `./session/-session-${sender}/Default/Platform Notifications`;
    // cek kalau belum scan barcode
    if (!fs.existsSync(SESSION_FILE_PATHS)) {
      loggers.info(
        'url:/api-v1/send-group-message message: Please Scan Barcode Now In App'
      );
      return res.status(422).json({
        status: 422,
        message: 'Please Scan Barcode Now In App',
      });
    }

    if (!chatId) {
      const group = await findGroupByName(groupName);
      if (!group) {
        loggers.info(
          'url:/api-v1/send-group-message message: No group found with the name:' +
            groupName
        );
        return res.status(422).json({
          status: 422,
          message: 'No group found with the name:' + groupName,
        });
      }
      chatId = group.id._serialized;
    }
    const client = sessions.find((sess) => sess.id == sender).client;
    const fileUrl = req.body.file;
    let mimetype;
    const attachment = await axios
      .get(fileUrl, {
        responseType: 'arrayBuffer',
      })
      .then((response) => {
        mimetype = response.headers['content-type'];
        return response.data.toString('base64');
      });

    const media = new MessageMedia(mimetype, attachment, 'Media');
    var result = await getValidasiQuota(req.session.email);

    if (result == true) {
      client
        .sendMessage(chatId, media, {
          caption: caption,
        })
        .then((response) => {
          loggers.debug(
            'url:/api-v1/send-group-message message: Success send Groups:' +
              chatId
          );
          res.status(200).json({
            status: true,
            response: response,
          });
        })
        .catch((err) => {
          loggers.debug(
            'url:/api-v1/send-group-message message: Error send Groups:' + err
          );
          res.status(500).json({
            status: true,
            response: err,
          });
        });
    }

    req.flash('Success', 'Progress Send Whatsapp');
    res.redirect('/broadcast');
  }
);

app.patch('/api-v1/is-registered-user/:number/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const number = phoneNumberFormatter(req.params.number);
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  client.isRegisteredUser(number).then(function (isRegistered) {
    if (isRegistered) {
      return res.status(200).json({
        status: true,
        message: 'registered',
      });
    } else {
      return res.status(404).json({
        status: false,
        message: 'Not Registered',
      });
    }
  });
});

app.get('/api-v1/get-buttons/:number/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const number = phoneNumberFormatter(req.params.number);
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  let sections = [
    {
      title: 'HaivTech',
      rows: [
        {
          title: 'Information',
          description: 'desc',
        },
        {
          title: 'Colny',
          description: 'desc',
        },
        {
          title: 'Scribes',
          description: 'desc',
        },
      ],
    },
  ];

  let list = new List(
    'Hello, how are you?',
    'HaivTech',
    sections,
    'HaivTech Limited',
    'footer'
  );

  client.sendMessage(number, list).then((response) => {
    return res
      .status(200)
      .json({
        status: 200,
        message: response,
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          message: err,
        });
      });
  });
});

app.get('/api-v1/location', async (req, res) => {
  const sender = req.params.clientId;
  const number = phoneNumberFormatter(req.params.number);
  const client = sessions.find((sess) => sess.id == sender).client;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let description = req.body.description;
  let location = new Location(latitude, longitude, description);

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  client.sendMessage(number, location).then((response) => {
    return res
      .status(200)
      .json({
        status: 200,
        message: response,
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          message: err,
        });
      });
  });
});

app.get('/api-v1/get-contacts/:number/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}Default/Platform Notification`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  let getContact = await client.getContacts();
  let result = [];

  for (const items of getContact) {
    if (items.isGroup == false && items.isMyContact == true) {
      var data = {
        number: items.number,
        name: items.name,
        shortName: items.shortName,
      };

      result[result.length] = data;
    }
  }

  return res.status(200).json({
    status: true,
    contact: result,
  });
});

app.get('/api-v1/get-labels/:number/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  let getLabels = await client.getContacts();
  let result = [];

  for (const items of getLabels) {
    result[result.length] = items;
  }

  return res.status(200).json({
    status: true,
    getLabels: result,
  });
});

app.get('/api-v1/get-image/:number/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const number = phoneNumberFormatter(req.params.number);
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  const contact = await client.getContactById(number);
  const getProfilePicUrl = await client.getProfilePicUrl(number);

  return res.status(200).json({
    profile: contact,
    image: getProfilePicUrl,
  });
});

app.get('/api-v1/get-all-chats/:number/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const number = phoneNumberFormatter(req.params.number);
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  var result = [];
  let chatsv2 = await client.getChats();

  const chat_activos = chatsv2.filter((c) => !c.isGroup);

  for (const n_chat of chat_activos) {
    var n_id = n_chat.id;
    let mensajes_verificar = await n_chat.fetchMessages();
    for (const items of mensajes_verificar) {
      result[result.length] = items;
    }
  }
  return res.status(200).json(result);
});

app.get('/api-v1/get-logout/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}Default/Platform Notification`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  const logout = await client.logout();
  return res.status(200).json({
    status: true,
    result: logout,
  });
});

app.get('/api-v1/replyById', async (req, res) => {
  const sender = req.params.clientId;
  const client = sessions.find((sess) => sess.id == sender).client;
  const number = phoneNumberFormatter(req.body.number);
  const message = req.body.message;
  const messageId = req.body.messageId;

  let options = {
    quotedMessageId: messageId,
  };

  const SESSION_FILE_PATHS = `./session/session-${sender}Default/Platform Notification`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  return res.status(200).json({
    status: true,
    result: logout,
  });
});

app.get('/api-v1/get-chat-count/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  const chats = await client.getChats();
  const chats22 = chats.filter((c) => !c.isGroup);
  let chatIds = chats22.map((c) => c.id._serialized);
  let chatCount = 0;

  for (const chatId of chatIds) {
    const chat = await client.getChatById(chatId);
    if (!chat) {
      console.log(`counld not serialize chat ${chatId}`);
    } else {
      chatCount++;
    }
  }

  return res.status(200).json({ count: chatCount });
});

app.put('/api-v1/filter-chat-from/:from/:clientId', async (req, res) => {
  const sender = req.params.clientId;
  const from = phoneNumberFormatter(req.params.from);
  const client = sessions.find((sess) => sess.id == sender).client;

  const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

  if (!fs.existsSync(SESSION_FILE_PATHS)) {
    loggers.info('url:/send-media message: Please Scan Barcode In App');
    return res.status(422).json({
      status: 422,
      message: 'Please Scan Barcode Now In App',
    });
  }

  const chats = await client.getChats();
  const chats22 = chats.filter((c) => !c.isGroup);
  let chatIds = chats22.map((c) => c.id._serialized);
  let chatCount = 0;

  console.log(chatIds);

  for (const chatId of chatIds) {
    const chat = await client.getChatById(chatId);
    if (!chat) {
      console.log(`could not serialize chat ${chatId}`);
    } else {
      chatCount++;
    }
  }

  return res.status(200).json({ count: chatCount });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/contact', (req, res) => {
  try {
    const listContacts = knex('tbl_contacts')
      .select('tbl_contacts.*')
      .then(function (records) {
        return records;
      });

    res.status(200).json({
      status: true,
      data: listContacts,
    });
  } catch (error) {
    console.log(error);
  }
});

const getContacts = async function () {
  try {
    const axios = require('axios');
    axios
      .get('http://localhost:3000/kontak/contacts')
      .then((response) => {
        return JSON.stringify(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const getValidasiQuota = async function (email) {
  try {
    var getQuota = knex.table('tbl_users').where('email', email);
    var getQuotaResult = await getQuota.select('quota').first();
    console.log(getQuotaResult.quota);

    var countMessage = knex.table('tbl_message').where('userid', email);
    var countMessageResult = await countMessage.count('id as CNT');
    console.log(countMessageResult[0].CNT);

    if (countMessageResult.quota == 0) {
      console.log('Quota exceeded!');
      return false;
    } else {
      console.log('Insert');
      var quotaBody = getQuotaResult.quota - 1;
      const update = await knex
        .table('tbl_users')
        .update({ quota: quotaBody })
        .where('email', email);
      console.log(update);
      return true;
    }
  } catch (error) {
    console.log('errors: ' + error);
  }
};

schedule.scheduleJob('*/1 * * * *', async function () {
  try {
    var dataJob = JSON.parse(fs.readFileSync('./schedule.json', 'utf8'));
    var listNumber = JSON.parse(fs.readFileSync('./kontak.json', 'utf8'));

    let date_ob = new Date();
    let date = ('0' + date_ob.getDate()).slice(-2);
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let hours = ('0' + date_ob.getHours()).slice(-2);
    let minutes = ('0' + date_ob.getMinutes()).slice(-2);
    let seconds = date_ob.getSeconds();

    let day = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;

    console.log('Global time ' + day + ':' + seconds);
    dataJob.forEach((itemDate, i) => {
      // console.log('current time ' + itemDate.date);
      if (day === itemDate.date) {
        console.log('Filter ' + itemDate.date);
        const sender = itemDate.sender;
        const message = itemDate.message;

        console.log(sender, message);

        if (!sessions.find((sess) => sess.id == sender)) {
          loggers.info(
            'url:/send-media message: Client Not Found Create Whatsapp Account and scan barcode'
          );
          return res.status(422).json({
            status: 422,
            message:
              'Client Not Found Create Whatsapp Account and scan barcode',
          });
        }

        let date_ob = new Date();
        let seconds = date_ob.getSeconds();

        listNumber.forEach((item, i) => {
          if (item.userid == itemDate.userid) {
            setTimeout(async () => {
              let kontak = phoneNumberFormatter(item.hp);
              const client = sessions.find((sess) => sess.id == sender).client;
              const SESSION_FILE_PATHS = `./session/session-${sender}/Default/Platform Notifications`;

              if (!fs.existsSync(SESSION_FILE_PATHS)) {
                loggers.info(
                  'url:/send-media message: Please Scan Barcode In App'
                );
                return res.status(422).json({
                  status: 422,
                  message: 'Please Scan Barcode Now In App',
                });
              }

              const isRegisteredNumber = await client.isRegisteredUser(kontak);
              if (!isRegisteredNumber) {
                loggers.info('Not registered Whatsapp');
                console.log(
                  i + ' not registered - ' + item.hp + ' - ' + seconds
                );
              }

              if (isRegisteredNumber) {
                client
                  .sendMessage(kontak, message)
                  .then((response) => {
                    let Datapost = [
                      {
                        sender: sender,
                        number: kontak,
                        message: message + ' - ' + itemDate.date,
                        desc: 'message',
                        status: 'terkirim',
                        userid: itemDate.userid,
                      },
                    ];

                    knex
                      .transaction(function (trx) {
                        knex('tbl_message')
                          .transacting(trx)
                          .insert(Datapost)
                          .then()
                          .then(trx.commit)
                          .catch(trx.rollback);
                      })
                      .then(function (resp) {
                        console.log(resp);
                        loggers.debug(resp);
                      })
                      .catch(function (err) {
                        loggers.error(
                          'url:/api-v1/send-message message:Failed Send wa ' +
                            err
                        );
                        console.log(err);
                      });

                    console.log(i + ' success - ' + item.hp + ' - ' + seconds);
                  })
                  .catch((err) => {
                    console.log(i + 'error - ' + item.hp + ' - ' + seconds);
                    loggers.debug(err);
                  });
              }
            }, i * 1500);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
