window.addEventListener("load", () => {
    if (localStorage.getItem("user")) {
      window.location.replace("./index.html");
    }
  });
  
  
import { auth , signInWithEmailAndPassword} from "./firebase.js"
const logInBtn = async ()=>{
    try {
        const email = document.querySelector("#email")
        const password = document.querySelector("#password")
        const responce = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        )
        console.log("responce" , responce.user.uid);
        localStorage.setItem("user",responce.user.uid)
        window.location.href = "./index.html"
    } catch (error) {
        console.log("error", error.message);
    }
}


window.logInBtn = logInBtn;