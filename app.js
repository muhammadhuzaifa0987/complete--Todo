window.addEventListener("load", () => {
    console.log(localStorage.getItem("user"));
    if (!localStorage.getItem("user")) {
      window.location.replace("./login.html");
    }
  });
  
  import {
    addDoc,
    collection,
    db,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
  } from "./firebase.js";
  
  const todoCollection = collection(db, "todos");
  const todoParent = document.querySelector(".parent");
  console.log("todoParent", todoParent);
  
  const addTodo = async () => {
    try {
      const todoInput = document.getElementById("input");
      console.log("todoInput", todoInput.value);
      if (todoInput.value.length < 3) {
        alert("Enter correct value");
        return;
      }
      const todoObj = {
        value: todoInput.value,
      };
     // delete function
      const deleteAll = async () =>{
        try{
          const querysnapshot = await getDocs(todoCollection);
          querysnapshot.forEach((doc)=> {
            deleteDoc(doc.ref);
            });
          getTodos();
        }
        catch(error){
          alert("Something Went Wrong!");
          }
        };
      
  
      const res = await addDoc(todoCollection, todoObj);
      getTodos();
      console.log("res", res.id);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  const getTodos = async () => {
    try {
      const querySnapshot = await getDocs(todoCollection);
      let todoArr = [];
      // 1 way
      // querySnapshot.forEach((doc) => {
      //     const obj = {
      //         id: doc.id,
      //         ...doc.data()
      //     }
      //     todoArr.push(obj)
  
      // })
  
      // for (var obj of todoArr) {
      //     todoParent.innerHTML += `<div class="card my-3 " style="width: 18rem;">
      //         <div class="card-body">
      //             <h5 class="card-title"> ${obj.value} </h5>
      //             <button class="btn btn-info">EDIT</button>
      //             <button class="btn btn-danger">delete</button>
      //         </div>
      //     </div>`
      // }
  
      // 2 way
      todoParent.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        todoArr.push(obj);
        // console.log("obj", obj)
        todoParent.innerHTML += `<div class="card my-3 " style="width: 18rem;">
                  <div class="card-body">
                      <h5 class="card-title"> ${obj.value} </h5>
                      <button class="btn btn-info" 
                          id=${obj.id}
                          onclick="editTodo(this)"
                      >EDIT</button>
                      <button class="btn btn-danger" id=${obj.id}  onclick="deleteTodo(this)" >delete</button>
                  </div>
              </div>`;
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  const deleteTodo = async (ele) => {
    console.log("deleteTodo", ele.id);
    try {
      await deleteDoc(doc(db, "todos", ele.id));
      getTodos();
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const editTodo = async (ele) => {
    try {
      console.log("ele", ele.id);
      const editValue = prompt("Enter Edit Value");
      await updateDoc(doc(db, "todos", ele.id), {
        value: editValue,
      });
      getTodos();
      console.log("editValue", editValue);
    } catch (error) {
      console.log("error", error.message);
    }
  };
   function deleteALL(){
    try{
      localStorage.clear();
    }
    catch{
      alert("No todos to delete");
    }
   }

  function logoutBtn() {
  localStorage.removeItem("user");
  localStorage.clear();
  window.location.replace("./login.html");
}
  
  window.addEventListener("load", getTodos);
  window.addTodo = addTodo;
  window.deleteALL = deleteALL;
  window.deleteTodo = deleteTodo;
  window.editTodo = editTodo;
  window.logoutBtn = logoutBtn;
