import Image from 'next/image';
import heroImg from '../../public/assets/hero.png';
import styles from '../styles/home.module.css';


export default function Home() {
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

      </main>
    </div>
  );
}
