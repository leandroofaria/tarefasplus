import styles from './styles.module.css';
import Head from 'next/head';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Painel de Tarefas</title>
            </Head>

            <h1>Painel de Tarefas</h1>
        </div>
    );
}
