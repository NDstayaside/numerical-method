import {React, Component} from "react";
import Form from "react-bootstrap/Form";
import './itrytodecsohard.css'

class NewtonDiff extends Component{
    constructor(){
        super();
        console.log("constructor called");
    }
    componentDidMount(){
        console.log("componentDidMount called");
    }
    createInputMatrix(){
        //var
        var N = document.getElementById("matrixSize").value;
        var MatString = ''
        var n = parseInt(N)

        if (N !== ''){
            MatString += "<div><Form.Label class = 'forMatrix' style={{margin:'1% auto'}}>Input x and y </Form.Label></div>"
        
            for (var i = 0; i < n; i++){
                MatString+="<input id='inputA"+i+0+"' type='number'  placeholder='x"+i+"' style='width:13%; margin:1% auto;'/>"
                MatString+="<span> </span>"
                MatString+="<input id='inputA"+i+1+"' type='number'  placeholder='y"+i+"' style='width:13%; margin:1% auto;'/>"
                MatString+="<br>"
            }
        }

        //sent out
        document.getElementById("generateMatrix").innerHTML = MatString;
    }
    getVariable(){
        //statement
        var N = document.getElementById("matrixSize").value
        var n = parseInt(N)
        var X = document.getElementById("getX").value;
        var x = parseInt(X)
        var sum = 0

        //method
        function C(mat,i,j) {  //find C
            if ( i === 0 && j === 0){
                return mat[i][1]    //return f(x)
            }
            else if (i-j > 1){
                return (C(mat,i,j+1) - C(mat,i-1,j))/(mat[i][0]-mat[j][0])
            }
            else{
                return (mat[i][1] - mat[j][1]) / (mat[i][0]-mat[j][0])
            }
        }

        //set matrix
        var mat = new Array(n);
        for(let i = 0; i < n; i++){
            mat[i] = new Array(2);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < 2; j++) {
                var NUM = document.getElementById("inputA"+i+j+"").value
                var num = Number(NUM)
                mat[i][j] = num
            }
        }
        //console.table(mat)

        //calculate
        for (var i = 0; i < mat.length; i++) {
    
            var c = C(mat,i,0)
            var sumMul = 1
            console.log(c)
            for (var k = 0; k < i; k++){
                sumMul = sumMul * (x - mat[k][0])
            }
            //console.log(sumMul)
            sum += c * sumMul 
        }
        

        var showans = ''
        showans += '<h3>Answer here lah:</h3>'
        showans += sum + '<br>'
        
        
        //sent out
        document.getElementById("showAns").innerHTML = showans;
    }
    render(){
        return(
            <div>
                <h3>Newton's Divided-Differents</h3>
                <Form>
                        <Form.Group class="mb-3">
                            <Form.Label class = 'secoundHead' style={{margin:"1% auto"}}>
                                Input your matrix size
                            </Form.Label>
                            {/* f(x) */}
                            <Form.Control id="matrixSize" type="number" step="1" placeholder="Enter matrix size" style={{width:"35%", margin:"1% auto"}} onChange={this.createInputMatrix}></Form.Control>
                            
                            <div class = 'secoundHead' id = "generateMatrix"></div>

                            <Form.Control id="getX" type="number" step="1" placeholder="Enter x" style={{width:"35%", margin:"1% auto"}}></Form.Control>

                            <button type="button" class="btn btn-dark" style={{margin:"1% auto"}} onClick={this.getVariable}>Calculate</button>
                        </Form.Group>
                    </Form>
                <div id = 'showAns' class="showAnswer"></div>
            </div>
        )
    }
}
export default NewtonDiff;