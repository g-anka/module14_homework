//написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль


const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentNode = listNode.querySelectorAll("student");

function studentArray(studentNode) {
  let resultStudent = [];
  studentNode.forEach(function(Item, index) {
     const studentName = Item.querySelector("name");
     const firstName = Item.querySelector("first");
     const secondName = Item.querySelector("second");
     const studentAge = Item.querySelector("age");
     const studentProf = Item.querySelector("prof");
     const langAttr = studentName.getAttribute("lang");
  
     resultStudent[index] = {
     name: `${firstName.textContent} ${secondName.textContent}`,
     age: Number(studentAge.textContent),
     prof: studentProf.textContent,
     lang: langAttr};
     })
  return resultStudent;
}

const result = {
  [listNode.tagName]: studentArray(studentNode)
};

console.log(result);