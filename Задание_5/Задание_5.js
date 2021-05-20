// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector(".result");

// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector(".btn-request");

//Функция обработки полученного результата
async function displayResult(data) {
  let cards = '';
  
  data.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
    
  resultNode.innerHTML = cards;
}
  
// На кнопку вешаем обработчик
btnNode.addEventListener('click', () => {
 // Получение данных из input-ов
const pageNumber = document.querySelector('#input1').value;
const limit = document.querySelector('#input2').value;

  if ((!pageNumber.match(/^\d+$/) || pageNumber < 1 || pageNumber > 10) && (limit >= 1 && limit <= 10)) {
      resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    
  } else if ((!limit.match(/^\d+$/) || limit < 1 || limit > 10) && (pageNumber >= 1 && pageNumber <= 10)) {
      resultNode.innerHTML = "Лимит вне диапазона от 1 до 10";
    
  } else if ((!pageNumber.match(/^\d+$/) || pageNumber < 1 || pageNumber > 10) && (!limit.match(/^\d+$/) || limit < 1 || limit > 10)) {
      resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    
  } else {
      fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
          .then ((response) => {return response.json();;})
          .then ((data) =>  {
            localStorage.setItem("lastData", JSON.stringify(data))
            //const myData = localStorage.getItem("lastData")
           //console.log(myData)
            return displayResult(data); })
          .catch (() => {resultNode.innerHTML = "Произошла ошибка";});
      } 
});


document.addEventListener("DOMContentLoaded", () => {
  
  if (localStorage.getItem("lastData")) {
    displayResult(JSON.parse(localStorage.getItem("lastData")));
  }
})