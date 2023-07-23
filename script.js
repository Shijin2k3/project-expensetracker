var state={
balance:1000,
income:400,
expense:550,
transactions:[

]
   

}
var balanceEl=document.querySelector('#balance');
var incomeEl=document.querySelector('#income');
var expenseEl=document.querySelector('#expense');
var transactionsEl=document.querySelector('#transaction');
var incomebtnEl=document.querySelector('#incomebtn');
var expensebtnEl=document.querySelector('#expensebtn');
var nameInputEl=document.querySelector('#name');
var amountInputEl=document.querySelector('#amount');

function init(){
    var localState=JSON.parse(localStorage.getItem('expenseTrackerState'));
    if(localState !== null){
        state=localState;
        
    }
    updatestate();
    initListeners();
    
}
function uniqueId(){
    return Math.round(Math.random()* 100000);
}
function initListeners(){
incomebtnEl.addEventListener('click',onAddIncomeClick);
expensebtnEl.addEventListener('click',onAddExpenseClick);
}
function onAddIncomeClick(){
    addTransaction(nameInputEl.value,amountInputEl.value,'income');
}
function addTransaction(name,amount,type){
    if(name !== '' && amount !==''){
        var transaction={
            id:uniqueId(),
            name:name,
            amount:parseInt(amount),
            type:type
    };
    state.transactions.push(transaction);
    updatestate();
    }else{
        alert('Please enter valid data')
    }  
    nameInputEl.value='';
    amountInputEl.value='';
}
function onAddExpenseClick(){
   addTransaction(nameInputEl.value,amountInputEl.value,'expense');
}
function onDeleteClick(event){
    var id=parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for(var i=0;i<state.transactions.length;i++){
        if(state.transactions[i].id===id){
           deleteIndex=i ;
           break;
        }

    }
    state.transactions.splice(deleteIndex,1);
    updatestate();
}
function updatestate(){
    var balance=0,
    income=0,
    expense=0,
    item;
    for(var i=0;i<state.transactions.length;i++){
       item=state.transactions[i];
       if(item.type==='income'){
          income+=item.amount;
       }else if(item.type==='expense'){
        expense+=item.amount;
       }
    }
    balance=income-expense;

    state.balance=balance;
    state.income=income;
    state.expense=expense;

  localStorage.setItem('expenseTrackerState',JSON.stringify(state));

    render();
}
function render(){
    balanceEl.innerHTML=`Rs ${state.balance}`;
    incomeEl.innerHTML=`Rs ${state.income}`;
    expenseEl.innerHTML=`Rs ${state.expense}`;

    var transactionEl,containerEl,amountEl,item,btnEl;
    transactionsEl.innerHTML='';
    for( var i=0; i<state.transactions.length;i++){
        item=state.transactions[i];
        transactionEl=document.createElement('li');
        transactionEl.append(item.name);

        transactionsEl.appendChild(transactionEl);

        containerEl= document.createElement('div');
        amountEl=document.createElement('span');
        if(item.type=='income'){
            amountEl.classList.add('income-amt');
        }
        else if(item.type=='expense'){
            amountEl.classList.add('expense-amt');
           
        }
        amountEl.innerHTML=`Rs ${item.amount}`;

        containerEl.appendChild(amountEl);
        btnEl=document.createElement('button');
        btnEl.setAttribute('data-id',item.id)
        btnEl.innerHTML='X';
        btnEl.addEventListener('click',onDeleteClick);
        containerEl.appendChild(btnEl);

        transactionEl.appendChild(containerEl);
       

        
    }


}


init();