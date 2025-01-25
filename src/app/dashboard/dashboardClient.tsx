"use client";

import styles from "./styles.module.css";
import Head from "next/head";
import { Textarea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, query, orderBy, where, onSnapshot } from "firebase/firestore";

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string
}

export default function DashboardClient({ session }: { session: any }) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([])

  useEffect(() => { 
    async function loadTarefas() {
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", session.user.email)
      );

      onSnapshot(q, (snapshot) => {
        let lista = [] as TaskProps[]

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          })
        })

        setTasks(lista);
      });
    }
    loadTarefas();
}, [session.user.email]);


  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: session.user.email, 
        public: publicTask,
      });

      setInput("");
      setPublicTask(false);
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Painel de Tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Digite sua tarefa aqui..."
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar tarefa pública?</label>
              </div>
              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>
          
          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
            {item.public && (
              <div className={styles.tagContainer}>
              <label className={styles.tag}>Publico</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>
            )}

            <div className={styles.taskContent}>
              <p>{item.tarefa}</p>

              <button className={styles.trashButton}>
                <FaTrash size={24} color="#ea3140" />
              </button>
            </div>
          </article>
          ))}
        </section>
      </main>
    </div>
  );
}
