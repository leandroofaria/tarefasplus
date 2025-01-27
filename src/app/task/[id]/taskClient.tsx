"use client"; 
import styles from "./styles.module.css";
import Head from "next/head";
import { Textarea } from "@/components/textarea";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, use, useState } from "react";
import { doc, getDoc, getDocs, collection, query, where, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { FaTrash } from 'react-icons/fa'

export interface CommentProps {
    id: string;
    comment: string;
    taskId: string;
    user: string;
    name: string;
}



export default function TaskClient({ task, allComments }: { task: any; allComments: any[] }) {

    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [comments, setComments] = useState<CommentProps[]>(allComments || [])

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

            const data = {
                id: docRef.id,
                comment: input,
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: task?.taskId
            }

            setComments((oldItens) => [...oldItens, data])
            setInput("")

        } catch(erro) {
            console.log(erro)
        }

    }

    async function handleDeleteComment(id: string) {
        try {
            const docRef = doc(db, "comentarios", id);
            await deleteDoc(docRef);


            const deleteComment = comments.filter((item)=>item.id !== id)
            setComments(deleteComment)

        } catch(erro) {
            alert(erro)
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

            <section className={styles.commentsContainer}>
                <h2>Comentários</h2>
                {comments.length === 0 && (
                    <span>Nenhum comentário foi encontrado...</span>
                )}

                {comments.map((item) => (
                    <article key={item.id} className={styles.comment}>
                        <div className={styles.headComment}>
                            <label className={styles.commentsLabel}>{item.name}</label>
                            {item.user === session?.user?.email && (
                                <button className={styles.buttonTrash} onClick={() => handleDeleteComment(item.id)}><FaTrash size={18} color="#EA3140" /></button>
                            )}
                        </div>
                        <p>{item.comment}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}
