import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import TaskClient from "./taskClient";

export default async function Task({ params }: { params: { id: string } }) {
    const id = params.id;
    const docRef = doc(db, "tarefas", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        redirect("/"); // Redireciona para a home se não existir
    }

    if (!snapshot.data()?.public) {
        redirect("/"); // Redireciona para a home se não for pública
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000;
    const task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id,
    };

    return <TaskClient task={task} />;
}
