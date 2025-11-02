import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./configFirebase";

const db = getFirestore(app);
async function fetchData() {
    return await getDocs(collection(db, "users"));
}

export default fetchData
