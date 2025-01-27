import Image from 'next/image';
import heroImg from '../../public/assets/hero.png';
import styles from '../styles/home.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';

export const revalidate = 60; // Revalida a cada 60 segundos

export default async function Home() {
  // Carrega os dados diretamente no componente
  const commentRef = collection(db, "comentarios");
  const postRef = collection(db, "tarefas");
  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);

  const posts = postSnapshot.size || 0; // Obtenha o tamanho corretamente
  const comments = commentSnapshot.size || 0;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image 
            className={styles.hero} 
            alt="Logo Tarefas+" 
            src={heroImg}
            priority />
        </div>

        <h1 className={styles.title}>Sistema feito para você organizar <br/> seus estudos e tarefas</h1>
        
        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}
