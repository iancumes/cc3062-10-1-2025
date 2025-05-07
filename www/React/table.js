function Table({products}) {
    return <table border="1">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Sub total</th>
            </tr>
        </thead>
        <tbody>
            {
                products.map((product) => 
                    <TableRow key={product.id} product={product} />
                )
            }
        </tbody>
    </table>
}