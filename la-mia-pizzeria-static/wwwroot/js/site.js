// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


//// <Pizza>

const initialize = filter => getPizze(filter).then(renderCards);

const getPizze = name => axios.get('/Api/Pizza', name ? { params: { name } } : {}).then(res => res.data);

const renderCards = pizze => {
    const cards = document.getElementById('cards');
    cards.innerHTML = pizze.map(pizzaComponent).join('');

}

const pizzaComponent = pizza => `
    <div class="col">
        <div class="card my-3" style="width: 30rem">
            <img src=${pizza.foto} class="card-img-top " alt="foto">
            <div class="card-body text-center">
                <h5 class="card-title ">${pizza.name}</h5>
                <p class="card-text">${pizza.description}</p>
                <p class="fw-bold">${pizza.prezzo} €</p>
                <div class="buttonContainer d-inline-flex">
                    <!--
                    <a class="btn btn-primary " href="@Url.Action(" Dettagli", "Pizza", new{Id = @pizza.Id })">Dettagli</a>
                    <a class="btn btn-warning mx-2" href="@Url.Action(" Update", "Pizza", new {Id = @pizza.Id })">Edit</a>
                    -->
                    <button onClick="deletePizza(${pizza.id})" type="submit" class="btn btn-danger">Delete</button>
                </div>

            </div>
        </div >
    </div >`;

function deletePizza(id) {
    axios.delete(`/Api/Pizza/${id}`)
        .then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        });
    location.reload()
}

//const initFilter = () => {
//    const filter = document.querySelector("#posts-filter input");
//    filter.addEventListener("input", (e) => loadPosts(e.target.value))
//};

//// </Pizza>

// <Categories>

const loadCategories = () => getCategories().then(renderCategories);

const getCategories = () => axios
    .get("/Api/Category")
    .then(res => res.data);

const renderCategories = categories => {
    const selectCategory = document.querySelector("#category-id");
    selectCategory.innerHTML += categories.map(categoryOptionComponent).join('');
};

const categoryOptionComponent = category => `<option value=${category.id}>${category.title}</option>`;

// </Categories>

// <Ingredienti>

const loadIngredienti = () => getIngredienti().then(renderIngredienti);

const getIngredienti = () => axios
    .get("/Api/Ingrediente")
    .then(res => res.data);

const renderIngredienti = ingredienti => {
    const IngredientiSelection = document.querySelector("#ingredienti");
    IngredientiSelection.innerHTML = ingredienti.map(ingredienteOptionComponent).join('');
}

const ingredienteOptionComponent = ingrediente => `
	<div class="flex gap">
		<input id="${ingrediente.id}" type="checkbox" />
		<label for="${ingrediente.id}">${ingrediente.name}</label>
	</div>`;

// </Ingredienti>

// <CreatePizza>

const pizzaPizza = pizza => axios
    .post("/Api/Pizza", pizza)
    .then(() => location.href = "/Pizza/ApiIndex")
    .catch(err => renderErrors(err.response.data.errors));

const initCreateForm = () => {
    const form = document.querySelector("#pizza-create-form");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const pizza = getPizzaFromForm(form);
        pizzaPizza(pizza);
    });
};

const getPizzaFromForm = form => {
    const name = form.querySelector("#name").value;
    const description = form.querySelector("#description").value;
    const foto = form.querySelector("#foto").value;
    const categoryId = form.querySelector("#category-id").value;
    const prezzo = form.querySelector("#prezzo").value;

    return {
        name,
        description,
        foto,
        categoryId,
        prezzo
    };
};

const renderErrors = errors => {
    const nomeErrors = document.querySelector("#name-errors");
    const descrizioneErrors = document.querySelector("#description-errors");
    const fotoErrors = document.querySelector('#foto-error');
    const prezzoErrors = document.querySelector('#prezzo-error');
    const categoriaIdErrors = document.querySelector("#category-id-errors");

    nomeErrors.innerText = errors.Nome?.join('\n') ?? '';
    descrizioneErrors.innerText = errors.Descrizione?.join('\n') ?? '';
    fotoErrors.innerText = errors.Foto?.join('\n') ?? '';
    prezzoErrors.innerText = errors.Prezzo?.join('\n') ?? '';
    categoriaIdErrors.innerText = errors.CategoriaId?.join('\n') ?? '';
};

// </CreatePizza>