const miListaProductos = document.getElementById('lista-productos');

eventListeners();

function eventListeners(){

    document.getElementById('lista').addEventListener('submit', agregarProducto);
    
    miListaProductos.addEventListener('click', borrar);

    document.addEventListener('DOMContentLoaded', localStorageRegistrados);

    miListaProductos.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.path[1].childNodes[1].innerHTML);

    });

}

   function agregarProducto(e) {
       e.preventDefault();
        const producto = document.getElementById('textArea').value

        const li = document.createElement('div');
        li.innerHTML =`<li className="miListaProductos"><img id="done" class="btnBorrar" src="assets/css/listo.png"><p>${producto}</p></li>`;
        miListaProductos.appendChild(li);
       
        agregarLocalStorage(producto);
        
    };

    function borrar(e){
        e.preventDefault();
        if( e.target.className === 'btnBorrar'){
            e.target.parentElement.parentElement.remove('li');
           borrarProductoLS(e.target.parentElement.textContent);
        }
    }

    function agregarLocalStorage(producto){
        let productos;
        productos = obtenerProductosLocalStorage();

        productos.push(producto);

        localStorage.setItem('productos', JSON.stringify(productos) );

    }

    function obtenerProductosLocalStorage(){
        let productos;

        if(localStorage.getItem ('productos')=== null) {
            productos = [];
        } else {
            productos = JSON.parse(localStorage.getItem('productos') );
        }
        return productos;
    }

    function localStorageRegistrados() {
        let productos;

        productos = obtenerProductosLocalStorage();
        
        productos.forEach(function(producto){
            const li = document.createElement('div');
            li.innerHTML = `<li id="lista" className="miListaProductos"><img id="done" class="btnBorrar" src="assets/css/listo.png" onclick="borrarProductoLS('${producto}')"><p>${producto}</p></li>`;
             miListaProductos.appendChild(li);
        });
        

        
    }

    function borrarProductoLS(producto) {
       productos = obtenerProductosLocalStorage();
       productoBorrar = producto

       productos.forEach(function(producto, index) {
           if(productoBorrar === producto){
               productos.splice(index, 1);
           }
       }
       );
        
       localStorage.setItem('productos', JSON.stringify(productos));
    }
    
    
    