const fn = 'roster.json'
const teamCount = 3
const btnAssign = document.getElementById('btnAssign')

let teamTotals = []
let students = []
let assigned = 1
let studentCount = 0

const AssignNext = () => {
  if (assigned < studentCount + 1) {
    const randomStudent = students[Math.floor(Math.random() * students.length)]
    let randomTeam = Math.floor(Math.random() * teamCount) + 1

    if (teamTotals[randomTeam] < 4) {
      const index = students.indexOf(randomStudent)

      if (index !== -1) {
        const teamList = document.querySelector(`.team-${randomTeam}`)
        const li = document.createElement('li')
        const text = document.createTextNode(randomStudent)
        li.appendChild(text)
        teamList.appendChild(li)

        const currentStudent = document.querySelector(
          `[data-name="${randomStudent}"]`
        )
        currentStudent.innerHTML = `<s>${currentStudent.dataset.name}</s>`

        students.splice(index, 1)
        teamTotals[randomTeam]++
        assigned++
      }
    } else {
      AssignNext()
    }
  } else {
    btnAssign.disabled = true
  }
  return
}

const Assign = () => {
  const timer = window.setInterval(() => {
    if (assigned === studentCount + 1) {
      clearInterval(timer)
    }
    AssignNext()
  }, 1000)
}

const BuildStudentList = () => {
  const list = document.querySelector('.students')
  students.forEach((element) => {
    const item = document.createElement('li')
    const name = document.createTextNode(element)
    item.dataset.name = element
    item.appendChild(name)
    list.appendChild(item)
  })
}

const InitTeamsArray = () => {
  teamTotals[0] = null
  for (let i = 1; i <= teamCount; i++) {
    teamTotals[i] = 0
  }
}

const BuildScoreLists = () => {
  const teams = document.querySelector('.teams')
  for (let i = 1; i <= teamCount; i++) {
    const ul = document.createElement('ul')
    ul.classList.add('team')
    ul.classList.add(`team-${i}`)
    teams.appendChild(ul)
  }
}

const init = () => {
  BuildStudentList()
  InitTeamsArray()
  BuildScoreLists()
}

const request = async () => {
  const response = await fetch(fn)
  const json = await response.json()
  students = json.students
  studentCount = json.students.length
  init()
}

btnAssign.addEventListener('click', Assign)

request()
