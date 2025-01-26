import { db } from "@/services/firebaseConnection";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import TaskClient from "./taskClient";
import { CommentProps } from "./taskClient";


export default async function Task({ params }: { params: { id: string } }) {
    const id = params.id;
    const docRef = doc(db, "tarefas", id);
    const q = query(collection(db, "comentarios"), where("taskId", "==", id));
    const snapshot = await getDoc(docRef);
    const snapshotComments = await getDocs(q);

    let allComments: CommentProps[] = [];
    snapshotComments.forEach((doc) => {
        allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId,
        });
    });

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

    return <TaskClient task={task} allComments={allComments} />;
}
