// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "....",
    authDomain: "....",
    projectId: "....",
    storageBucket: ".....",
    messagingSenderId: "....",
    appId: "....",
    measurementId: "...."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

//Capturar u obtener el html
const formulario = document.getElementById('formClientes');
const btnEnviar = document.getElementById('btn-enviar');
const mostrarMensaje = document.getElementById('mostrar-mensaje');

formulario.addEventListener('submit',async function(event){
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    
    try{
        
        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true;

        await addDoc(collection(db,'solicitudes'),{
            nombre:nombre,
            email:email,
            mensaje:mensaje,
            fecha:serverTimestamp()
        });

        mostrarMensaje.textContent = 'Solicitud enviada correctamente';
        formulario.reset();

    }catch(error){
        console.error('Error al guardar:',error)
        mostrarMensaje.textContent = 'Error al enviar el mensaje';
    }finally{
        btnEnviar.textContent = 'Enviar mensaje';
        btnEnviar.disabled = false;
    }
});
