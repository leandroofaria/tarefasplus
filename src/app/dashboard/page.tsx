import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from "./styles.module.css";
import Head from "next/head";
import { Textarea } from "@/components/textarea";
import { FiShare2 } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'

export default async function Dashboard() {
    // Obtendo a sessão no lado do servidor
    const session = await getServerSession(authOptions);

    // Redireciona para a página inicial se o usuário não estiver logado
    if (!session) {
        redirect("/");
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

                        <form action="">
                            <Textarea 
                            placeholder="Digite sua tarefa aqui..."/>
                            <div className={styles.checkboxArea}>
                                <input type="checkbox" className={styles.checkbox} />
                                <label>Deixar tarefa pública?</label>
                            </div>
                            <button className={styles.button} type="submit">Registrar</button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas Tarefas</h1>
                    <article className={styles.task}>
                        <div className={styles.tagContainer}>
                            <label className={styles.tag}>Publico</label>
                            <button className={styles.shareButton}>
                                <FiShare2 size={22} color="#3183ff"/>
                            </button>
                        </div>

                        <div className={styles.taskContent}>
                            <p>Minha primeira tarefa de exemplo</p>

                            <button className={styles.trashButton}>
                                <FaTrash size={24} color="#ea3140"/>
                            </button>
                        </div>
                    </article>
                </section>
            </main>
            
        </div>
    );
}
