import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { v4 as uuidv4 } from 'uuid'; 

const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);
const database = getDatabase(app);
const dbRef = ref(database);

// 로그인한 상태가 변경될 때 마다 호출 됨. 전달받은 콜백에 유저를 넣어서 업데이트 시켜줌.
// 유저는 어디서 오는거지? 
// 로그인상태가 변경될 때마다 유저가 어드민인지 체크해서 그 업데이트된 유저를 콜백에 전달해줌.
// updateUser((user)=> setUser(user));
export function updateUser(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await readAdminDataFromGoogleAndUpdate(user) : null;
        callback(updatedUser);
    })
}

// 디비에서 어드민 어레이를 불러와서, 그 어레이에 로그인한 사용자 아이디가 있는지에 따라서, 유저정보를 업데이트해서 리턴
async function readAdminDataFromGoogleAndUpdate(userData) {
    return (
        get(child(dbRef, `admins`)).then((snapshot) => {
            if(snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(userData.uid);
                return {...userData, isAdmin}; 
            }
        }).catch((error) => {
            console.log(error);
        })
    )
}

export async function signInWithGoogle () {
    return (
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                return user;
            })
            .catch(console.log)
    )
}

export function signOutWithGoogle() {
    return (
        signOut(auth)
            .then(() => {
                return null;
            })
            .catch(console.log)
    )
}

export async function writeProductData(product) {
    const productId = uuidv4();
    return set(ref(database, `products/` + productId), {
        productId,
        ...product, 
        price: parseInt(product.price),
        color_options: product.color_options.split(',')
    });
}

export async function readProductData() {
    return get(child(dbRef, `products`)).then((snapshot) => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            console.log("No data available");
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

export async function getCart(userId) {
    return get(ref(database, `cart/${userId}`))
    .then(snapshot => {
        const items = snapshot.val() || {};
        return Object.values(items);
    })
}

export async function addOrUpdateToCart(userId, product) {
    return set(ref(database, `cart/${userId}/${product.productId}`), product);
}

export async function removeFromCart(userId, productId) {
    return remove(ref(database, `cart/${userId}/${productId}`))
}