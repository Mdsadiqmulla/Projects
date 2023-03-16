function saveOnCurdCurd(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const product = event.target.product.value;
    const category = event.target.category.value;
    const object = { price, product, category };

    //Storing data on curd curd
    axios.post("https://crudcrud.com/api/047b0cb60f9c4f60ac8103ff72b82b26/Ecommerce", object)
        .then((response) => {
            showUserOnScreen(response.data)
            //console.log(response);
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + `<h3> Something went wrong.....!`;
            console.log(error);
        })
    }
        window.addEventListener('load', () => {
            axios.get("https://crudcrud.com/api/047b0cb60f9c4f60ac8103ff72b82b26/Ecommerce")
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        showUserOnScreen(response.data[i])
                    }
                    //console.log(response);
                })
                .catch((error) => {
                    document.body.innerHTML = document.body.innerHTML + `<h3> Something went wrong getting data.....!`;
                    console.log(error);
                })
        })

        function showUserOnScreen(object, product) { //(object)
            const parentElem = document.getElementById('list');
            const newUser = document.createElement('li');
            newUser.textContent = object.price + ', ' + object.product + ', ' + object.category;

            //Cereate delete button
            var deleteBtn = document.createElement('input');
            deleteBtn.type = 'button';
            deleteBtn.value = 'Delete';
            deleteBtn.className = 'btn btn-warning'
            deleteBtn.onclick = () => {
                //delete the data on crud crud
                axios.delete(`https://crudcrud.com/api/047b0cb60f9c4f60ac8103ff72b82b26/Ecommerce/${object._id}`)
                    .then(() => {
                        parentElem.removeChild(newUser);
                    })
                    .catch((error) => {
                        document.body.innerHTML = document.body.innerHTML + `<h3> Something went wrong in deletion.....!`;
                    })
            }
            newUser.appendChild(deleteBtn);
            parentElem.appendChild(newUser);

            //Create edit button
            var editBtn = document.createElement('input');
            editBtn.type = 'button';
            editBtn.value = 'Edit';
            editBtn.className = 'btn btn-info';
            editBtn.onclick = () => {
                document.getElementById('price').value = object.price;
                document.getElementById('product').value = object.product;
                document.getElementById('category').value = object.category;

                  //edit user details on crud crud
                axios.put(`/${object._id}`,
                    { price: object.price, product: object.product, category: object.category })
                    .then(() => {
                        axios.delete(`https://crudcrud.com/api/047b0cb60f9c4f60ac8103ff72b82b26/Ecommerce/${object._id}`)
                            .then(() => {
                                parentElem.removeChild(newUser);
                            })
                    })
                    .catch((error) => {
                        document.body.innerHTML = document.body.innerHTML + `<h3> Something went wrong in updating.....!`;
                    })
                // parentElem.removeChild(newUser);
            }
            newUser.appendChild(editBtn);
            parentElem.appendChild(newUser);
        }