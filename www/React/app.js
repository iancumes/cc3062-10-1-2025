function App(props) {
    const products = [
        {id: 1, name:"Agua Pura", price: 10, quantity: 2},
        {id: 2, name:"Coca Cola", price: 15, quantity: 1},
        {id: 3, name:"Pizza", price: 100, quantity: 1},
        {id: 4, name:"Hamburguesa", price: 25, quantity: 1},
    ];

    return <div>
        <h1>Carreta</h1>
        <Table products={products} />
    </div>
}