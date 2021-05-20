// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector(".result");

// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector(".btn-request");
  
// На кнопку вешаем обработчик
btnNode.addEventListener('click', () => {

 // Получение данных из input-ов
const value1 = document.querySelector('#input1').value;
const value2 = document.querySelector('#input2').value;

//Проверяем, чтоб строка состояла только из цифр
  if (value1.match(/^\d+$/) && value2.match(/^\d+$/)) {
    //Если вернется true, то пишем условие, когда эти числа не входят в диапазон от 100 до 300
    if ((value1 < 100 || value1 >300) || (value2 < 100 || value2 > 300)) {
      resultNode.innerHTML = "Одно из чисел вне диапазона от 100 до 300"; 
    //Если цифры входят в диапазон от 100 до 300, делается запрос
  } else {
        fetch(`https://picsum.photos/${value1}/${value2}`)
        .then ((response) => { 

          resultNode.innerHTML = `
          <div class="card">
        <img
          src="${response.url}"
          class="card-image"
        />
    `;})
        .catch (() => {resultNode.innerHTML = "Произошла ошибка";});
    } 
   //Если возвращает false, то прописываем ошибку 
  } else {
        resultNode.innerHTML = "Вы ввели не число"
    }
});
