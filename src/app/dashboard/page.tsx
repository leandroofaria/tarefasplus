import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from "./styles.module.css";
import Head from "next/head";
import { Textarea } from "@/components/textarea";

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
            </main>
            
        </div>
    );
}
