import React, { Component } from "react";
import api from "../Pessoas/api";
import './Task.css';
class Task extends Component{

    state={
        nomes:[],
    }

    async componentDidMount(){
        const response = await api.get('');

        this.setState({nomes: response.data});

    }

    render(){

        const {nomes} = this.state;
        
        return(
            <body>
                <div>
                    <h1>teste</h1>
                    {console.log(nomes)}
                    {nomes.map(nome =>(
                     <li Key={nome.id_pessoa}>
                          <h2>
                            {nome.nome_pessoa}
                          </h2>                      
                     </li>   
                    ))}
                </div>
            </body>
        )
    }
}
export default Task;