import Head from "next/head";
import styles from "./styles.module.css";
import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/textarea";


export default async function Task({ params }: { params: { id: string } }) {
    const id = params.id;
    const docRef = doc(db, "tarefas", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        redirect("/"); 
    }

    if (!snapshot.data()?.public) {
        redirect("/"); 
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000; 
    const task = {
        tarefa: snapshot.data()?.tarefa, 
        public: snapshot.data()?.public, 
        created: new Date(miliseconds).toLocaleDateString(), 
        user: snapshot.data()?.user, 
        taskId: id, 
    };

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

                <form>
                    <Textarea placeholder="Digite seu comentário"/>

                    <button className={styles.button}>Comentar</button>
                </form>

            </section>
        </div>
    );
}
