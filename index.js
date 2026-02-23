const URL = 'http://localhost:3000/posts';

const getPosts = () => {
    fetch(URL)
        .then(res => res.json())
        .then(posts => {
            const container = document.getElementById('posts-container');
            container.innerHTML = '';

            posts.forEach(post => {
                container.innerHTML += `
                    <div class="post-card">
                        <img src="${post.image}" alt="post">
                        <h3>${post.title}</h3>
                        <p>${post.description}</p>
                        <button class="create btn-delete" onclick="deletePost(${post.id})">Eliminar</button>
                    </div>
                `;
            });
        });
};


const createPost = () => {
    const image = document.getElementById('image-url').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;


    if (!image || !title || !description) {
        return alert("Por favor, llena todos los campos");
    }

    const newPost = { image, title, description };

    fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    })
    .then(() => {
        getPosts(); 
        document.getElementById('image-url').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    });
};

const deletePost = (id) => {
    fetch(`${URL}/${id}`, { method: 'DELETE' })
        .then(() => getPosts());
};

document.getElementById('submit').onclick = createPost;
document.getElementById('list').onclick = getPosts;

getPosts();