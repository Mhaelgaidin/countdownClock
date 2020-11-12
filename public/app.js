const events = []
if (localStorage.getItem('savedEvents')) {
  let savedEvents = JSON.parse(localStorage.getItem('savedEvents'))
  savedEvents.forEach((event) => {
    events.push({ name: event.name, date: new Date(event.date) })
  })
}

document.querySelector('#newEvent').addEventListener('submit', (e) => {
  e.preventDefault()
  let newEvent = {
    name: e.target.eventName.value,
    date: new Date(e.target.eventDate.value + ' ' + e.target.eventTime.value),
  }

  if (validDate(newEvent.date)) {
    document.querySelector('#warning').classList.add('hidden')
    events.push(newEvent)
    localStorage.setItem('savedEvents', JSON.stringify(events))
    e.target.reset()
    showEvents()
  } else {
    document.querySelector('#warning').classList.remove('hidden')
  }
})

function validDate(newDate) {
  let currentDate = new Date()
  if (newDate < currentDate) {
    return false
  }
  if (newDate <= currentDate && newDate.getTime() < currentDate.getTime()) {
    return false
  } else {
    return true
  }
}

function showEvents() {
  let eventList = document.querySelector('#eventList')
  eventList.innerHTML = ''
  if (events.length > 0) {
    events.forEach((event, index) => {
      let countdown = timetoEvent(event.date)
      let element = document.createElement('div')
      if (countdown.days < 10) {
        countdown.days = '0' + countdown.days
      }
      if (countdown.hours < 10) {
        countdown.hours = '0' + countdown.hours
      }
      if (countdown.mins < 10) {
        countdown.mins = '0' + countdown.mins
      }
      if (countdown.secs < 10) {
        countdown.secs = '0' + countdown.secs
      }
      if (!countdown.complete) {
        element.innerHTML = `
        <h3>${event.name}</h3>
        <div class="countdown">
        <div><h4>Days</h4><p>${countdown.days}</p></div>
        <div><h4>Hours</h4><p>${countdown.hours}</p></div>
        <div><h4>Mins</h4><p>${countdown.mins}</p></div>
        <div><h4>Secs</h4><p>${countdown.secs}</p></div>
        </div> 
        <button onclick="remove(${index})"><i class="fas fa-trash"></i></button>
        `
      } else {
        element.innerHTML = `
        <h3>${event.name}</h3>
        <p>Event Reached!</p> 
        <button onclick="remove(${index})"><i class="fas fa-trash"></i></button>
        `
      }

      eventList.appendChild(element)
    })
  }
}

function remove(index) {
  events.splice(index, 1)
  localStorage.setItem('savedEvents', JSON.stringify(events))
  showEvents()
}

function timetoEvent(date) {
  let countdown = {
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    complete: false,
  }
  let currentDate = new Date()
  let difference = date - currentDate
  if (difference <= 0) {
    countdown.complete = true
    return countdown
  }
  countdown.days = Math.floor(difference / (1000 * 60 * 60 * 24))
  difference = difference - countdown.days * (1000 * 60 * 60 * 24)
  countdown.hours = Math.floor(difference / (1000 * 60 * 60))
  difference = difference - countdown.hours * (1000 * 60 * 60)
  countdown.mins = Math.floor(difference / (1000 * 60))
  difference = difference - countdown.mins * (1000 * 60)
  countdown.secs = Math.floor(difference / 1000)

  return countdown
}

window.setInterval(showEvents, [1000])
