const data = {
  labels: ['Cognitive Skills', 'Work Preference', 'Personal', 'SoftSkill', 'Coding', 'MatchJob'],
  datasets: [
    {
      label: 'first',
      backgroundColor: 'rgba(255,143 ,0, 0.55)',
      borderColor: 'rgba(255,143 ,0, 1)',
      pointBackgroundColor: 'rgba(255,143 ,0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,143 ,0, 1)',
      data: [28, 48, 40, 19, 96, 27]
    },
    {
      label: 'second',
      backgroundColor: 'rgba(61 ,200, 133,0.5)',
      borderColor: 'rgba(61 ,200, 133,1)',
      pointBackgroundColor: 'rgba(61 ,200, 133,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(61 ,200, 133,1)',
      data: [65, 59, 90, 81, 56, 55],

    }
  ]
};

export {
  data
}
