
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#massage-1')
const massageTwo = document.querySelector('#massage-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

   const city = search.value
   massageOne.textContent = ''
   massageTwo.textContent = ''

   fetch(`http://localhost:3000/weather?address=${city}`).then((response) => {
    response.json().then((data) =>{
        if(data.error) 
        {
            massageOne.textContent = data.error
        }
        else
        {   
       
            massageOne.textContent = data.location
            massageTwo.textContent = data.forecast

        }
    })
})

})