const apiUrl = "http://127.0.0.1:8000";

async function uploadFiles() {
    const files = document.getElementById("fileInput").files;
    if (!files.length) return alert("Select files first!");
    
    for (let file of files) {
        let formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${apiUrl}/upload`, { method: "POST", body: formData });
        const data = await res.json();
        console.log(data);
    }
    alert("Files uploaded and model trained!");
}

async function sendMessage() {
    const msg = document.getElementById("userMessage").value;
    if (!msg) return;

    const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><b>You:</b> ${msg}</p><p><b>Bot:</b> ${data.answer}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById("userMessage").value = "";
}
