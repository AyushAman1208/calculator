console.log('Hey there')

let result=0
let currNum=''

let currChar=''

function calculations(){

    
    

    if(currChar=='+'){
        result= result + parseInt(currNum)
        currNum=''
    }

    else if(currChar=='x'){
        result*=parseInt(currNum)
        currNum=''
    }

    else if(currChar=='/'){
        result/=parseInt(currNum)
        currNum=''
    }

    else if(currChar=='-'){
        result-=parseInt(currNum)
        currNum=''
    }

    else if(currChar=='x>'){
        currNum=currNum.substring(0,currNum.length-1)
        
    }

    else if(currChar=='='){
        console.log(result)
        

        
        let x = document.getElementsByClassName('results')
        x[0].innerHTML=result
        result=0
        currNum=''
        
    }

    else{
        currNum+=currChar
        console.log(currChar,currNum)
    }
    document.getElementById('input').innerHTML=currNum
    if(currChar=='=')document.getElementById('input').innerHTML=0

}

Array.from(document.getElementsByTagName('button')).forEach((element)=>{
    
    element.addEventListener('click',(e)=>{
        
        let val=e.target.id
        console.log(val)
        console.log('reached here')
        currChar=val
        calculations()
    })
})

