"use client"; 
import styles from "./styles.module.css";
import Head from "next/head";
import { Textarea } from "@/components/textarea";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { doc, getDoc, collection, query, where, addDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

export default function TaskClient({ task }: { task: any }) {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    async function HandleComment(event: FormEvent) {
        event.preventDefault()
        
        if (input === "" || !session?.user?.email || !session?.user?.name) return;

        try {
            const docRef = await addDoc(collection(db, "comentarios"), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: task?.taskId
            })

            setInput("")

        } catch(erro) {
            console.log(erro)
        }

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Detalhes da Tarefa</title>
            </Head>

            <main className={styles.main}>
                <h1>Tarefa</h1>
                <article className={styles.task}>
                    <p>{task.tarefa}</p>
                </article>
            </main>

            <section className={styles.commentsContainer}>
                <h2>Escrever Comentário</h2>

                <form onSubmit={HandleComment}>
                    <Textarea placeholder="Digite seu comentário" value={input} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}/>
                    <button disabled={!session?.user} className={styles.button}>
                        Comentar
                    </button>
                </form>
            </section>
        </div>
    );
}
