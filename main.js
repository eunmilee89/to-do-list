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
let taskList = [];
addButton.addEventListener("click", addTask);


function addTask(){
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = "";

    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task task-done">
                    <span >
                        ${taskList[i].taskContent}
                    </span>
                    <div class="no-space">
                        <button onclick="togglecomplete('${taskList[i].id}')">
                            <i class="fa-solid fa-rotate-left" style="color: #9FA0AE;"></i>
                        </button>
                        <button onclick="deleteTask('${taskList[i].id}')" class="trashcan">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>`
        }
        else{
            resultHTML += `<div class="task">
            <span>
                ${taskList[i].taskContent}
            </span>
            <div class="no-space">
                <button onclick="togglecomplete('${taskList[i].id}')">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="deleteTask('${taskList[i].id}')" class="trashcan">
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
    render();
    console.log(taskList);
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
    render();
     
}