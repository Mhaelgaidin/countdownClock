const events = []

document.querySelector('#newEvent').addEventListener('submit', (e) => {
  e.preventDefault()
  let newEvent = {
    name: e.target.eventName.value,
    date: new Date(e.target.eventDate.value + ' ' + e.target.eventTime.value),
  }

  if (validDate(newEvent.date)) {
    document.querySelector('#warning').classList.add('hidden')
    events.push(newEvent)
    console.log(events)
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
