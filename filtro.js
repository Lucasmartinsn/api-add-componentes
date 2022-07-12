import React, {useEffect, useState} from "react";

function Task (){
    const [initialequipe, setInitialequipe] = useState([])
    const [equipe, setequipe] = useState([])

    useEffect(() => {
        const fetchequipe = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/');
                const data = await response.json();
                setInitialequipe(data);
                setequipe(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, []);
    const handlechange = ({target}) =>{
        if(!target.value) {
            setequipe(initialequipe)
            return
        }
        const filterepo = equipe.filter(({nome_equipe}) =>
        nome_equipe.includes(target.value))

        setequipe(filterepo);
    }

    return(
        <div>
            <div>
                <input type={"text"} onChange={handlechange}></input>
            </div>
            <div>
            <ul>
                {equipe.map((repo) =>
                <li key={equipe.id_equipe}>{repo.nome_equipe} </li>
                )}
            </ul>
            </div>
        </div>
);
}
export default Task;
/*import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
class Equipes extends React.Component {

    state ={
            id_equipe:0,
            nome_equipe:'',
            pessoas : [],
            modalAberta: false,
        }


    componentDidMount(){
        this.buscarPessoas();
    }
    componentWillUnmount(){
        
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Metodos POST DELETE GET UPDATE-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
/*buscarPessoas = () => {
    fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/")
       .then(resposta => resposta.json())
       .then(dados => {
           this.setState({ pessoas : dados})
   })
}

carregaPessoas = (id_equipe) => {
   fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/"+id_equipe, 
   { method: 'GET' })
       .then(resposta => resposta.json())
       .then(pessoas => {
           this.setState({
               id_equipe: pessoas.id_equipe,
               nome_equipe: pessoas.nome_equipe
           })

           this.abrirModal();
       })
}

cadastraPessoas = (pessoas) => {
   fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/", {
       method: 'POST' ,
       headers: { 'Content-Type':'application/json' },
       body: JSON.stringify(pessoas)
   })
       .then(resposta => {
           if(resposta.ok){
               this.buscarPessoas();
               }else{
                   alert("nao add")
       }
   })

}

atualizarPesssoas = (pessoas) => {
   fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/", {
       method: 'PUT' ,
       headers: { 'Content-Type':'application/json' },
       body: JSON.stringify(pessoas)
   })
       .then(resposta => {
           if(resposta.ok){
               this.buscarPessoas();
               }else{
                   alert("nao atualiza")
       }
   })

}


deletarPessoas = (id_equipe) => {
   fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/"+id_equipe, 
   { method: 'DELETE' })
       .then(resposta => {
           if(resposta.ok){
               this.buscarPessoas();
           }
   })
}


/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=RENDER TABELA=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/
/*renderTabela(){
   return <Table id="table" striped bordered hover variant="dark">
       <thead>
           <tr>
           <th>id_equipe</th>
           <th>nome_equipe</th>
           <th>Opcoes</th>
           </tr>
       </thead>
       <tbody>
           {
               this.state.pessoas.map((pessoas) =>
                   <tr>
                       <td> {pessoas.id_equipe} </td>
                       <td> {pessoas.nome_equipe} </td>
                       <td>
                           <Button variant="outline-danger" onClick={() => this.abrirModal()}>Adicionar</Button> 
                           <Button variant="outline-danger" onClick={() => this.carregaPessoas(pessoas.id_equipe)}>Atualizar</Button> 
                           <Button variant="outline-danger" onClick={() => this.deletarPessoas(pessoas.id_equipe)}>Deletar</Button> 
                       </td>
                   </tr>
               )
           }
           
       </tbody>
   </Table>
}

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-FUCOES=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/


/*fecharModal = () => {
   this.setState(
       {
           modalAberta: false

       }
    )
}

abrirModal = () => {
   this.setState(
       {
           modalAberta: true

       }
    )
}
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/
/*atualizaNome = (e) => {
   this.setState(
       {
           nome_equipe: e.target.value
       }
   )
}


submit = () => {

   if(this.state.id_equipe == 0){
       const pessoas = {
           nome_equipe : this.state.nome_equipe,
       }
   
       this.cadastraPessoas(pessoas);
   }else{
       const pessoas = {
           id_equipe: this.state.id_equipe,
           nome_equipe : this.state.nome_equipe,
       }
   
       this.atualizarPesssoas(pessoas);
       
   }
}

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=RENDER PESSOA=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*
render(){
return(

   

   <div id="modal">

       <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
           <Modal.Header closeButton>
           <Modal.Title>Adicionar uma nova Equipe:</Modal.Title>
           </Modal.Header>
           <Modal.Body>
                <Form>
       <Form.Group className="mb-3">
           <Form.Label>id_equipe</Form.Label>
           <Form.Control type="text" value={this.state.id_pessoa} readOnly={true}/>
       </Form.Group>

       <Form.Group className="mb-3">
           <Form.Label>nome_pessoa</Form.Label>
           <Form.Control type="text" placeholder="nome da equipe" value={this.state.nome_equipe} onChange={this.atualizaNome}/>
       </Form.Group>

       </Form>
       
           </Modal.Body>
           <Modal.Footer>
           <Button variant="secondary" onClick={this.fecharModal}>
               Cancelar
           </Button>
           <Button  variant="primary" type="submit" onClick={this.submit} >
               Adicionar
           </Button>
           </Modal.Footer>
       </Modal>

       <div id="add">
            <input type={"text"}></input>
       </div>
       
       
       {this.renderTabela()}
   </div>
)
}

}

export default Equipes; */