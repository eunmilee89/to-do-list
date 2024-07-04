//유저가 값을 입력한다
// + 버튼을 클릭하면 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check버튼을 클릭하는 순간 true 
//2. true면 끝난 걸로 간주하고 밑줄
//3. false면 그대로

// 진행 중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode='all';
let filterList = [];

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  });


  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
      filter(event);
    });
  }

for(i=0;i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    })
}



function addTask(){
    let taskValue = taskInput.value;
    if(taskValue === ""){
        return alert("내용을 추가해주세요.");
    }

    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    taskInput.value = "";
    render();
}

function render(){
    
    let list = [];
    if(mode === "all"){
        list = taskList;
    } else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    } 

    let resultHTML = "";

    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task task-done">
                    <span >
                        ${list[i].taskContent}
                    </span>
                    <div class="no-space">
                        <button onclick="togglecomplete('${list[i].id}')">
                            <i class="fa-solid fa-rotate-left" style="color: #9FA0AE;"></i>
                        </button>
                        <button onclick="deleteTask('${list[i].id}')" class="trashcan">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>`
        }
        else{
            resultHTML += `<div class="task">
            <span>
                ${list[i].taskContent}
            </span>
            <div class="no-space">
                <button onclick="togglecomplete('${list[i].id}')">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')" class="trashcan">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>`
        }

       
    }
    document.getElementById("task-board").innerHTML  = resultHTML;
}

function togglecomplete(id) {
   
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function randomIdGenerate(){
    return Math.random().toString(36).substr(2, 16);
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    filter();
     
}

function filter(event){
    if(event){
        mode = event.target.id;    
        underLine.style.left = event.currentTarget.offsetLeft + "px";
        underLine.style.width = event.currentTarget.offsetWidth + "px";
        underLine.style.top = 
            event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
    }
    
    
    filterList = [];

    if(mode === "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
    } else if(mode === "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}