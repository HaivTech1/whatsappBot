var socket = io();

socket.on('connect', function () {
  console.log('Connected');
});

//emit events

//listen to event
socket.on('newMessage', function (message, callback) {
  const formattedTime = moment(message.createdAt).format('LT');

  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime,
  });

  const div = document.createElement('div');
  div.innerHTML = html;
  document.querySelector('#messages').appendChild(div);
});

socket.on('newLocationMessage', function (message) {
  console.log('new Location Message', message.url);
  const formattedTime = moment(message.createdAt).format('LT');

  const template = document.querySelector(
    '#location-message-template'
  ).innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });

  const div = document.createElement('div');
  div.innerHTML = html;
  document.querySelector('#messages').appendChild(div);
});

socket.on('disconnect', function () {
  console.log('disconnected from server!');
});

// socket.emit(
//   'createMessage',
//   {
//     from: 'John',
//     text: 'Hey',
//   },
//   function (message) {
//     console.log(message, 'Got it');
//   }
// );

document.querySelector('#submit-btn').addEventListener('click', function (e) {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'user',
      text: document.querySelector('input[name="message"]').value,
    },
    function () {}
  );
});

document
  .querySelector('#send-location')
  .addEventListener('click', function (e) {
    e.preventDefault();

    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function () {
        alert('Unable to grab location.');
      }
    );
  });
