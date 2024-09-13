import "./home.css"
import Tarefa from "../../components/tarefa/tarefa.jsx"
import TarefaEdit from "../../components/tarefa-edit/tarefa-edit.jsx";
import { useState } from "react";
import { v4 as uuid} from "uuid";



function Home(){

    const [tarefa, setTarefas] = useState([]);
    const [descricao, setDescricao] = useState("");


    function AddTarefa(){
        let tarefas = {
            id: uuid(), 
            descricao: descricao, 
            done: false, 
            edit: false
        }

        setTarefas([...tarefa, tarefas]);
        setDescricao("");
    };

    const DeleteTarefa = (id) => {
        const novaLista = tarefa.filter((tarefas) => {
          return tarefas.id !== id  
        })

        setTarefas(novaLista);
    }

    const EditTarefa = (id) => {
        let novaLista = [];
        
        
        // eslint-disable-next-line array-callback-return
        tarefa.map((tarefas) => {
            if  (tarefas.id === id)
                tarefas.edit = true;
            novaLista.push(tarefas);
        });

        setTarefas(novaLista);
    }

    const EditTarefaConfirma = (descricao, id) => {
        let novaLista = [];
        
        
        // eslint-disable-next-line array-callback-return
        tarefa.map((tarefas) => {
            if  (tarefas.id === id){
                tarefas.edit = false;
                tarefas.descricao = descricao;
            }
            novaLista.push(tarefas);
        
        });

        setTarefas(novaLista);
    }

    const CancelarEditTarefa = (id) => {
        let novaLista = [];
        
        
        // eslint-disable-next-line array-callback-return
        tarefa.map((tarefas) => {
            if  (tarefas.id === id)
                tarefas.edit = false;
        
            novaLista.push(tarefas);
        
        });

        setTarefas(novaLista);
    }
    
    const TarefaConcluida = (id, done) => {
        let novaLista = [];
        
        
        // eslint-disable-next-line array-callback-return
        tarefa.map((tarefas) => {
            if  (tarefas.id === id)
                tarefas.done = done;
        
            novaLista.push(tarefas);
        
        });

        setTarefas(novaLista);
    }
    

    return <div className="container-tasks">
        <h2>Quais são os planos para hoje?</h2>

        <div className="form-tarefa">
            <input value={descricao} onChange={(e) => setDescricao(e.target.value)} className="task-input" type="text" 
            name="task" id="task" placeholder="Descreva sua tarefa..." />
            
            <button onClick={AddTarefa} className="task-btn">Inserir Tarefa</button>
        </div>

        <div className="lista-tarefa">

            {
              
                tarefa.map((task) => {
                    return task.edit?
                    <TarefaEdit key={task.id} 
                                id={task.id}
                                descricao={task.descricao}
                                done={task.done}
                                onClickSave={EditTarefaConfirma}
                                onClickCancel={CancelarEditTarefa} />
                        :
                    <Tarefa key={task.id} 
                            id={task.id}
                            descricao={task.descricao}
                            done={task.done} 
                            onClickDelete={DeleteTarefa}
                            onClickEdit={EditTarefa}
                            onClickConcluir={TarefaConcluida}/>
                })
            }

        </div>

    </div>
}

export default Home;