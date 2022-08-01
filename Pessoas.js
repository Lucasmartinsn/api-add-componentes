import React, { useEffect, useState } from "react";

function Chamada(){
  


 const [nomes, setnome] = useState([])


useEffect(() => {
  axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/`)
      .then((resp) => {
          setnome(resp.data)
          
      })
      .catch(() => {
          console.log("deu errado")
      })
}, []
)

const primeiroarray = nomes.map(luc => luc.nome_pessoa
  );
  const segundoarray = primeiroarray.map(letra => letra.charAt(0));
 

  return(
   {
   
    }
  )
}
/** pega o array vindo da api(nome do array: nomes). 
 * coloca em outro array que pega apenas o nome(nome do array: primeiroarray).
 * pega o array de nomes e transforma em um array com as as iniciais dos nomes((nome do array: segundoarray))
 *  */
export default Chamada;
